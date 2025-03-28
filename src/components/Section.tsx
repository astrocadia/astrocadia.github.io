import { FunctionComponent, ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export const Section: FunctionComponent<SectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className="container mx-auto flex flex-col gap-4 p-8 text-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      {children}
    </div>
  );
};
