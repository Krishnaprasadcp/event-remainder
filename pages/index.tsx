import { useSession } from "next-auth/react";

 function Home() {
  const {status,data:session} = useSession();
  if(status === "authenticated"){
    return (
      <div>
        {session.user?.name}
        {session.user?.email}
      </div>
    )
  }
  else{
    return(
      <div>
        Not loged in
      </div>
    )
  }
 
}
export default Home;