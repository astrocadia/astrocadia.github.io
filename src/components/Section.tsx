import { FunctionComponent } from "react";

interface SectionProps {
  title: string;
}

export const Section: FunctionComponent<SectionProps> = ({ title }) => {
  return (
    <div className="container mx-auto p-8 text-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="mt-4 text-lg">Content coming soon...</p>
    </div>
  );
};
