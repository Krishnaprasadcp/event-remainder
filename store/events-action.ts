import { AppDispatch } from ".";
import { eventSliceActions } from "./events-slice";

export const fetchAllEventData = (userId:string)=>{
    return async (dispatch:AppDispatch)=>{
        const fetchData = async()=>{
            console.log(userId);
            
            const response = await fetch("http://localhost:3000/api/home/events",{
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
            dispatch(eventSliceActions.allEvents(data));
            
        }
        catch(err){
            console.log(err);
            
        }
    }
}
interface StarButtonProp{
    id:string;
    isFeatured:boolean;
}
export const starButtonProcess =(featureEvent:StarButtonProp)=>{
    return async(dispatch:AppDispatch)=>{
        const editFetch=async()=>{
            const response  = await fetch("")
        }
        try{
            const editFeature = await editFetch();
            dispatch(eventSliceActions.isFeatured(featureEvent))
        }
        catch(err){
            console.log(err);
            
        }
        
    }
}


