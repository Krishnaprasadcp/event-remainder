import { AppDispatch } from ".";
import { eventSliceActions } from "./events-slice";
export const fetchAllEventData =(userId: string) => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {

      const response = await fetch("http://localhost:3000/api/home/events", {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Cant fetch the data");
      }
      const eventData = await response.json();
      return eventData;
    };
 
    try {
      const data = await fetchData();
      dispatch(eventSliceActions.allEvents(data));
    } catch (err) {
      console.log(err);
    }
  };
};
interface StarButtonProp {
  id: string;
  isFeatured: boolean;
  userId:string;
}
async function editFetch(featuredEvent:StarButtonProp){
    const response = await fetch(
        "http://localhost:3000/api/home/featuredEvent",
        {
          method: "PATCH",
          body: JSON.stringify({ featuredEvent }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
}
export const starButtonProcess = (featureEvent: StarButtonProp) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await editFetch(featureEvent);
      if (!response.ok) {
        console.log("Cant update");
      }
      const data = await response.json();
      dispatch(eventSliceActions.isFeatured(featureEvent));
    } catch (err) {
      console.log(err);
    }
  };
};
export const unStartButtonProcess = (featuredEvent: StarButtonProp) => {
  return async (dispatch:AppDispatch) => {
    try {
      const response = await editFetch(featuredEvent);
      if (!response.ok) {
        console.log("Cant update");
      }
      const data = await response.json();
      dispatch(eventSliceActions.isFeatured(featuredEvent));
    } catch (error) {
      console.log(error);
    }
  };
};
