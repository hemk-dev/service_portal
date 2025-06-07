"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";

interface AnimationProps {
  children: ReactNode;
  animation?: "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scale" | "stagger";
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  staggerDelay?: number;
  className?: string;
}

export function GsapAnimation({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 0.7,
  y = 30,
  x = 30,
  staggerDelay = 0.1,
  className = "",
}: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let tl: gsap.core.Timeline;

    // Set initial states
    gsap.set(element, {
      autoAlpha: animation !== "scale" ? 0 : 1,
      y: animation === "fadeInUp" ? y : 0,
      x: animation === "fadeInLeft" ? x : animation === "fadeInRight" ? -x : 0,
      scale: animation === "scale" ? 0.9 : 1,
    });

    // Create animation
    if (animation === "stagger") {
      const items = element.children;
      gsap.set(items, { autoAlpha: 0, y: y });
      
      tl = gsap.timeline({ delay });
      tl.to(items, {
        duration,
        autoAlpha: 1,
        y: 0,
        stagger: staggerDelay,
        ease: "power3.out",
      });
    } else {
      tl = gsap.timeline({ delay });
      tl.to(element, {
        duration,
        autoAlpha: animation !== "scale" ? 1 : 1,
        y: 0,
        x: 0,
        scale: 1,
        ease: "power3.out",
      });
    }

    return () => {
      tl.kill();
    };
  }, [animation, delay, duration, y, x, staggerDelay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}