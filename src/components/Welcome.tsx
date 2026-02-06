"use client";

import ShinyText from "./animations/ShinyText";

export default function Welcome() {
  return (
    <section id="welcome">
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

      <div className="small-screen">
        <p>
          To have a better experience while visiting my portfolio, please use a
          tablet or desktop screen.
        </p>
      </div>
    </section>
  );
}
