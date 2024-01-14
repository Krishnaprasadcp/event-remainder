import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

const Home: NextPage = (props): JSX.Element => {
  return <h1>HomePage</h1>;
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
    return{
        props:{session}
    }
}