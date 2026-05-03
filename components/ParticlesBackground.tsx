"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine); // loads all features (includes stars-like config)
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: "#000",
        },
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: { value: 200 },
          color: { value: ["#ffffff", "#00ffff", "#ffcc00"] },
          shape: { type: "circle" },
          opacity: {
            value: { min: 0.35, max: 0.9 },
          },
          size: {
            value: { min: 1, max: 2.5 },
          },
          move: {
            enable: true,
            speed: 0.2,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
          },
          modes: {
            repulse: { distance: 80 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
// "use client";

// import React from "react";
// import Particles from "react-tsparticles";
// import { loadStarsPreset } from "tsparticles-preset-stars";

// const ParticlesBackground = () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const particlesInit = async (engine: any) => {
//     await loadStarsPreset(engine);
//   };

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={{
//         preset: "stars",
//         background: {
//           color: "#000",
//         },
//         fullScreen: {
//           enable: true,
//           zIndex: -1,
//         },
//         particles: {
//           number: { value: 300, density: { enable: true, area: 800 } },
//           color: { value: ["#ffffff", "#00ffff", "#ffcc00"] },
//           shape: { type: ["circle", "star"] },
//           opacity: {
//             value: 1,
//             random: true,
//             anim: { enable: true, speed: 0.5, opacity_min: 0.3, sync: false },
//           },
//           size: { value: 1.5, random: true },
//           move: {
//             enable: true,
//             speed: 0.1,
//             direction: "none",
//             outModes: { default: "bounce" },
//           },
//         },
//         interactivity: {
//           events: {
//             onHover: { enable: true, mode: "repulse" },
//             resize: true,
//           },
//           modes: {
//             repulse: { distance: 80, duration: 0.4 },
//           },
//         },
//         detectRetina: true,
//       }}
//     />
//   );
// };

// export default ParticlesBackground;
