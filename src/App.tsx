import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Professional } from "./pages/Professional";
import { Projects } from "./pages/Projects";
import { Artwork } from "./pages/Artwork";
import { StyledLink } from "./components/StyledLink";

export default function App() {
  return (
    <div className="font-ubuntuMono min-v-screen bg-gray-100 text-gray-900 dark:text-black">
      <nav className="sticky top-0 z-50 bg-white p-4 shadow-md dark:bg-gray-200">
        <div className="container mx-1 flex justify-between">
          <h1 className="text-xl">
            michael pflueger • software developer & artist
          </h1>
          <div className="space-x-4">
            <StyledLink href="#professional">Professional</StyledLink>
            <StyledLink href="#projects">Projects</StyledLink>
            <StyledLink href="#artwork">Artwork</StyledLink>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/professional" element={<Professional />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/artwork" element={<Artwork />} />
      </Routes>
    </div>
  );
}
