import { FunctionComponent } from "react";
// import { Card } from "../components/Card";
// import { useNavigate } from "react-router-dom";
import profile from "../assets/michael.jpg";
// import okta from "../assets/okta.gif";
// import hw from "../assets/hw_array.gif";

export const Home: FunctionComponent = () => {
  // const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 text-center">
      {/* <h2 id="professional" className="scroll-mt-16 pt-5 text-3xl">
        professional
      </h2>

      <div className="flex w-full flex-wrap justify-center gap-6 p-4">
        <Card
          onClick={() => {
            navigate("professional/okta");
          }}
          // imageUrl={okta}
          title="Okta SSO"
          description="multi-tennant single sign on with the Okta platform"
        />
        <Card
          // imageUrl={hw}
          title="Hardware Device Interface"
          description="monitoring and control for custom hardware device"
        />
        {/* <Card
          imageUrl={hw}
          title="ETL & Charts"
          description="custom charts for displaying data from an ETL process"
        />
        <Card
          imageUrl={hw}
          title="Navigation menu"
          description="navigation for desktop and mobile views"
        /> 
      </div>
      <h2 id="projects" className="scroll-mt-16 pt-5 text-3xl">
        personal projects
      </h2>
      <div className="flex w-full flex-wrap justify-center gap-4 p-4">
        <Card />
        <Card />
      </div>
      <h2 id="artwork" className="scroll-mt-16 pt-5 text-3xl">
        artwork
      </h2>
      <div className="flex w-full flex-wrap justify-center gap-4 p-4">
        <Card title="paintings, drawings, and murals" />
      </div> */}
      <h2 id="about" className="scroll-mt-16 pt-5 text-3xl">
        about
      </h2>
      <div className="flex flex-col items-center justify-center gap-1 space-x-4 p-2 lg:flex-row lg:items-start lg:gap-2">
        <img
          src={profile}
          alt={"michael pflueger"}
          className="m-0 h-24 w-24 rounded-full object-cover lg:h-32 lg:w-32"
        />
        <p className="max-w-lg text-left lg:max-w-xl">
          I am a Full Stack Software Developer with a unique background in
          mathematics, art, and teaching, holding both an M.Sc. from University
          of Pennsylvania, an M.A. from Villanova, and experience as a Fulbright
          Scholar. Currently, I specialize in building components for an award
          winning Saas platform used by leading tech companies to enhance
          in-person interactive experiences. From the classroom to the tech
          world, I excel at being adaptable and resourceful in new situations.
        </p>
      </div>
    </div>
  );
};
