import { IBuildStats } from './stats';

export interface ILoadout {
  id: string
  name: string
  description: string
  user_id: number
  username: string
  weapon_id: number
  icon: string
  head_id: number | null
  chest_id: number | null
  arms_id: number | null
  waist_id: number | null
  legs_id: number | null
  stats: IBuildStats
}

export interface IFetchLoadout {
  weaponId: number
  headId: number | null
  chestId: number | null
  armsId: number | null
  waistId: number | null
  legsId: number | null
}
