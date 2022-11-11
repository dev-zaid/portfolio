import Image from "next/image";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
interface cardProps {
  name: string;
  sno: number;
}
const ProjectCard = () => {
  const [cloudShow, setCloudShow] = useState(false);

  return (
    <div className="max-w-sm rounded-lg shadow-md bg-dark-background  bg-opacity-50 backdrop-blur-sm">
      <a href="#">
        <img
          className="rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
    </div>
  );
};
export default ProjectCard;
