import Image from "next/image";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
interface cardProps {
  name: string;
  sno: number;
}
const MemberCard = (props: cardProps) => {
  const [cloudShow, setCloudShow] = useState(false);

  return (
    <div
      className="mt-10 select-none flex flex-col justify-center items-center hover:scale-175 transition-all ease-in-out w-[50px] md:w-[100px]"
      onMouseOver={() => setCloudShow(true)}
      onMouseOut={() => setCloudShow(false)}
    >
      <Fade duration={props.sno * 400}>
        <Image
          className="select-none"
          width={60}
          height={60}
          alt={"Zaid"}
          src={`/svg/${
            props.name.charAt(0).toLowerCase() + props.name.slice(1)
          }.svg`}
        />
      </Fade>
      <img
        src="/msg.png"
        alt="cloud"
        draggable={false}
        className={`rotate-180 ${
          cloudShow ? "block" : "invisible"
        } h-[50px] max-w-screen-xl items-center content-center`}
      />
      <p
        className={`${
          cloudShow ? "block" : "invisible"
        } text-black mx-4 mb-2 relative -top-[30px] left-[18px] mt-1 text-[10px] w-4/5`}
      >
        {props.name}
      </p>
    </div>
  );
};
export default MemberCard;
