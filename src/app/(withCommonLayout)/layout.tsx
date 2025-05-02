import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="mx-10">
        <Navbar />
        <div className="container mx-auto  mt-12 px-5 md:px-0">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default CommonLayout;
