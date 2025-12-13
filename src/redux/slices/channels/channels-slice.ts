import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Channel, ChannelInitialState } from "~/interfaces/channels.interface";

const initialState: ChannelInitialState = {
  channelsInfo: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<Channel[]>) => {
      state.channelsInfo = action.payload;
    },
  },
});

export const { setChannels } = userSlice.actions;
export default userSlice.reducer;
