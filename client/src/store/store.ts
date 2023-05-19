import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import noteReducer from './slices/noteSlice';

export const store =  configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        note: noteReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;