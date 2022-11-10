import Image from "next/image";
export default function About() {
  return (
    <div className="relative min-h-screen z-0">
      <div className="flex flex-col items-center justify-center p-10 min-w-max backdrop-blur-sm">
        <h1 className=" pt-10 text-7xl font-black text-white shadow-md">
          About me
        </h1>
        <hr className="my-8 w-64 h-px bg-gray-200 border-0 dark:bg-white" />
      </div>
    </div>
  );
}
