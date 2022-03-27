import Socket from 'socket.io-client'
import Logger from '../utils/Logger'



// Init

const runningLocally = (/\d+\.\d+\.\d+\.\d+|localhost/).test(window.location.hostname)

const serverURL = (
  runningLocally
  ? window.location.hostname + ':3000'
  : 'https://supermechs-workshop-server.thearchives.repl.co'
)

export const socket = Socket(serverURL)

const connectErrorStreakCountMax = runningLocally ? 1 : Infinity
export let connectErrorStreakCount = 0
export let lastError: Error = new Error('Server Offline')

const logger = new Logger()



socket.on('connect', () => {
  logger.log('Connected as', socket.id)
  connectErrorStreakCount = 0
})

socket.on('connect_error', error => {
  lastError = error
  connectErrorStreakCount++
  if (connectErrorStreakCount >= connectErrorStreakCountMax) {
    socket.disconnect()
    logger.log('Gave up on connecting')
  }
})



// Functions

export function createAttachment (listeners: Record<string, (data: any) => void>) {

  const attach = () => {
    for (const name in listeners) {
      socket.on(name, listeners[name])
    }
  }

  const detach = () => {
    for (const name in listeners) {
      socket.off(name, listeners[name])
    }
  }

  return { attach, detach }

}


export function emit (...args: Parameters<typeof socket['emit']>) {
  return socket.emit(...args)
}


export function tryToConnectManually (): Promise<void> {

  logger.log('Trying to connect manually.')

  return new Promise((resolve, reject) => {

    const onConnect = () => {
      socket.off('connect_error', onError)
      resolve()
    }
  
    const onError = () => {
      socket.off('connect', onConnect)
      reject()
    }
  
    socket.once('connect', onConnect)
    socket.once('connect_error', onError)

    socket.connect()

  })
}
