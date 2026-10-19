"use client";

import { usePathname } from "next/navigation";
import React from "react";
import SideHeader from "./SideHeader";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isFullScreenRoute =
    pathname?.startsWith("/workspace/") || pathname?.startsWith("/shared/");

  if (isFullScreenRoute) {
    return <>{children}</>;
  }
  return (
    <>
      <SideHeader />
      <div className="flex flex-1 flex-col pt-38">{children}</div>
    </>
  );
};

export default AppShell;
