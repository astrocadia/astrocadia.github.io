import { FunctionComponent } from "react";
import testImg from "../assets/test-img.png";

interface CardProps {
  imageUrl?: string;
  title?: string;
  description?: string;
}

export const Card: FunctionComponent<CardProps> = ({
  imageUrl = testImg,
  title = "test",
  description = "desc",
}) => {
  return (
    <div className="w-sm overflow-hidden rounded-lg bg-white shadow-lg">
      <img src={imageUrl} alt={title} className="h-48 w-full" />
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-base text-gray-600">{description}</p>
      </div>
    </div>
  );
};
