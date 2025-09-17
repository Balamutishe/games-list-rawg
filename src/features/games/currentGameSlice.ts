import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from '@app/store/store.ts'

interface CurrentGameState {
  gameId: number | null
}

const initialState: CurrentGameState = {
  gameId: null
}

export const currentGameSlice = createSlice( {
  name: 'currentGame',
  initialState,
  reducers: {
    setCurrentGame: ( state, action: PayloadAction<number | null> ) => {
      state.gameId = action.payload
    }
  }
} )

export const { setCurrentGame } = currentGameSlice.actions
export const selectCurrentGame = ( state: RootState ) => state.currentGame.gameId

export default currentGameSlice.reducer