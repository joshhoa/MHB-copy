import { configureStore } from '@reduxjs/toolkit';
import builderReducer from './reducers/builder';
import userReducer from './reducers/user';
import loadoutReducer from './reducers/loadout';

const store = configureStore({
  reducer: {
    builder: builderReducer,
    user: userReducer,
    loadout: loadoutReducer,
  },
});

export default store;

// Deduce type of `RootState` and `AppDispatch` from store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
