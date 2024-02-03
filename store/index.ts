import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./events-slice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer:{
        events:eventsSlice.reducer,
        user:userSlice.reducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;