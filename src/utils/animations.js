'use client';

import gsap from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger";

export const animateWithGsap = (target, animationProps, scrollProps) => {
gsap.registerPlugin(ScrollTrigger);

  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    }
  })
}

export const animateWithGsapTimeline = (timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps) => {
gsap.registerPlugin(ScrollTrigger);

  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut'
  })

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut'
    },
    '<'
  )

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut'
    },
    '<'
  )
}