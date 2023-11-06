import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PlayersState {
  active: number | null;
}

const initialState: PlayersState = {
  active: null,
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    activatePlayer: (
      state,
      action: PayloadAction<{
        playerId: number;
      }>
    ) => {
      state.active = action.payload.playerId;
      return state;
    },
    deactivatePlayer: (state) => {
      state.active = null;
      return state;
    },
  },
});

export const { activatePlayer, deactivatePlayer } = playersSlice.actions;
