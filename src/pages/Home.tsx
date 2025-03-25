import { FunctionComponent } from "react";
import { Card } from "../components/Card";

export const Home: FunctionComponent = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <h2 id="professional" className="scroll-mt-16 pt-5 text-3xl">
        professional
      </h2>
      {/* <p className="mt-4 text-lg">
        Explore my work in software development, personal projects, and artwork.
      </p> */}

      <div className="flex w-full flex-wrap justify-center gap-4 p-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <h2 id="projects" className="scroll-mt-16 pt-5 text-3xl">
        personal projects
      </h2>

      <div className="flex w-full flex-wrap justify-center gap-4 p-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <h2 className="scroll-mt-16 pt-10 text-3xl">artwork</h2>

      <div
        id="artwork"
        className="flex w-full flex-wrap justify-center gap-4 p-4"
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
