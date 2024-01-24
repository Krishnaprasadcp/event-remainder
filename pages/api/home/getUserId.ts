import connectToDatabase from "@/lib/db";
import UserModel from "@/lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userEmail = req.body;

    const db = await connectToDatabase();
    if (db) {
      const response = await UserModel.findOne(userEmail);
      if (response) {
        const userId = response._id;
        const firstName = response.firstName;
        const lastName = response.lastName;
        res.status(200).json({userId,firstName,lastName});
      }
    }
    res.status(400).json({ message: "Can t get the email" });
  }
}
export default handler;
