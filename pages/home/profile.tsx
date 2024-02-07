import { useAppSelector } from "@/store/hooks";
import { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";

const Profile:NextPage =():JSX.Element=>{
    const userData = useAppSelector(state=>state.user);
    console.log(userData);
    
    return(
        <>
            <div className="grid justify-items-center gap-6">
                <div className=" mt-16 rounded-full m-auto w-80 h-80">
                <Image className="h-full w-full object-cover rounded-full" src={userData.imageData!} width={320} height={320} alt="profile image" />
                </div>
                <div className="mt-8">
                    <p>{userData.firstName} {userData.lastName}</p>
                </div>
                <div>
                    <p>Email:{userData.email}</p>
                </div>
                <div>
                    <p>Phone no:{userData.phoneNumber}</p>
                </div>
                <div>
                    <p>Gender:{userData.gender}</p>
                </div>
                <div>
                    <p>Age:{userData.age}</p>
                </div>
                <div>
                    <p>User Id:{userData._id}</p>
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
