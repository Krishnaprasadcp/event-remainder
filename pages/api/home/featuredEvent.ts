import connectToDatabase from "@/lib/db";
import eventModel from "@/lib/models/event";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==="PATCH"){
        const {querry} = req.body;
        const {userId,isFeatured} = querry;
        
        const db = await connectToDatabase();
        if(db){
            if(isFeatured === true){
                console.log({isFeatured,message:"starred"});
                
                const updatedData =await eventModel.findByIdAndUpdate(userId,{isFeatured:false},{new:true});
                if(!updatedData){
                    return res.status(404).json({ error: 'User not found' });
                }
                res.status(200).json({isFeatured:false});
                
            }
            if(isFeatured === false){
                console.log({isFeatured,message:"unstarred"});
                
                
                const updatedData =await eventModel.findByIdAndUpdate(userId,{isFeatured:true},{new:true});
                if(!updatedData){
                    return res.status(404).json({ error: 'User not found' });
                }
                res.status(200).json({isFeatured:true});
            }
            
        }
        res.status(200).json({message:"Ok"});
    }
  
}
export default handler;