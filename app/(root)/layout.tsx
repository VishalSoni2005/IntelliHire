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
        <Link
          href={"/"}
          className="flex items-center gap-2">
          <Image
            src="/favicon.svg"
            width={38}
            height={32}
            alt="logo"
            className="rounded-full shadow-sm bg-white"
          />
          <h2 className="text-primary-100"> IntelliHire</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
