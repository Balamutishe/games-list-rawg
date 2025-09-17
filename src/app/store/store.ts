import { configureStore } from '@reduxjs/toolkit'
import currentGameReducer from "@features/games/currentGameSlice.ts";

export const store = configureStore( {
  reducer: {
    currentGame: currentGameReducer
  }
} )

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch