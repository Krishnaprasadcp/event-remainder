import connectToDatabase from "@/lib/db";
import eventModel from "@/lib/models/event";
import UserModel from "@/lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  email: string;
  password: string;
  gender: string;
};
type AllEvents={
    _id:string,
    eventName:string,
    eventDiscription:string,
    date:string,
    time:string,
    image:string,
    consecutiveYear:boolean,
    isFeatured:boolean
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const db = await connectToDatabase();
    if (db) {
      try {
        const { userId } = req.body;
        const home = await UserModel.findById(userId);
        const { firstName, lastName} = home;
        const allEventList = await eventModel.find({userId});
        const featuredEvents = allEventList.filter(item=>item.isFeatured === true);

        console.log(featuredEvents);
        
        res.status(200).json({ firstName, lastName });
      } catch (err) {
        res.status(500).json({ message: "fetching failed..." });
      }
    }
    else{
        res.status(500).json({message:"Server Error..."});
    }
  }
  if (req.method === "GET") {
    const db = await connectToDatabase();
    if (db) {
      try {
        const {
          firstName,
          lastName,
          age,
          phoneNumber,
          email,
          password,
          gender,
        }: Data = req.body;
        let user = await new UserModel<Data>({
          firstName: firstName,
          lastName: lastName,
          age: age,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
          gender: gender,
        });
        let userCreated = await user.save();
        return res.status(200).json({ data: userCreated });
      } catch (error) {
        console.log(error);
      }
      return res.status(404).json({ message: "faild" });
    }
  }
}
export default handler;
