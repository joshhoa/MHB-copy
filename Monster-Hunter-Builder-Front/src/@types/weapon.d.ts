export interface IWeapon {
  id: number
  type: string
  icon: string
  name: string
  rarity: number
  attack: number
  affinity: number
  defense_bonus: number
  secret_effect: string
  sharpness: Sharpness
  elements: Element[] | null[]
}

export interface Sharpness {
  red: number
  orange: number
  yellow: number
  green: number
  blue: number
  white: number
  purple: number
}

export interface Element {
  name: string
  value: number
}
