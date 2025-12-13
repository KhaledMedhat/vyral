import { RootState } from "~/redux/store";

export const selectChannels = (state: RootState) => state.channels.channelsInfo;
