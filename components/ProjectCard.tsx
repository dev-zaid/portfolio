import Image from "next/image";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Project } from "./Projects";

const ProjectCard = (props: Project) => {
  return (
    <div className="select-none rounded-lg shadow-md max-w-sm bg-dark-background  bg-opacity-50 backdrop-blur-sm">
      <a href={props.link} target="blank">
        <img
          className="rounded-t-lg transition ease-in-out hover:rounded-md  hover:scale-125 cursor-default"
          src={`projects/${props.name}/main.png`}
          alt="Hello"
        />
      </a>
      <div className="p-5">
        <a href={props.link} target="blank">
          <h5 className="hover:text-primary mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {props.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {props.stack.map((skill, i) => {
          return (
            <span
              key={i}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:text-white hover:bg-primary"
            >
              {skill}
            </span>
          );
        })}
      </div>
    </div>
  );
};
export default ProjectCard;
