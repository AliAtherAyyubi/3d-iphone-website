"use client";
import { useGSAP } from "@gsap/react";
import React from "react";
import Image from "next/image";
import { rightImg, watchImg } from "../utils/assets";
import gsap from "gsap";
import VideoCarousel from "./VideoCarousel";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  useGSAP(() => {
    gsap.to(".section-heading", {
      opacity: 1,
      y: 0, // Move up to its original position
      duration: 1,
      scrollTrigger: {
        trigger: ".section-heading", // Trigger animation when '#title' is visible
        toggleActions: "restart none none none", // Play when scrolling down, reverse when scrolling up
      },
    });
    gsap.to(".link", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.5,
      scrollTrigger: {
        trigger: ".link", 
        toggleActions: "restart none none none",
      },
    });
  }, []);
  return (
    <section
      id="highlights"
      className="w-screen  overflow-hidden h-full common-padding bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex max-xl:items-center items-end justify-between">
          <h1 id="title" className="section-heading">
            Get the highlights.
          </h1>
          <div className="flex flex-wrap gap-5 md:justify-center items-end">
            <p className="link">
              Watch the film
              <Image className="mx-2" src={watchImg} height={18} width={18} />
            </p>
            <p className="link">
              Watch the film
              <Image className="mx-2" src={rightImg} height={10} width={10} />
            </p>
          </div>
        </div>
        {/* ///Videos */}
        {/* <VideoCarousel /> */}
      <VideoCarousel />

      </div>
    </section>
  );
};

export default Highlights;
