import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { ILoadout } from '../../@types/loadout';

export interface LoadoutState {
  loadouts: ILoadout[] | null
  isLoading: boolean
  errorMessage: string
  loadoutCredentials: {
    title: string
    description: string
  }
  loadoutCode: string
  edit: {
    editLoadoutId: string
    isEditMode: boolean
    title: string
    description: string
  }
  popUp: {
    shown: boolean
    message: string
    type: 'error' | 'success' | 'neutral'
  }
}
export const clearLoadouts = createAction('loadouts/CLEAR_LIST');
export const closeLoadoutPopUp = createAction('loadout/CLOSE_POPUP');

export const changeLoadoutCredentialsField = createAction<{
  value: string
  field: keyof LoadoutState['loadoutCredentials'];
}>('loadout/SET_LOADOUT_CREDENTIALS_FIELD');

export const setLoadoutCodeField = createAction<string>('loadout/SET_LOADOUT_CODE_FIELD');

export const fetchUserLoadouts = createAppAsyncThunk(
  'loadout/FETCH_USER_LOADOUTS',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.user.id;
    const { data: loadouts } = await axiosInstance.get(`/loadouts/user/${userId}`);
    return loadouts as ILoadout[];
  },
);

export const fetchAllLoadouts = createAppAsyncThunk(
  'loadout/FETCH_ALL_LOADOUTS',
  async () => {
    const { data: loadouts } = await axiosInstance.get('/loadouts');
    return loadouts as ILoadout[];
  },
);

export const fetchLatestLoadouts = createAppAsyncThunk(
  'loadout/FETCH_LATEST_LOADOUTS',
  async () => {
    const { data: loadouts } = await axiosInstance.get('/loadouts/filter/latest');
    return loadouts as ILoadout[];
  },
);

export const fetchOneLoadoutById = createAppAsyncThunk(
  'loadout/FETCH_ONE_LOADOUT',
  async (id: string | undefined, thunkAPI) => {
    const state = thunkAPI.getState();
    const loadoutId = state.loadout.loadoutCode;
    const { data: loadout } = await axiosInstance.get(`/loadouts/${loadoutId}`);
    return loadout as ILoadout | null;
  },
);

export const saveLoadout = createAppAsyncThunk(
  'loadout/SAVE_LOADOUT',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.user.id;
    const {
      weapon, arms, chest, head, legs, waist,
    } = state.builder;
    const { title, description } = state.loadout.loadoutCredentials;
    const { data } = await axiosInstance.post('/loadouts', {
      name: title,
      description: description || ' ',
      user_id: userId,
      weapon_id: weapon?.id,
      head_id: head?.id,
      chest_id: chest?.id,
      arms_id: arms?.id,
      waist_id: waist?.id,
      legs_id: legs?.id,
    });
    return data;
  },
);

export const setEditMode = createAction<{
  isEditMode: boolean,
  editLoadoutId: string,
  title: string,
  description: string,
}>('loadout/SET_EDIT_MODE');

export const editLoadout = createAppAsyncThunk(
  'loadout/EDIT_LOADOUT',
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState();
    const {
      weapon, arms, chest, head, legs, waist,
    } = state.builder;
    const { title, description } = state.loadout.loadoutCredentials;
    const { data } = await axiosInstance.put(`/loadouts/${id}`, {
      name: title,
      description,
      weapon_id: weapon?.id,
      head_id: head?.id,
      chest_id: chest?.id,
      arms_id: arms?.id,
      waist_id: waist?.id,
      legs_id: legs?.id,
    });

    return data;
  },
);

export const deleteLoadout = createAppAsyncThunk(
  'loadout/DELETE_LOADOUT',
  async (id: string, thunkAPI) => {
    const { data } = await axiosInstance.delete(`/loadouts/${id}`, {
    });
    thunkAPI.dispatch(fetchUserLoadouts());
    return data;
  },
);
export const initialState: LoadoutState = {
  loadouts: null,
  isLoading: false,
  errorMessage: '',
  loadoutCredentials: {
    title: '',
    description: '',
  },
  loadoutCode: '',
  edit: {
    editLoadoutId: '',
    isEditMode: false,
    title: '',
    description: '',
  },
  popUp: {
    shown: false,
    message: '',
    type: 'success',
  },
};

const loadoutReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUserLoadouts.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    })
    .addCase(fetchUserLoadouts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loadouts = action.payload;
    })
    .addCase(fetchUserLoadouts.rejected, (state) => {
      state.errorMessage = 'Server error, Failed to get data';
    })
    .addCase(clearLoadouts, (state) => {
      state.loadouts = null;
    })
    .addCase(changeLoadoutCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.loadoutCredentials[field] = value;
    })
    .addCase(fetchAllLoadouts.pending, (state) => {
      state.loadouts = null;
      state.isLoading = true;
      state.errorMessage = '';
    })
    .addCase(fetchAllLoadouts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loadouts = action.payload;
    })
    .addCase(fetchAllLoadouts.rejected, (state) => {
      state.isLoading = false;
      state.errorMessage = 'Server error, Failed to get data';
    })
    .addCase(fetchLatestLoadouts.pending, (state) => {
      state.errorMessage = '';
    })
    .addCase(fetchLatestLoadouts.fulfilled, (state, action) => {
      state.loadouts = action.payload;
    })
    .addCase(fetchLatestLoadouts.rejected, (state) => {
      state.errorMessage = 'Error on fetching latest loadouts';
    })
    .addCase(fetchOneLoadoutById.fulfilled, (state, action) => {
      if (action.payload) {
        state.loadouts = [action.payload];
      }
    })
    .addCase(setLoadoutCodeField, (state, action) => {
      state.loadoutCode = action.payload;
    })
    .addCase(saveLoadout.fulfilled, (state) => {
      state.popUp = {
        shown: true,
        message: 'Loadout saved!',
        type: 'success',
      };
    })
    .addCase(saveLoadout.rejected, (state) => {
      state.popUp = {
        shown: true,
        message: 'Failed to save loadout',
        type: 'error',
      };
    })
    .addCase(setEditMode, (state, action) => {
      state.edit.isEditMode = action.payload.isEditMode;
      state.edit.editLoadoutId = action.payload.editLoadoutId;
      state.edit.title = action.payload.title;
      state.edit.description = action.payload.description;
    })
    .addCase(editLoadout.fulfilled, (state) => {
      state.popUp = {
        shown: true,
        message: 'Loadout updated',
        type: 'success',
      };
    })
    .addCase(editLoadout.rejected, (state) => {
      state.popUp = {
        shown: true,
        message: 'Update failed',
        type: 'error',
      };
    })
    .addCase(deleteLoadout.rejected, (state) => {
      state.errorMessage = 'Failed to delete loadout';
    })
    .addCase(closeLoadoutPopUp, (state) => {
      state.popUp.shown = false;
    });
});

export default loadoutReducer;
