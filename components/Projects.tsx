import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import LogoCard from "./LogoCard";
import ProjectCard from "./ProjectCard";

export interface Project {
  name: string;
  tag: string;
  description: string;
  link: string;
  stack: string[];
}

const projectData: any = [
  {
    name: "Artemis",
    tag: "An Internal Portal",
    description:
      "It is an internal portal for a college event. This portal offers provides the admin to score to participants and get in-depth information about the ongoing events. It also provides information about the registered participants.",
    link: "https://srmkzilla.net/",
    stack: ["NextJS", "NextAPI", "TailwindCSS", "JWT", "TypeScript"],
  },
  {
    name: "Databuddy",
    tag: "An Ed-Tech Website",
    description:
      "The user can purchase and view the courses that the client has to offer. I worked on the Frontend of the project. It features user authentication, Razorpay payment portal, Admin portal. It also restricts the user to login to only a single device.",
    link: "",
    stack: [
      "NextJS",
      "NodeJS",
      "Express",
      "TailwindCSS",
      "Razorpay",
      "Typescript",
    ],
  },
  ,
  {
    name: "AI Road Guard",
    tag: "AI for the Roads",
    description:
      "This is a project, developed by me and my team for a hackathon that won the best open innovation award. We run our AI model that detects accident on the local CCTV which is then informed to the local authorities through a portal.",
    link: "https://devfolio.co/projects/ai-road-guard-3659",
    stack: ["Python", "OpenCV", "Express"],
  },
];
export default function Projects() {
  return (
    <div
      id="projects"
      className="pt-[120px] select-none -z-10 bg-gradient-to-b to-dark-background from-[#1F1F22] backdrop-blur-sm min-h-[100vh] min-w-screen "
    >
      <div className=" flex flex-col items-center justify-center min-w-screen">
        <Fade duration={2000}>
          <div>
            <h1 className="text-5xl font-black">Projects</h1>
          </div>
          <hr className="mt-8 mb-8 w-[100px] h-px bg-primary border-2 border-primary dark:bg-primary" />
        </Fade>
      </div>
      <Fade duration={3000}>
        <div className="grid grid-cols-3 place-items-center content-center my-10">
          {projectData.map((project: Project) => {
            return <ProjectCard key={project.name} {...project} />;
          })}
        </div>
      </Fade>
    </div>
  );
}
