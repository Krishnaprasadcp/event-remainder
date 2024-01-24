import { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";

const Profile:NextPage =():JSX.Element=>{
    return(
        <>
            <div className="grid justify-items-center gap-6">
                <div className=" mt-16 rounded-full m-auto w-80 h-80">
                <Image className="h-full w-full object-cover rounded-full" src="/images/image.png" width={320} height={320} alt="profile image" />
                </div>
                <div className="mt-8">
                    <p>Krishnaprasad</p>
                </div>
                <div>
                    <p>Email:Kp@gmail.com</p>
                </div>
                <div>
                    <p>Phone no:965845245</p>
                </div>
                <div>
                    <p>Gender:Male</p>
                </div>
                <div>
                    <p>Age:21</p>
                </div>
                <div>
                    <p>Address:Murukjumpuzha Pala</p>
                </div>
                <div>
                    <p>User Id:jdbdyuwdb61154dm</p>
                </div>
            </div>
        </>
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