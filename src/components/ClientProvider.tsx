"use client";

import { Toaster } from "react-hot-toast";

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster position="bottom-center" />
      {children}
    </>
  );
};
