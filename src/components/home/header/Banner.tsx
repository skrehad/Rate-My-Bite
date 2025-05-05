"use client";

import Image from "next/image";
import { Divider } from "@/components/ui/svg/divider";
import Slider from "./Slider";

export default function Banner() {
  // useEffect(() => {
  //   const timer = setTimeout(() => setAnimate(true), 100);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    // <section className="w-full rounded-2xl  bg-secondary py-18 px-6 my-12 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    //   <div
    //     className={`space-y-6 transition-all duration-700 ease-out ${
    //       animate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
    //     }`}
    //   >
    //     <h1 className="text-4xl md:text-5xl font-bold text-[#FF3C48] leading-tight">
    //       Delicious Food, Delivered To You
    //     </h1>
    //     <p className="text-lg text-black dark:text-white max-w-md">
    //       Experience mouth-watering meals made with love and delivered fresh to
    //       your doorstep. Order now and enjoy exclusive deals!
    //     </p>

    //     <Button className="p-5 cursor-pointer bg-white rounded-full border-2 border-[#FF3C48] text-[#FF3C48] hover:bg-[#FF3C48] hover:text-white font-semibold transition duration-300 flex  text-lg items-center gap-2">
    //       Order Now <FaCartArrowDown />
    //     </Button>
    //   </div>

    //   <div
    //     className={`transition-all duration-700 ease-out flex justify-center ${
    //       animate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
    //     }`}
    //   >
    //     <Image
    //       src="/image/home/banner.jpg"
    //       alt="Delicious Food"
    //       width={500}
    //       height={400}
    //       className="rounded-2xl shadow-xl"
    //       priority
    //     />
    //   </div>
    // </section>
    <div className="relative inset-0 z-10 pt-28 md:pb-0">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/image/banner/home-banner.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="container pt-10 relative z-10 text-white">
        <div className="h-full grid  items-center text-center">
          <div className=" mx-auto pb-8">
            <Image
              src="/image/logo/🦆 icon _dish spoon knife_.png"
              height={100}
              width={100}
              alt="logo icon"
            />
            <span className=" text-lg font-mono">Rate My Bite</span>
          </div>
          <h1 className="lg:text-5xl text-4xl font-medium text-primary pb-2">
            Find Restaurants Around You
          </h1>
          <p>
            Explore honest reviews and ratings to find the best places to eat.
            Discover, review, and share your food experiences!
          </p>

          <div className="w-full relative  md:mt-24 mt-6 overflow-hidden">
            <Slider></Slider>
          </div>
        </div>
      </div>

      {/* Divider at bottom */}
      <div className="absolute inset-x-0 -bottom-0.5 -z-10 text-white">
        <Divider />
      </div>
    </div>
  );
}
