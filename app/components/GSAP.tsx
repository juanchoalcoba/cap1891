"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GSAP = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!scrollRef.current) return;

    const boxes = gsap.utils.toArray<HTMLElement>(
      scrollRef.current.children
    );

    boxes.forEach((box) => {
      gsap.to(box, {
        x: 150,
        rotation: 360,
        scale: 1.5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: box,
          start: "bottom 80%",
          end: "top 20%",
          scrub: true,
          markers: true,
        },
      });
    });
  }, { scope: scrollRef });

  return (
    <div ref={scrollRef} className="min-h-screen flex gap-4 p-8">
      <div className="box w-48 h-48 bg-red-400" />
      <div className="box w-48 h-48 bg-red-600" />
    </div>
  );
};

export default GSAP;
