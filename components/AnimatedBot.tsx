"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AnimatedBot = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-24 h-24 md:w-62 md:h-62 pointer-events-none animate-[floaty_4s_ease-in-out_infinite]">
      <DotLottieReact
        src="https://lottie.host/be6801a9-033c-4d6a-b53b-051742cb1c8d/aETmHzWsuv.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default AnimatedBot;
