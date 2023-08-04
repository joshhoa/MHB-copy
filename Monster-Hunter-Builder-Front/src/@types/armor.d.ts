export type IArmorType = 'head' | 'arms' | 'legs' | 'chest' | 'waist';

export interface IArmor {
  id: number
  type: IArmorType
  icon: string
  name: string
  rarity: number
  defense: number
  resistances: Resistances
  skills: Skill[] | null[]
}

export interface IHead {
  id: number
  type: 'head'
  name: string
  rarity: number
  defense: number
  resistances: Resistances
  skills: Skill[]
}

export interface IChest {
  id: number
  type: 'chest'
  name: string
  rarity: number
  defense: number
  resistances: Resistances
  skills: Skill[]
}

export interface IArms {
  id: number
  type: 'arms'
  name: string
  rarity: number
  defense: number
  resistances: Resistances
  skills: Skill[]
}

export interface IWaist {
  id: number
  type: 'waist'
  name: string
  rarity: number
  defense: number
  resistances: Resistances
  skills: Skill[]
}

export interface ILegs {
  id: number
  type: 'legs'
  name: string
  rarity: number
  defense: number
  resistances: Resistances
  skills: Skill[]
}

export interface Resistances {
  fire: number
  water: number
  thunder: number
  ice: number
  dragon: number
}

export interface Skill {
  id: number
  name: string
  level: number
  level_max: number
  color: string
}
