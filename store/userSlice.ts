import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface USERDATA {
    _id:string;
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  imageData:"";
  email: string;
  password: string;
  gender: string;
}

const initialUserData: USERDATA = {
    _id:"",
    firstName: "",
    lastName: "",
    age: 0,
    phoneNumber: "",
    imageData:"",
    email: "",
    password: "",
    gender: "",
};
const userSlice = createSlice({
  name: "userslice",
  initialState: initialUserData,
  reducers: {
    userData: (state, action: PayloadAction<USERDATA>) => {
        const data = action.payload;
        console.log(data);
        state._id = data._id;
        state.firstName = data.firstName;
        state.lastName = data.lastName;
        state.age = data.age;
        state.phoneNumber = data.phoneNumber;
        state.imageData = data.imageData;
        state.email = data.email;
        state.password = data.password;
        state.gender= data.gender;
    },
  },
});

export const userSliceAction = userSlice.actions;
export default userSlice;

