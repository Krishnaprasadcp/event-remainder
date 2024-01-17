import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react"
const MainNavigation:React.FC = ()=>{
    const signoutButtonHandler=()=>{
        signOut();
    }
    return(
        <div>
            <ul>
                <li><Link href="/home">Home</Link></li>
                <li><Link href="/home/allevents">All Events</Link></li>
                <li><Link href="/home/addremainder">Add Remainder</Link></li>
                <li><Link href="/home/profile">Profile</Link></li>
                <li><button onClick={signoutButtonHandler} type="button">Sign Out</button></li>
            </ul>
        </div>
    )
}
export default MainNavigation;