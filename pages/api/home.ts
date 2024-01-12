import { NextApiRequest, NextApiResponse } from "next";

type Data={
    name:string;
}

export default function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==='GET'){
        const data:Data = {name:'kp'};
        res.status(200).json(data);
    }
}