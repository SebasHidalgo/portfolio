"use client";

import ShinyText from "./animations/ShinyText";

export default function Welcome() {
  return (
    <section className="text-gray-200 flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none max-sm:h-screen max-sm:w-full max-sm:px-10">
      <p className="text-3xl font-extralight text-center">
        Hi, I'm Guillermo! Welcome to my
      </p>

      <ShinyText
        text="Portfolio."
        speed={4}
        color="#e5e7eb"
        shineColor="#000"
        spread={120}
        yoyo
        className="italic text-9xl"
      />

      <div className="sm:hidden m-7 bg-red-300/20 backdrop-blur-lg p-3 rounded-md absolute top-10">
        <p className="flex-1 text-[16px] text-center font-roboto text-gray-400">
          To have a better experience while visiting my portfolio, please use a
          tablet or desktop screen.
        </p>
      </div>
    </section>
  );
}
