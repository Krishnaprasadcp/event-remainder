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
  isFeatured: boolean;
}
interface FeaturedEvents {
  featuredEvents: object[];
  firstName: string;
  lastName: string;
  isFeatured:boolean;
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const db = await connectToDatabase();
      if (db) {
        const { userId } = req.body;
        console.log(req.body);

        const home = await UserModel.findOne({ _id: userId });
        const { firstName, lastName }: UserData = home;
        const allEventList = await eventModel.find({ userId: userId });
        // console.log(allEventList);

        if (allEventList.length > 0) {
          const featuredEvents = allEventList.filter(
            (item) => item.isFeatured === true
          );

          if (featuredEvents.length > 0) {
            const data: FeaturedEvents = {
              featuredEvents,
              firstName,
              lastName,
              isFeatured:true
            };
            res.status(200).json(data);
          } else {
            const data: NoFeaturedEvents = {
              firstName,
              lastName,
              isFeatured:false,
            };
            res.status(200).json(data);
          }
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error..." });
    }
  }
}
export default handler;
