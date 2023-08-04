export interface IStats {
  stats: IBuildStats
}

export interface IBuildStats {
  attack: number
  affinity: number
  elements: IElementStats[]
  sharpness: ISharpness
  defense: number
  resistances: IResistanceStats
  skills: ISkillStats[]
}

export interface ISkillStats {
  id: number
  name: string
  level: number
  level_max: number
  color: string
}

export interface IResistanceStats {
  fire: number
  water: number
  thunder: number
  ice: number
  dragon: number
}
export interface IElementStats {
  name: string
  value: number
}

export interface ISharpness {
  red: number
  orange: number
  yellow: number
  green: number
  blue: number
  white: number
  purple: number
  inactiv: number
}
