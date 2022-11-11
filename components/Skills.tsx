import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import LogoCard from "./LogoCard";
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
export default function Skills() {
  return (
    <div className="bg-gradient-to-b from-dark-background to-elevated backdrop-blur-sm min-h-[150vh] min-w-screen ">
      <div className="mt-[120px] flex flex-col items-center justify-center min-w-screen">
        <Fade duration={2000}>
          <div>
            <h1 className="text-5xl font-black">Skills</h1>
          </div>
          <hr className="mt-8 mb-8 w-[100px] h-px bg-primary border-2 border-primary dark:bg-primary" />
        </Fade>
        <div className="grid grid-cols-9 gap-x-[90px] gap-y-[20px] min-w-screen mx-20 place-content-center place-items-center mt-10">
          {texts.map((skill, i) => {
            return <LogoCard name={skill} sno={i} />;
          })}
        </div>
      </div>
    </div>
  );
}
