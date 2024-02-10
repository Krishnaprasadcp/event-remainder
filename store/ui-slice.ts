import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface ERROR {
    statusCode: number|null;
    message: string;
  }
const initialUiSlice:ERROR={
    message:"",
    statusCode:null
};
const uiSlice = createSlice({
    name:"uiSlice",
    initialState:initialUiSlice,
    reducers:{
        showNotification:(state,action:PayloadAction<ERROR>)=>{
            state.statusCode = action.payload.statusCode;
            state.message = action.payload.message;
        }
    }
});
export const uiSliceAction = uiSlice.actions;
export default uiSlice;