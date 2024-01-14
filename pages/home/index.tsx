import { NextPage } from "next";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Home: NextPage = (props): JSX.Element => {
    const router = useRouter();
    console.log(props);
    const logoutHandler=()=>{
        signOut();
    }
    const profileHandler=()=>{
        router.push("/home/profile");
    }
  return(
    <div>
        <h1>HomePage</h1>
        <button onClick={logoutHandler}>Logout</button>
        <button onClick={profileHandler}>Profile</button>
    </div>
  );
};
export default Home;
export const getServerSideProps= async(context:any)=>{
    const session =await getSession({req:context.req});
    
    if(!session){
        return{
            redirect:{
                destination:"/signin",
                permanent:false
            }
        }
    }
    const email = session.user!.email;
    
    const homeData = await fetch("http://localhost:3000/api/home/homedata",{
        method:"POST",
        body:JSON.stringify({userId:email}),
        headers:{
            "Content-Type":"application/json"
        }
    });
    const data = await homeData.json();
    
    return{
        props:{session,data}
    }
}