import React from "react";
import Image from "next/image";
import Link from "next/link";

const AnimacionLogo = () => {


  return (
    <div
      aria-label="container-imagen"
      className="m-0 p-0 h-400 w-50 flex justify-center items-center flex-col perspective-500"
    >
      <div className="relative flex justify-center">
        <Link href="/home">
        <Image
          className="flex m-0 p-0 w-full h-full object-cover drop-shadow-custom animate-rotate-y hover:cursor-pointer"
          src={"/assets/logoCocinero2.png"}
          alt="Logo"
          width={300}
          height={230}
        />

        </Link>
      </div>
      <div aria-label="botton" className="flex justify-center items-center w-80 h-80 absolute bottom-[-17rem] bg-gray rounded-50 rotate-x-143 shadow-inset-custom 
      before:w-73 before:h-43 before:absolute before:bottom-8  before:bg-softGray  before:rounded-50 before:shadow-inset-custom before:filter before:drop-shadow-custom before:blur-[30px]"></div>
    </div>
  );
};

export default AnimacionLogo;
