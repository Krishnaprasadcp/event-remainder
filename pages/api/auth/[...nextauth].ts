import { verifyPassword } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import UserModel from "@/lib/models/user";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const db = await connectToDatabase();

        const { email, password } = credentials as {
          email: string;
          password: string;
        };
    
        const userData = await UserModel.findOne({ email });
        
        if (!userData) {
          throw new Error("No Email is Registered...");
        }
        const userHashedPassword = userData.password;
        const isValid = await verifyPassword(password, userHashedPassword);
        if (!isValid) {
          throw new Error("Password is incorrect...");
        }
      
        
        const user = {id:userData._id.toString(),email:email,name:userData._id.toString()}
    
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};
export default NextAuth(authOptions);
