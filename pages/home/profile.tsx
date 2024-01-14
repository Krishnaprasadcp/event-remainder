import { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";

const Profile:NextPage =():JSX.Element=>{
    return(
        <h1>Profile</h1>
    )
}
export default Profile;

export const getServerSideProps = async(context:GetServerSidePropsContext)=>{
    const session = await getSession({req:context.req});
    if(!session){
        return{
            redirect:{
                destination:"/signin",
                permanent:false
            }
        }
    }
    return{
        props:{
            session
        }
    }
}
// export async function getServerSideProps(context:GetServerSidePropsContext){
//     const session = await getSession({req:context.req});
//     if(!session){
//         return{
//             redirect:{
                
//             }
//         }
//     }
// }