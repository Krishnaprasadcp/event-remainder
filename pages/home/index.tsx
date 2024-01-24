import EventComponent from "@/components/events/EventComponent";
import { NextPage } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

type EVENTDATA={
  _id:string;
  eventName:string;
  eventDescription:string;
  eventDate:string;
  eventTime:string;
  imageData:string | undefined;
  isConsecutiveYear:boolean;
  isFeatured: boolean;
}
interface FeaturedEvents{
  featuredEvents:EVENTDATA[];
  isFeatured: boolean;
};

interface PROPDATA {
  firstName: string;
  lastName: string;
  
  data: FeaturedEvents;
}

const Home: NextPage<PROPDATA> = (props:PROPDATA): JSX.Element => {
  const router = useRouter();
  const eventsData:FeaturedEvents = props.data;
  const event = eventsData.featuredEvents;
  console.log(props.data.isFeatured);
  
  return (
    <>
      <p className="font-irish text-4xl m-14">
        Welcom <span className="block">Krishnaprasad!</span>
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
        {!props.data.isFeatured && <div className="mb-2"><p className="text-3xl text-center">No Featured Events Present</p></div>}
        {props.data.isFeatured && <div className="mb-2">
          {event.map((eventDetails)=>(
        
            <EventComponent eventDetails={eventDetails} />
            
          ))}
          </div>}
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

  const userIdResponse = await fetch(
    "http://localhost:3000/api/home/getUserId",
    {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const userData = await userIdResponse.json();
  const userId = userData.userId;

  const homeData = await fetch("http://localhost:3000/api/home/homedata", {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await homeData.json();

  return {
    props: { session, data },
  };
};
