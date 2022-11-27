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
    <div
      id="skills"
      className="select-none pt-[120px] bg-gradient-to-b from-dark-background to-[#1F1F22] backdrop-blur-sm min-h-[80vh] min-w-screen "
    >
      <div className=" flex flex-col items-center justify-center min-w-screen">
        <Fade duration={2000}>
          <div>
            <h1 className="text-[30px] md:text-[45px] lg:text-[50px] font-black text-primary lg:text-white">
              Skills
            </h1>
          </div>
          <hr className="mt-6 mb-8 w-[70px] lg:w-[100px] h-1px bg-white lg:bg-primary border-2 border-white lg:border-primary" />
        </Fade>

        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-x-[90px] gap-y-[20px] min-w-screen mx-20 place-content-center place-items-center mt-10">
          {texts.map((skill, i) => {
            return <LogoCard key={skill} name={skill} sno={i} />;
          })}
        </div>
      </div>
    </div>
  );
}
