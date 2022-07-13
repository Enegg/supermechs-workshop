export interface AttachmentPoint {
  x: number
  y: number
}


export interface Rectangle extends AttachmentPoint {
  width: number
  height: number
}


export interface TorsoAttachment {
  leg1: AttachmentPoint
  leg2: AttachmentPoint
  side1: AttachmentPoint
  side2: AttachmentPoint
  side3: AttachmentPoint
  side4: AttachmentPoint
  top1: AttachmentPoint
  top2: AttachmentPoint
}


export type Attachment = AttachmentPoint | TorsoAttachment


export interface ItemStats {
  weight: number
  health: number
  eneCap: number
  eneReg: number
  heaCap: number
  heaCol: number
  phyRes: number
  expRes: number
  eleRes: number
  bulletsCap: number
  rocketsCap: number
  phyResDmg: number
  expResDmg: number
  heaDmg: number
  heaCapDmg: number
  heaColDmg: number
  eleResDmg: number
  eneDmg: number
  eneCapDmg: number
  eneRegDmg: number
  walk: number
  jump: number
  push: number
  pull: number
  recoil: number
  advance: number
  retreat: number
  uses: number
  backfire: number
  heaCost: number
  eneCost: number
  bulletsCost: number
  rocketsCost: number
  phyDmg: [number, number]
  expDmg: [number, number]
  eleDmg: [number, number]
  range: [number, number]
}


export const ItemType = {
  TORSO: 'TORSO',
  LEGS: 'LEGS',
  SIDE_WEAPON: 'SIDE_WEAPON',
  TOP_WEAPON: 'TOP_WEAPON',
  DRONE: 'DRONE',
  CHARGE_ENGINE: 'CHARGE_ENGINE',
  TELEPORTER: 'TELEPORTER',
  GRAPPLING_HOOK: 'GRAPPLING_HOOK',
  MODULE: 'MODULE',
} as const


export default interface Item {

  id: number

  // Meta
  name: string
  kind: string
  unlockLevel: number
  goldPrice: number
  tokensPrice: number
  transformRange: string

  // Stats
  type: keyof typeof ItemType;
  element: 'PHYSICAL' | 'EXPLOSIVE' | 'ELECTRIC' | 'COMBINED'
  stats: Partial<ItemStats>
  tags: {
    premium: boolean
    sword: boolean
    melee: boolean
    roller: boolean
    legacy: boolean
    require_jump: boolean
    custom: boolean
  }

  // Graphic
  width: number
  height: number
  image: Rectangle
  attachment: null | Attachment

}
