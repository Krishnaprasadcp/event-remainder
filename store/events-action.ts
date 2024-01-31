import { getSession } from "next-auth/react"
import { AppDispatch } from ".";
import { eventSliceActions } from "./events-slice";

interface FetchEventProperty{
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
interface fetchedUserProperty{
    firstName:string;
    lastName:string;
    isFeatured:boolean;
}
interface fetchedEventData{
    eventData:FetchEventProperty[]
}
export const fetchEventData = (userId:string)=>{
    return async (dispatch:AppDispatch)=>{
        const fetchData = async()=>{
            
            const response = await fetch("http://localhost:3000/api/home/homedata",{
                method:"POST",
                body:JSON.stringify({userId}),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(!response.ok){
                throw new Error("Cant fetch the data");
            }
            const eventData = await response.json();
            return eventData;
        }
        try{
            const data = await fetchData();
            console.log(data.firstName);
            
            // const eventData={
            //     _id:data._id,
            //     eventName:data.eventName,
            //     eventDescription:data.eventDescription,
            //     eventDate:data.eventDate,
            //     eventTime:data.eventTime,
            //     imageData:data.imageData,
            //     isConsecutiveYear:data.isConsecutiveYear,
            //     isFeatured:data.isFeatured,
            //     userId:data.userId
            // }
            // dispatch(eventSliceActions.replaceHomeEvents({
            //     fetchedEventData:data
            // }))
        }
        catch(err){
            console.log(err);
            
        }
    }
}