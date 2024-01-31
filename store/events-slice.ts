import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface EventProperty{
    eventName:string;
    eventDescription:string;
    eventDate:string;
    eventTime:string;
    imageData:string | undefined;
    isConsecutiveYear:boolean;
}
interface FetchEventProperty{
    _id:string;
  eventName:string;
  eventDescription:string;
  eventDate:string;
  eventTime:string;
  imageData:string | undefined;
  isConsecutiveYear:boolean;
  isFeatured: boolean;
}
interface RecievedFetchData{
    _id:string;
  eventName:string;
  eventDescription:string;
  eventDate:string;
  eventTime:string;
  imageData:string | undefined;
  isConsecutiveYear:boolean;
  isFeatured: boolean;
  userId:string;
}
interface EventsState{
    events:EventProperty[],
    fetchedEvents: RecievedFetchData[]
}
const initialEventsState:EventsState = {
    events:[],
    fetchedEvents:[]
}
const eventsSlice = createSlice({
    name:"events",
    initialState:initialEventsState,
    reducers:{
        addEvents:(state,action:PayloadAction<EventProperty>)=>{
            // state.events.push({

            // })
        },
        replaceHomeEvents:(state,action:PayloadAction<RecievedFetchData>)=>{
            state.fetchedEvents = action.payload
        }
    }
});

export const eventSliceActions = eventsSlice.actions;

export default eventsSlice;