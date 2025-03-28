import { FunctionComponent } from "react";
import testImg from "../assets/test-img.png";

interface CardProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
}

export const Card: FunctionComponent<CardProps> = ({
  imageUrl = testImg,
  title = "",
  description = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${onClick ? "cursor-pointer" : ""} brightness-95focus-visible:fv-styles group transition-color w-sm overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-400 focus-visible:rounded-lg focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-gray-500 active:bg-gray-700`}
    >
      <div className="h-48 overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={title}
          className="transition- h-48 w-full object-cover brightness-90 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-100 group-active:brightness-95"
        />
      </div>
      <div className="h-24 overflow-hidden px-6 py-2">
        <h2 className="transition-color text-xl font-semibold text-gray-800 duration-300 group-hover:text-gray-100 group-active:text-gray-200">
          {title}
        </h2>
        <p className="transition-color text-base text-gray-600 duration-300 group-hover:text-gray-200 group-active:text-gray-300">
          {description}
        </p>
      </div>
    </button>
  );
};
