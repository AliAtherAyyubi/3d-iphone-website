import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; // Import ScrollTrigger
import Image from "next/image";
import { highlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "@/utils/assets";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoDivRef = useRef([]);
  const videoSpanRef = useRef([]);
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const progressAnimationRef = useRef(null);
  const scrollTriggerRef = useRef(null); // Ref to store ScrollTrigger instance
  const [isPlaying, setIsPlaying] = useState(false); // Start as not playing
  const [isLastVideo, setIsLastVideo] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Set up ScrollTrigger to detect when the component is in view
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%", // Start when the top of the container is 80% from the top of the viewport
      end: "bottom 20%", // End when the bottom of the container is 20% from the top of the viewport
      onEnter: () => handleVisibilityChange(true),
      onLeave: () => handleVisibilityChange(false),
      onEnterBack: () => handleVisibilityChange(true),
      onLeaveBack: () => handleVisibilityChange(false),
    });

    // Clean up ScrollTrigger on component unmount
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      
      // Kill progress animation if it exists
      if (progressAnimationRef.current) {
        progressAnimationRef.current.kill();
      }
    };
  }, []);

  // Handle visibility changes (when scrolling in/out of view)
  const handleVisibilityChange = (isVisible) => {
    const currentIndex = swiperRef.current?.activeIndex || 0;
    
    if (isVisible && !hasInitialized) {
      // First time becoming visible - initialize everything
      if (videoRef.current[currentIndex]) {
        videoRef.current[currentIndex].play();
        setIsPlaying(true);
        initializeProgressBar(currentIndex);
        animateProgress(currentIndex);
        setHasInitialized(true);
      }
    } else if (isVisible && !isPlaying && hasInitialized) {
      // Coming back into view after being initialized
      if (videoRef.current[currentIndex]) {
        videoRef.current[currentIndex].play();
        setIsPlaying(true);
        if (progressAnimationRef.current) {
          progressAnimationRef.current.play();
        } else {
          animateProgress(currentIndex);
        }
      }
    } else if (!isVisible && isPlaying) {
      // Going out of view while playing
      if (videoRef.current[currentIndex]) {
        videoRef.current[currentIndex].pause();
        if (progressAnimationRef.current) {
          progressAnimationRef.current.pause();
        }
        setIsPlaying(false);
      }
    }
  };

  // Initialize a progress bar to white color before animation starts
  const initializeProgressBar = (index) => {
    // Reset all progress bars to their default state first
    highlightsSlides.forEach((_, i) => {
      gsap.set(videoDivRef.current[i], { width: '12px' }); // Reset width of all progress bars
      gsap.set(videoSpanRef.current[i], { 
        width: '0%',
        backgroundColor: 'transparent' // Reset color and progress
      });
    });

    // Expand the active progress bar container
    gsap.to(videoDivRef.current[index], {
      width: '4vw',
      duration: 0.3,
      ease: 'power2.inOut',
    });

    // Set the active progress span to white immediately
    gsap.set(videoSpanRef.current[index], {
      backgroundColor: '#ffffff'
    });
  };

  const handleSlideChange = (swiper) => {
    const previousIndex = swiper.previousIndex;
    const currentIndex = swiper.activeIndex;

    // Kill previous animation if exists
    if (progressAnimationRef.current) {
      progressAnimationRef.current.kill();
    }

    if (videoRef.current[previousIndex]) {
      videoRef.current[previousIndex].pause();
      videoRef.current[previousIndex].currentTime = 0;
    }

    if (videoRef.current[currentIndex]) {
      // Initialize the progress bar for the new slide
      initializeProgressBar(currentIndex);
      
      // Only play if the component is in view (ScrollTrigger is active)
      if (scrollTriggerRef.current && scrollTriggerRef.current.isActive) {
        videoRef.current[currentIndex].play();
        animateProgress(currentIndex);
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }

    setIsLastVideo(currentIndex === highlightsSlides.length - 1);
  };

  const handleVideoEnd = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex;
      if (currentIndex < highlightsSlides.length - 1) {
        swiperRef.current.slideNext();
      }
    }
  };

  const handleProcess = (action) => {
    const currentIndex = swiperRef.current.activeIndex;
    
    switch (action) {
      case "play":
        videoRef.current[currentIndex].play();
        setIsPlaying(true);
        // Resume the progress animation
        if (progressAnimationRef.current) {
          progressAnimationRef.current.play();
        } else {
          animateProgress(currentIndex);
        }
        break;
      case "pause":
        videoRef.current[currentIndex].pause();
        setIsPlaying(false);
        // Pause the progress animation
        if (progressAnimationRef.current) {
          progressAnimationRef.current.pause();
        }
        break;
      case "video-reset":
        // Kill previous animation if exists
        if (progressAnimationRef.current) {
          progressAnimationRef.current.kill();
        }
        swiperRef.current.slideTo(0);
        setIsPlaying(true);
        break;
    }
  };

  const animateProgress = (index) => {
    if(isPlaying) {
      // Kill previous animation if exists
      if (progressAnimationRef.current) {
        progressAnimationRef.current.kill();
      }
      
      // Start from 0% width but keep the white color
      gsap.set(videoSpanRef.current[index], { 
        width: '0%',
        backgroundColor: '#ffffff' // Keep it white from the start
      });
      
      // Store the animation instance - only animate the width, not the color
      progressAnimationRef.current = gsap.to(videoSpanRef.current[index], {
        width: '100%', // Animate to 100%
        duration: highlightsSlides[index].videoDuration,
        ease: 'linear',
      });
    }
  };

  return (
    <div ref={containerRef}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        allowTouchMove={false}
        speed={1500}
        loop={true}
      >
        {highlightsSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="video-carousel_container">
              <div className="size-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  ref={(el) => (videoRef.current[index] = el)}
                  onEnded={handleVideoEnd}
                  muted
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Progress Bar */}
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-black backdrop-blur rounded-full">
          {highlightsSlides.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-500 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideTo(i);
                }
              }}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <Image
            height={24}
            width={24}
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={() =>
              isLastVideo
                ? handleProcess("video-reset")
                : !isPlaying
                ? handleProcess("play")
                : handleProcess("pause")
            }
          />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;