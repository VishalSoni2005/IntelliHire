"use client";

import dynamic from "next/dynamic";

const AnimatedBot = dynamic(() => import("@/components/AnimatedBot"), {
  ssr: false,
  loading: () => null,
});

export default function AnimatedBotLoader() {
  return <AnimatedBot />;
}
