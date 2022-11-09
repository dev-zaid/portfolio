import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav
      className="sticky flex justify-between items-center h-15 max-w-screen
            bg-dark-background bg-opacity-50   font-black"
      style={{ backdropFilter: "blur(20px)" }}
    >
      {/* <div className="flex justify-space items-center">
        <div className="m-5 h-10">
          <Image src="/face.png" alt="Memoji" height={50} width={50} />
        </div>
        <h1 className="text-md md:text-3xl hover:text-primary">Zaid</h1>
      </div> */}
      <div className="m-5 h-10">
        <Image src="/face.png" alt="Memoji" height={50} width={50} />
      </div>
      <div className="flex justify-end mx-10">
        <div className="flex justify-center items-center mx-4">
          <Link href="/dashboard" passHref>
            <h3 className="hover:-translate-y-0.5 text-md md:text-xl cursor-pointer duration-200 hover:text-primary">
              Skills
            </h3>
          </Link>
        </div>
        <div className="flex justify-center items-center mx-4">
          <Link href="/users" passHref>
            <h3 className="hover:-translate-y-0.5 text-md md:text-xl cursor-pointer duration-200 hover:text-primary">
              Projects
            </h3>
          </Link>
        </div>
      </div>
    </nav>
  );
}
