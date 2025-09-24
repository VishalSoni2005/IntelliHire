import { isAuthenticated } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }
  return (
    <div className="root-layout">
      <nav>
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src="/favicon.svg"
            width={38}
            height={32}
            alt="logo"
            className="rounded-full shadow-sm bg-white"
          />
          <h2
            className="
            font-extrabold 
            text-2xl 
            text-center 
            pb-3 
            pl-2 
            bg-gradient-to-r from-[#A020F0] via-[#FF4DE1] via-[#00E5FF] to-[#A020F0]
            bg-clip-text 
            text-transparent 
            [text-shadow:0px_0px_4px_rgba(160,32,240,0.4)]
          "
          >
            IntelliHire
          </h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
