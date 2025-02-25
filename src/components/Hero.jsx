
import { heroVideo, smallHeroVideo } from "@/utils/assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useState,useEffect } from "react";
//////////
// import Video from 'next/video'
const Hero = () => {

  const [videoSrc, setVideoSrc] = useState(heroVideo
  );
  
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };
  // useEffect(() => {
    

  //   // Initial check on mount
  //   handleResize();

  //   // Add resize event listener
  //   window.addEventListener("resize", handleResize);

  //   // Cleanup the event listener
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  
  useGSAP(() => {
    gsap.to("#hero-text", { opacity: 1, delay: 1 });
    gsap.to("#cta", {y:-50, opacity: 1, delay: 1 });
  }, []);
  return (
    <section className="w-full relative mt-5">
      <div className="w-full flex-center flex-col">
        <p id="hero-text" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
        <video
          className="pointer-events-none"
          playsInline
          autoPlay
          // loop
          muted
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        </div>
       
        <div id="cta" className="flex-center flex-col opacity-0 translate-y-5 mt-5">
          <p className="btn font-medium">Buy</p>
          <p className="text-xl font-normal">From $199/month or $999</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
