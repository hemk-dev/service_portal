"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapFadeIn(
  trigger: string,
  options?: {
    y?: number;
    x?: number;
    delay?: number;
    duration?: number;
    scrollTrigger?: boolean;
    scrub?: boolean | number;
  }
) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = document.querySelector(trigger);
    if (!element) return;

    const y = options?.y || 50;
    const x = options?.x || 0;
    const delay = options?.delay || 0;
    const duration = options?.duration || 1;
    const useScrollTrigger = options?.scrollTrigger || false;
    const scrub = options?.scrub || false;

    gsap.set(element, { autoAlpha: 0, y, x });

    let tl: gsap.core.Timeline;

    if (useScrollTrigger) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: scrub ? "center center" : undefined,
          scrub: scrub,
          markers: false,
        },
      });
    } else {
      tl = gsap.timeline({ delay });
    }

    tl.to(element, {
      duration,
      autoAlpha: 1,
      y: 0,
      x: 0,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
      if (useScrollTrigger) {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach((trigger) => {
          if (trigger.vars.trigger === element) {
            trigger.kill(true);
          }
        });
      }
    };
  }, [trigger, options]);

  return elementRef;
}

export function useGsapStagger(
  parentSelector: string,
  childSelector: string,
  options?: {
    y?: number;
    delay?: number;
    duration?: number;
    staggerDelay?: number;
    scrollTrigger?: boolean;
  }
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const parent = document.querySelector(parentSelector);
    if (!parent) return;

    const children = parent.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const y = options?.y || 30;
    const delay = options?.delay || 0;
    const duration = options?.duration || 0.7;
    const staggerDelay = options?.staggerDelay || 0.1;
    const useScrollTrigger = options?.scrollTrigger || false;

    gsap.set(children, { autoAlpha: 0, y });

    let tl: gsap.core.Timeline;

    if (useScrollTrigger) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: "top 80%",
          markers: false,
        },
      });
    } else {
      tl = gsap.timeline({ delay });
    }

    tl.to(children, {
      duration,
      autoAlpha: 1,
      y: 0,
      stagger: staggerDelay,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
      if (useScrollTrigger) {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach((trigger) => {
          if (trigger.vars.trigger === parent) {
            trigger.kill(true);
          }
        });
      }
    };
  }, [parentSelector, childSelector, options]);
}