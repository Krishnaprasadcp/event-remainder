import connectToDatabase from "@/lib/db";
import eventModel from "@/lib/models/event";
import UserModel from "@/lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";
interface EventData{
    eventName:string;
    eventDescription:string;
    eventDate:string;
    eventTime:string;
    imageData:string | undefined;
    isConsecutiveYear:boolean;
    isFeatured:boolean;
    userId:string;
   
  }
async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "GET"){
    
    }
    if(req.method ==="POST"){
        const db =await connectToDatabase();
        const data = req.body;
        console.log(data);
        
        const userId = data.userId;
        const {eventName,eventDescription,eventDate,eventTime,imageData,isConsecutiveYear} = data.eventData;
    
        console.log(imageData);
        console.log(eventDate);
        if(eventName === ""){
            res.status(400).json({message:"Event Name Can't be empty",statusCode:400});
        }
        if(eventDescription === ""){
            res.status(400).json({message:"Event Description Can't be empty",statusCode:400});
        }
        if(eventDate === ""){
            res.status(400).json({message:"Event Date Can't be empty",statusCode:400});
        }
        if(eventTime === ""){
            res.status(400).json({message:"Event Time Can't be empty",statusCode:400});
        }
        
        const event =  new eventModel<EventData>({
            eventName,
            eventDescription,
            eventDate,
            eventTime,
            imageData:imageData.fileUrl,
            isConsecutiveYear,
            isFeatured:false,
            userId:userId
            
        });
        
        try {
            let createdEvent = await event.save();
            const updateEventId =await UserModel.findByIdAndUpdate(userId,{$push:{events:createdEvent._id}},{new:true});
            console.log(createdEvent);
            res.status(200).json(createdEvent);
        } 
        catch (error) {
            res.status(404).json({message:"Cant enter the event"})
        }
        
        
    }
}
export default handler;