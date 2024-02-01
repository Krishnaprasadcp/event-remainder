import { PayloadAction, createSlice } from "@reduxjs/toolkit";


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
    createdAt:string;
    updatedAt:string;
}
interface FEATURED{
    id:string
    isFeatured:boolean;
}
interface EventsState{

    isFeatured:FEATURED[],
    allEvents:RecievedFetchData[],
    isFound:boolean
}
const initialEventsState:EventsState  = {

    isFeatured:[],
    allEvents:[],
    isFound:false
}
const eventsSlice = createSlice({
    name:"events",
    initialState:initialEventsState,
    reducers:{
        allEvents:(state,action:PayloadAction<RecievedFetchData[]>)=>{
            state.allEvents = action.payload;
            state.isFeatured = state.allEvents.map(item=>(
                {
                    id:item._id,
                    isFeatured:item.isFeatured
                }
               ));
               console.log(state.isFeatured);
               
        },
        addEvent:(state,action:PayloadAction<RecievedFetchData>)=>{
            if(state.allEvents.length <=0){
                console.log("hiii");
                
            }
            else{
                state.allEvents.push(action.payload);
            }
        },
        
        isFeatured:(state,action:PayloadAction<FEATURED>)=>{
          console.log(action.payload);
          const found = state.isFeatured.find(item=>item.id === action.payload.id);
          
        }
    }
});

export const eventSliceActions = eventsSlice.actions;

export default eventsSlice;