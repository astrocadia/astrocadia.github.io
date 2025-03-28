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
      className="hover:text-gray-700 focus-visible:rounded-lg focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-gray-400 active:text-gray-500"
    >
      {children}
    </a>
  );
};
