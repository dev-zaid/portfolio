import Image from "next/image";
import React from "react";
import { Fade } from "react-awesome-reveal";

const texts: string[] = [
  "React",
  "GraphQL",
  "TypeScript",
  "Tailwind",
  "Android",
  "Arduino",
  "Mongo",
  "CPP",
  "Razorpay",
  "NextJS",
  "NodeJS",
  "Express",
  "JWT",
  "Git",
  "Heroku",
  "Python",
  "AWS",
  "Firebase",
];

const computePosition = (
  idx: number,
  random: boolean = false,
  size: number
) => {
  if (random) idx = Math.floor(Math.random() * (texts.length + 1));

  const phi = Math.acos(-1 + (2 * idx + 1) / texts.length);
  const theta = Math.sqrt((texts.length + 1) * Math.PI) * phi;

  return {
    x: (size * Math.cos(theta) * Math.sin(phi)) / 2,
    y: (size * Math.sin(theta) * Math.sin(phi)) / 2,
    z: (size * Math.cos(phi)) / 2,
  };
};

const CreateTag = (idx: number, text: string, size: number) => {
  const tagRef = React.useRef<HTMLDivElement | null>(null);

  return {
    idx: idx,
    text: text,
    opacity: 0,
    filter: "alpha(opacity=0)",
    transform: "translate3d(-50%, -50%, 0) scale(1)",
    tagRef: tagRef,
    ...computePosition(idx, false, size),
  };
};

interface ItemProps {
  transform: string;
  opacity: number;
  filter: string;
  idx: number;
  text: string;
  x: number;
  y: number;
  z: number;
  scale?: number;
  tagRef?: React.RefObject<HTMLSpanElement>;
}

const createInitialState = (size: number) => {
  return texts.map((text, i) => {
    return CreateTag(i, text, size);
  });
};

const { radius, maxSpeed, initSpeed, direction } = {
  radius: 300 as number,
  maxSpeed: 20 as number,
  initSpeed: 40 as number,
  direction: 135 as number,
};

const size = 1.5 * radius;
const depth = 2 * radius;

export default function About() {
  const tagCloudRef = React.useRef<HTMLDivElement | null>(null);
  const [Items, setItems] = React.useState<ItemProps[]>(
    createInitialState(size)
  );

  const mouseX0 = React.useRef<number>(initSpeed * Math.sin(direction * (Math.PI / 180))) // prettier-ignore
  const mouseY0 = React.useRef<number>(-initSpeed * Math.cos(direction * (Math.PI / 180))) // prettier-ignore
  const mouseX = React.useRef<number>(mouseX0.current);
  const mouseY = React.useRef<number>(mouseY0.current);

  const next = React.useCallback(() => {
    const a = -(Math.min(Math.max(-mouseY.current, -size), size) / radius) * maxSpeed // prettier-ignore
    const b = (Math.min(Math.max(-mouseX.current, -size), size) / radius) * maxSpeed // prettier-ignore

    if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) return; // pause

    // calculate offset
    const l = Math.PI / 180;
    const sc = [
      Math.sin(a * l),
      Math.cos(a * l),
      Math.sin(b * l),
      Math.cos(b * l),
    ];

    setItems((prev: any[]) => {
      const Items = prev.map((item) => {
        const rx1 = item.x;
        const ry1 = item.y * sc[1] + item.z * -sc[0];
        const rz1 = item.y * sc[0] + item.z * sc[1];
        const rx2 = rx1 * sc[3] + rz1 * sc[2];
        const ry2 = ry1;
        const rz2 = rz1 * sc[3] - rx1 * sc[2];
        const per = (2 * depth) / (2 * depth + rz2);

        item.scale = Number(per.toFixed(3));
        let alpha = per * per - 0.25;
        alpha = Number((alpha > 1 ? 1 : alpha).toFixed(3));

        if (item?.tagRef?.current) {
          const left = (item.x - item.tagRef.current.offsetWidth / 2).toFixed(
            2
          );
          const top = (item.y - item.tagRef.current.offsetHeight / 2).toFixed(
            2
          );

          return {
            ...item,
            x: rx2,
            y: ry2,
            z: rz2,
            opacity: alpha,
            transform: `translate3d(${left}px, ${top}px, 0) scale(${item.scale})`,
            filter: `alpha(opacity=${100 * alpha})`,
          };
        }
      });

      return Items;
    });
  }, []);

  React.useEffect(() => {
    if (tagCloudRef?.current) {
      const interval = setInterval(next, 100);
      return () => clearInterval(interval);
    }
  }, [tagCloudRef]);

  return (
    <div
      id="about"
      className="flex flex-col lg:flex lg:flex-row backdrop-blur-sm min-h-[80vh] z-0"
    >
      <div className="flex flex-col items-center justify-center md:items-center lg:items-start p-10 min-w-screen backdrop-blur-sm">
        <Fade duration={2000}>
          <h1 className="select-none text-primary lg:text-white text-[30px] md:text-[45px] lg:text-[50px] font-black drop-shadow-md">
            About me
          </h1>
        </Fade>
        <hr className="mt-2 mb-8 w-[100px] lg:w-[180px] h-px bg-white lg:bg-primary border-2 border-white lg:border-primary" />
        <Fade duration={4000}>
          <div className="w-[350px] md:w-[700px] select-none">
            <h1 className="text-center lg:text-left text-lg lg:text-xl text-white">
              <p>
                I am a Back-End Developer studying in SRMIST. I am in my 2nd
                Year and have an year of experience with Web 2.0.
              </p>{" "}
              <br />
              <p>
                I take great interest in taking up challenges and learning new
                tech-stacks. Searching for a flow in my world of Aesthetics,
                Minimalism and Blues.{" "}
              </p>
              <br />
              I&apos;m naturally curious, and perpetually working on improving
              my chops one problem at a time.{" "}
            </h1>
          </div>
        </Fade>
      </div>
      <div className="items-center justify-center hidden md:flex md:flex-col lg:flex lg:flex-col">
        <div
          ref={tagCloudRef}
          className="tag-cloud"
          onMouseMove={(ev) => {
            if (tagCloudRef?.current) {
              const rect = tagCloudRef.current.getBoundingClientRect();
              mouseX.current = (ev.clientX - (rect.left + rect.width / 2)) / 5;
              mouseY.current = (ev.clientY - (rect.top + rect.height / 2)) / 5;
            }
          }}
          style={{
            position: "relative",
            width: `${2 * radius}px`,
            height: `${2 * radius}px`,
          }}
        >
          {Items.map((item) => {
            return (
              <>
                <span
                  key={item.idx}
                  className="text-white text-[12px] font-light tag-cloud__item"
                  ref={item.tagRef}
                  style={{
                    filter: item.filter,
                    opacity: item.opacity,
                    transform: item.transform,
                  }}
                >
                  <Fade>
                    <Image
                      className="select-none cursor-default"
                      width={40}
                      height={40}
                      alt={"Zaid"}
                      src={`/svg/${
                        item.text.charAt(0).toLowerCase() + item.text.slice(1)
                      }.svg`}
                    />
                  </Fade>
                </span>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
