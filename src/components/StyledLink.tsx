import { FunctionComponent, ReactNode } from "react";

interface StyledLink {
  href: string;
  children: ReactNode;
}

export const StyledLink: FunctionComponent<StyledLink> = ({
  href,
  children,
}) => {
  return (
    <a
      href={href}
      className="hover:underline focus-visible:rounded-lg focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-black"
    >
      {children}
    </a>
  );
};
