import connectToDatabase from "@/lib/db";
import eventModel from "@/lib/models/event";
import UserModel from "@/lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";

type UserData = {
  firstName: string;
  lastName: string;
};
interface NoFeaturedEvents {
  firstName: string;
  lastName: string;
  message: string;
}
interface FeaturedEvents {
  featuredEvents: object[];
  firstName: string;
  lastName: string;
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const db = await connectToDatabase();
      if (db) {
        const { userId } = req.body;
        console.log(userId);
        
        const home = await UserModel.findOne({email:userId});
        const { firstName, lastName }: UserData = home;
        const allEventList = await eventModel.find({ userId });
        if (allEventList.length > 0) {
          const featuredEvents = allEventList.filter(
            (item) => item.isFeatured === true
          );
          if (featuredEvents.length > 0) {
            const data: FeaturedEvents = {
              featuredEvents,
              firstName,
              lastName,
            };
            res.status(200).json(data);
          }
        } else {
          const data: NoFeaturedEvents = {
            firstName,
            lastName,
            message: "No Featured Events",
          };
          res.status(200).json(data);
        }
      } 
    } catch (error) {
      res.status(500).json({ message: "Server Error..." });
    }
  }
}
export default handler;
