import connectToDatabase from "@/lib/db";
import UserModel from "@/lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";

interface ID{
    userId:string
};
async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "POST"){
        try {
            const db = await connectToDatabase();
            if(db){
                const {userId}:ID = req.body;
                const userData = await UserModel.findById(userId);
                res.status(200).json(userData);
            }    
        }
        catch (error) {
            res.status(500).json({message:"Server Error...."})
        }
    }
}
export default handler;