import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Professional } from "./pages/Professional";
import { Projects } from "./pages/Projects";
import { Artwork } from "./pages/Artwork";
import { StyledLink } from "./components/StyledLink";

export default function App() {
  return (
    <div className="font-ubuntuMono min-v-screen bg-white text-gray-900 dark:text-gray-900">
      <nav className="sticky top-0 z-50 bg-white p-4 shadow-md dark:bg-gray-100">
        <div className="mx-1 flex w-full items-center justify-center pr-2 pl-2 lg:justify-between">
          <h1 className="text-center text-xl lg:text-left">
            michael pflueger • software developer & artist
          </h1>
          {/* <div className="ml-auto hidden space-x-4 lg:flex">
            <StyledLink href="/#professional">professional</StyledLink>
            <StyledLink href="/#projects">projects</StyledLink>
            <StyledLink href="/#artwork">artwork</StyledLink>
            <StyledLink href="/#about">about</StyledLink>
          </div> */}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/professional/:section?" element={<Professional />} />
        <Route path="/projects:section?" element={<Projects />} />
        <Route path="/artwork:section?" element={<Artwork />} />
      </Routes>
      <nav className="sticky bottom-0 z-50 bg-white p-4 lg:hidden dark:bg-gray-100">
        <div className="flex w-full items-center justify-center">
          <div className="space-x-4 text-center">
            <StyledLink href="/#professional">professional</StyledLink>
            <StyledLink href="/#projects">projects</StyledLink>
            <StyledLink href="/#artwork">artwork</StyledLink>
            <StyledLink href="/#about">about</StyledLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
