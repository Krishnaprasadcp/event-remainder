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
interface EventsState {
  featuredEvents: FEATURED[];
  allEvents: RecievedFetchData[];
  isFound: boolean;

}
const initialEventsState: EventsState = {
  featuredEvents: [],
  allEvents: [],
  isFound: false,
};
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

    isFeatured: (state, action: PayloadAction<FEATURED>) => {
      const featureData = {
        id: action.payload.id,
        isFeatured: action.payload.isFeatured,
      };
      const existingFeaturedEvent = state.featuredEvents.find(
        (item) => item.id === featureData.id
      );
      if (existingFeaturedEvent) {
        console.log(existingFeaturedEvent.id);
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
