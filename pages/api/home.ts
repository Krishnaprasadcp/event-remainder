import connectToDatabase from "@/lib/db";
import UserModel from "@/lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";

type Data={
    firstName:string,
    lastName:string,
    age:number,
    phoneNumber:string,
    email:string,
    password:string,
    gender:string,
}

async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==='GET'){
        
            console.log('connected');
            try{
                const home = await UserModel.find();
                console.log(home.toString());
                
            res.status(200).json(home);
            }
            catch(err){
                console.log(err);
                
            }
            res.status(400).send("not found")
            

           
        
    }
    if(req.method === "POST"){
        const db =await connectToDatabase();
       if(db){
        try {
            const {firstName,lastName,age,phoneNumber,email,password,gender}:Data = req.body;
            let user = await new UserModel<Data>({
                firstName:firstName,lastName:lastName,
                age:age,phoneNumber:phoneNumber,email:email,password:password,gender:gender
            });
            let userCreated = await user.save();
            return res.status(200).json({"data":userCreated});
        } catch (error) {
            console.log(error);
            
        }
        return res.status(404).json({message:"faild"})
   
       }
       
    }
}
export default handler;