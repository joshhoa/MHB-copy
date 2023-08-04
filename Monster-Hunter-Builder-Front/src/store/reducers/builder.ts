import { createAction, createReducer } from '@reduxjs/toolkit';
import { IWeapon } from '../../@types/weapon';
import {
  IArmor,
  IArms, IChest, IHead, ILegs, IWaist,
} from '../../@types/armor';
import { IBuildStats, IStats } from '../../@types/stats';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { IFetchLoadout } from '../../@types/loadout';

export interface BuilderState {
  weaponList: IWeapon[] | null
  armorList: IArmor[] | null
  weaponType: string
  weapon: IWeapon | null
  head: IHead | null
  chest: IChest | null
  arms: IArms | null
  waist: IWaist | null
  legs: ILegs | null
  isLoading: boolean
  errorMessage: string
  stats: IBuildStats | null
  popUp: {
    shown: boolean
    message: string
    type: 'error' | 'success' | 'neutral'
  }
}

export const setWeaponType = createAction<string>('builder/SET_WEAPON_TYPE');
export const clearWeaponList = createAction('builder/CLEAR_WEAPON_LIST');
export const clearArmorList = createAction('builder/CLEAR_ARMOR_LIST');
export const setBuilderWeapon = createAction<IWeapon>('builder/SET_WEAPON');
export const setBuilderArmor = createAction<IArmor>('builder/SET_ARMOR');
export const resetBuilder = createAction('builder/RESET_BUILDER');
export const closeBuilderPopUp = createAction('builder/CLOSE_POPUP');

export const fetchWeaponsByType = createAppAsyncThunk(
  'builder/FETCH_WEAPONS_BY_TYPE',
  async (weaponType: string) => {
    const { data: weapons } = await axiosInstance.get(`/weapons/type/${weaponType}`);
    return weapons as IWeapon[];
  },
);

export const fetchArmorsByType = createAppAsyncThunk(
  'builder/FETCH_ARMORS_BY_TYPE',
  async (itemType: string) => {
    const { data: armors } = await axiosInstance.get(`/armors/type/${itemType}`);
    return armors as IArmor[];
  },
);

export const getBuilderStats = createAppAsyncThunk(
  'builder/GET_BUILDER_STATS',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const {
      weapon, head, chest, arms, waist, legs,
    } = state.builder;
    const { data: stats } = await axiosInstance.post('/loadouts/stats', {
      weapon_id: weapon?.id,
      head_id: head?.id,
      chest_id: chest?.id,
      arms_id: arms?.id,
      waist_id: waist?.id,
      legs_id: legs?.id,
    });
    return stats as IStats;
  },
);

export const fetchLoadoutItems = createAppAsyncThunk(
  'builder/FETCH_LOADOUT_ITEMS',
  async ({
    weaponId,
    headId,
    chestId,
    armsId,
    waistId,
    legsId,
  }: IFetchLoadout) => {
    const { data: weapon } = await axiosInstance.get(`/weapons/${weaponId}`);
    const { data: head } = await axiosInstance.get(`/armors/${headId}`);
    const { data: chest } = await axiosInstance.get(`/armors/${chestId}`);
    const { data: arms } = await axiosInstance.get(`/armors/${armsId}`);
    const { data: waist } = await axiosInstance.get(`/armors/${waistId}`);
    const { data: legs } = await axiosInstance.get(`/armors/${legsId}`);

    return {
      weapon, head, chest, arms, waist, legs,
    };
  },
);

export const initialState: BuilderState = {
  weaponList: null,
  armorList: null,
  weaponType: '',
  weapon: null,
  head: null,
  chest: null,
  arms: null,
  waist: null,
  legs: null,
  isLoading: false,
  errorMessage: '',
  stats: null,
  popUp: {
    shown: false,
    message: '',
    type: 'success',
  },
};

const builderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setWeaponType, (state, action) => {
      // here we can do this because Redux Toolkit makes the state immutable
      state.weaponType = action.payload;
    })
    .addCase(clearWeaponList, (state) => {
      state.weaponList = null;
    })
    .addCase(clearArmorList, (state) => {
      state.armorList = null;
    })
    .addCase(fetchWeaponsByType.pending, (state) => {
      state.errorMessage = '';
      state.isLoading = true;
    })
    .addCase(fetchWeaponsByType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.weaponList = action.payload;
    })
    .addCase(fetchWeaponsByType.rejected, (state) => {
      state.isLoading = false;
      state.errorMessage = 'Server error, Failed to get data';
    })
    .addCase(fetchArmorsByType.pending, (state) => {
      state.errorMessage = '';
      state.isLoading = true;
    })
    .addCase(fetchArmorsByType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.armorList = action.payload;
    })
    .addCase(fetchArmorsByType.rejected, (state) => {
      state.isLoading = false;
      state.errorMessage = 'Server error, Failed to get data';
    })
    .addCase(setBuilderWeapon, (state, action) => {
      state.weapon = action.payload;
    })
    .addCase(setBuilderArmor, (state, action) => {
      //! TS Error to fix later
      state[action.payload.type] = action.payload;
    })
    .addCase(getBuilderStats.fulfilled, (state, action) => {
      state.stats = action.payload.stats;
    })
    .addCase(resetBuilder, (state) => {
      state.weapon = null;
      state.arms = null;
      state.head = null;
      state.chest = null;
      state.waist = null;
      state.legs = null;
    })
    .addCase(fetchLoadoutItems.pending, (state) => {
      state.popUp = {
        shown: true,
        message: 'Importing... Please wait',
        type: 'neutral',
      };
    })
    .addCase(fetchLoadoutItems.rejected, (state) => {
      state.popUp = {
        shown: true,
        message: 'Failed to import items',
        type: 'error',
      };
    })
    .addCase(fetchLoadoutItems.fulfilled, (state, action) => {
      const {
        weapon, head, chest, arms, waist, legs,
      } = action.payload;
      state.weapon = weapon;
      state.arms = arms;
      state.head = head;
      state.chest = chest;
      state.waist = waist;
      state.legs = legs;
      state.popUp = {
        shown: true,
        message: 'Imported !',
        type: 'success',
      };
    })
    .addCase(closeBuilderPopUp, (state) => {
      state.popUp.shown = false;
    });
});

export default builderReducer;
