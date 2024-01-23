import EventComponent from "@/components/events/EventComponent";
import { NextPage } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Home: NextPage = (props): JSX.Element => {
  const router = useRouter();
  console.log(props);

  return (
    <>
      <p className="font-irish text-4xl m-14">
        Welcom <div>Krishnaprasad!</div>
      </p>
      <div className="flex justify-between w-full">
        <div className="w-full bg-border-orange h-0.5"></div>
        <div className="mx-9 -mt-4">
          <p className="text-3xl">
            <span className="font-lexend tracking-widest">EVENT</span>
            <span className="font-lexend">ADDER</span>
          </p>
        </div>
      </div>
      <div className="mt-3">
        
        <EventComponent />
       
      </div>
    </>
  );
};
export default Home;
export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  const email = session.user!.email;

  const homeData = await fetch("http://localhost:3000/api/home/homedata", {
    method: "POST",
    body: JSON.stringify({ userId: email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await homeData.json();

  return {
    props: { session, data },
  };
};
