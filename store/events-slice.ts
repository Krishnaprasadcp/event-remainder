import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RecievedFetchData {
  _id: string;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  imageData: string | undefined;
  isConsecutiveYear: boolean;
  isFeatured: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
interface USERDATA {
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  email: string;
  password: string;
  gender: string;
}
interface FEATURED {
  id: string;
  isFeatured: boolean;
}
interface EditEventProp{
 
    id:string,
    userId:string
}
interface EventsState {
  featuredEvents: FEATURED[];
  allEvents: RecievedFetchData[];
  isOpen:boolean;
  editEvent:EditEventProp;
  isChanged:boolean;
}
const initialEventsState: EventsState = {
  featuredEvents: [],
  allEvents: [],
  isOpen:false,
  editEvent:{
    id:"",
    userId:""
  },
  isChanged:false
};

interface DELETEDATA{
  deletedData:{
    id:string,
    userId:string;
  };
  message:string;
}
const eventsSlice = createSlice({
  name: "events",
  initialState: initialEventsState,
  reducers: {
    allEvents: (state, action: PayloadAction<RecievedFetchData[]>) => {
      state.allEvents = action.payload;
      state.featuredEvents = state.allEvents.map((item) => ({
        id: item._id,
        isFeatured: item.isFeatured,
      }));
    },
    addEvent: (state, action: PayloadAction<RecievedFetchData>) => {
      if (state.allEvents.length <= 0) {
        console.log("hiii");
      } else {
        state.allEvents.push(action.payload);
      }
    },
    deleteEvent:(state,action:PayloadAction<DELETEDATA>)=>{
      const deletedId = action.payload.deletedData;
      state.allEvents = state.allEvents.filter(item=>item._id !==deletedId.id );
       
    },
    editEvent:(state)=>{
      state.isOpen = !state.isOpen;
      state.isChanged = true;
    },
    editEventForm:(state,action:PayloadAction<EditEventProp>)=>{
      const ids = action.payload;
      state.editEvent.id =ids.id;
      state.editEvent.userId = ids.userId;
    },
    editEventData:(state,action:PayloadAction<RecievedFetchData>)=>{
      const updatedArray = action.payload;
      const newArray = state.allEvents.find(item=>item._id === action.payload._id);
      newArray!.eventName = updatedArray.eventName;
      newArray!.eventDescription = updatedArray.eventDescription;
      newArray!.eventDate = updatedArray.eventDate;
      newArray!.eventTime = updatedArray.eventTime;
      newArray!.isConsecutiveYear = updatedArray.isConsecutiveYear;
      
    },
    isFeatured: (state, action: PayloadAction<FEATURED>) => {
      const featureData = {
        id: action.payload.id,
        isFeatured: action.payload.isFeatured,
      };
    
      const existingFeaturedEvent = state.featuredEvents.find(
        (item) => item.id === featureData.id
      );
      
      if (existingFeaturedEvent) {
        const event = state.allEvents.find(
          (item) => item._id === existingFeaturedEvent.id
        );
        if (event!.isFeatured === false) {
          event!.isFeatured = true;
        } else {
          event!.isFeatured = false;
        }
      } else {
        console.log("jii");
      }
    },
  },
});

export const eventSliceActions = eventsSlice.actions;

export default eventsSlice;
