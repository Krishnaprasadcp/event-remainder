import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./events-slice";

const store = configureStore({
    reducer:{
        events:eventsSlice.reducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;