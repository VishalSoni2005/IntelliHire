"use client";

import React from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";

const ParticlesBackground = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const particlesInit = async (engine: any) => {
    await loadStarsPreset(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "stars",
        background: {
          color: "#000000",
        },
        fullScreen: {
          enable: true,
          zIndex: -1, // pushes it to the background
        },
      }}
    />
  );
};

export default ParticlesBackground;
