import React, { Fragment } from "react";
import MainNavigation from "../navigation/mainNavigation";

interface LayoutProps{
    children:React.ReactNode;
}
const Layout:React.FC<LayoutProps>=({children})=>{
    return(
       <Fragment>
        <MainNavigation />
        <div>{children}</div>
       </Fragment>
    )
}
export default Layout;