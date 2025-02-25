import { chipImg, frameImg, frameVideo } from "@/utils/assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { animateWithGsap } from "@/utils/animations";
//
const HowitWorks = () => {
  useGSAP(()=>{
    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom'
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut'
    })

    animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut'
    })
  },[])
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div className="flex-center flex-col">
          <div id="chip" className="flex-center w-full ">
            <Image src={chipImg} height={180} width={180} />
          </div>
          <div className="flex-center flex-col mt-20 md:mt-32">
            <h1 className="hiw-title">
              A17 Pro chip
              <br />A monster win for gaming.
            </h1>
            <p className="hiw-subtitle">
              It’s here. The biggest redesign in the history of Apple GPUs.
            </p>
          </div>
          <div className="mt-10 md:mt-29">
            <div className="relative h-full flex-center">
              <div className="overflow-hidden">
                <img src={frameImg} />
              </div>
              <div className="hiw-video">
                <video className="pointer-events-none" src={frameVideo} playsInline muted autoPlay/>
              </div>
            </div>
            <p className="text-gray-400 font-semibold text-center mt-3">Honkai: Star Rail</p>
          </div>


          <div className="hiw-text-container mt-10">
                <div className="flex flex-1 justify-center flex-col">
                  <p className="hiw-text g_fadeIn">
                    A17 Pro is an entirely new class of iPhone chip that delivers our {' '}
                    <span className="text-white">
                      best graphic performance by far
                    </span>.
                  </p>

                  <p className="hiw-text mt-5 g_fadeIn">
                   Mobile {' '}
                    <span className="text-white">
                      games will look and feel so immersive
                    </span>,
                     with incredibly detailed environments and characters.
                  </p>
                </div>
              

              <div className="flex-1 flex justify-center flex-col g_fadeIn">
                <p className="hiw-text">New</p>
                <p className="hiw-bigtext">Pro-class GPU</p>
                <p className="hiw-text">with 6 cores</p>
              </div>
              
            </div>
        </div>
      </div>
    </section>
  );
};

export default HowitWorks;
