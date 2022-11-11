import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import LogoCard from "./LogoCard";
import ProjectCard from "./ProjectCard";
const texts: string[] = [
  "AWS",
  "Android",
  "Arduino",
  "CPP",
  "Express",
  "Firebase",
  "Git",
  "GraphQL",
  "Heroku",
  "JWT",
  "Mongo",
  "NextJS",
  "NodeJS",
  "Python",
  "React",
  "Tailwind",
  "TypeScript",
];
export default function Projects() {
  return (
    <div className="-z-10 bg-gradient-to-b to-dark-background from-[#1F1F22] backdrop-blur-sm min-h-[100vh] min-w-screen ">
      <div className="pt-[100px] flex flex-col items-center justify-center min-w-screen">
        <Fade duration={2000}>
          <div>
            <h1 className="text-5xl font-black">Projects</h1>
          </div>
          <hr className="mt-8 mb-8 w-[100px] h-px bg-primary border-2 border-primary dark:bg-primary" />
        </Fade>
      </div>
      <Fade duration={3000}>
        <div className="grid grid-cols-3 place-items-center content-center mt-10">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </Fade>
    </div>
  );
}
