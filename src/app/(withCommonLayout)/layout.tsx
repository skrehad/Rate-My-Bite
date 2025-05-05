import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { Toaster } from "sonner";
const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="">
        <Navbar />
        <div className=" mx-auto  px-5 md:px-0">
        <Toaster richColors position="top-center" />
          {children}
          </div>
        <Footer />
      </div>
    </div>
  );
};

export default CommonLayout;
