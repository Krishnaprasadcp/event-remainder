import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
interface MainNavigationProps{
    children?:React.ReactNode;
}
const MainNavigation:React.FC<MainNavigationProps>= ({children})=>{
    const router = useRouter();
    const signoutButtonHandler=()=>{
        signOut();
    }
    return(
        <div className="mt-5 text-lg ">
            <ul className="flex justify-around mr-56">
                <li><Link href="/home" legacyBehavior><a className={router.pathname=="/home" ? "border border-border-orange px-4":"text-white"}>Home</a></Link></li>
                <li><Link href="/home/allevents" legacyBehavior><a className={router.pathname=="/home/allevents" ? "border border-border-orange px-4":"text-white"}>All Events</a></Link></li>
                <li><Link href="/home/addremainder"legacyBehavior><a className={router.pathname=="/home/addremainder" ? "border border-border-orange px-4":"text-white"}>Add Remainder</a></Link></li>
                <li><Link href="/home/profile"legacyBehavior><a className={router.pathname=="/home/profile" ? "border border-border-orange px-4":"text-white"}>Profile</a></Link></li>
                <li><button onClick={signoutButtonHandler} type="button">Sign Out</button></li>
            </ul>
            <div>{children}</div>
        </div>
    )
}
export default MainNavigation;