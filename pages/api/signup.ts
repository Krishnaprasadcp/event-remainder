import { hashPasswordMethod } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import UserModel from "@/lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  imageData:string;
  email: string;
  password: string;
  gender: string;
}
interface ID {
  _id: string;
}
type USER = ID & Data;
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const db = await connectToDatabase();
      if (db) {
        const {
          firstName,
          lastName,
          age,
          phoneNumber,
          imageData,
          email,
          password,
          gender,
        }: Data = req.body;

        if (typeof firstName !== "string" || firstName == null) {
          return res
            .status(406)
            .json({ message: "The Entered Data is Not Valid" });
        }
        if (typeof lastName !== "string" || lastName == null) {
          return res
            .status(406)
            .json({ message: "The Entered Data is Not Valid" });
        }
        if (typeof age !== "number" || age == null) {
          return res
            .status(406)
            .json({ message: "The Entered Data is Not Valid" });
        }
        if (typeof phoneNumber !== "string" || phoneNumber == null) {
          return res
            .status(406)
            .json({ message: "The Entered Data is Not Valid" });
        }
        if (typeof email !== "string" || email == null) {
          return res
            .status(406)
            .json({ message: "The Entered Data is Not Valid" });
        }
        if (typeof password !== "string" || password == null) {
          return res
            .status(406)
            .json({ message: "The Entered Data is Not Valid" });
        }
        if (typeof gender !== "string" || gender == null) {
          return res
            .status(406)
            .json({ message: "The Entered Data is Not Valid" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);

        if (!isValidEmail) {
          return res
            .status(406)
            .json({ message: "The Entered Email is Not Valid" });
        }
        const validEmail = await UserModel.find({ email: email });
        console.log(validEmail);

        if (validEmail.length !== 0) {
          return res
            .status(400)
            .json({ message: "User is already Registered", validEmail });
        }
        const hashedPassword = await hashPasswordMethod(password);
        console.log(hashedPassword);

        const user = await new UserModel({
          firstName,
          lastName,
          age,
          phoneNumber,
          imageData,
          email,
          password: hashedPassword,
          gender,
        });
        // console.log(user);

        const userCreated: USER = await user.save();
        const userId: string = userCreated._id.toString();
        return res.status(200).json({ userId });
      } else {
        return res.status(500).json({ message: "SignUp Failed" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server Failed" });
    }
  }
}
export default handler;
