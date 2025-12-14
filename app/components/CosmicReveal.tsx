"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

type ParticleRef = HTMLDivElement | null;

const CosmicReveal: React.FC<{ text?: string }> = ({ text = "TU PORTAFOLIO" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<ParticleRef[]>([]);
  const finalTextRef = useRef<HTMLHeadingElement>(null);

  const NUMBER_OF_PARTICLES = 120;

  // Asignación de refs correctamente (sin sobreescribir arrays en useEffect)
  const setParticleRef = (el: ParticleRef, index: number) => {
    particleRefs.current[index] = el;
  };

  useEffect(() => {
    if (!containerRef.current || !finalTextRef.current) return;

    // Filtrar las partículas realmente montadas
    const particles = particleRefs.current.filter(Boolean) as HTMLDivElement[];

    // Aún no están todas montadas → esperar al siguiente ciclo
    if (particles.length !== NUMBER_OF_PARTICLES) return;

    gsap.set(containerRef.current, { perspective: 800 });

    // INICIALIZACIÓN Caótica 3D
    particles.forEach((particle) => {
      gsap.set(particle, {
        x: gsap.utils.random(-450, 450),
        y: gsap.utils.random(-450, 450),
        z: gsap.utils.random(-350, 350),
        scale: gsap.utils.random(0.4, 1.6),
        opacity: gsap.utils.random(0.3, 0.9),
        rotationX: gsap.utils.random(0, 360),
        rotationY: gsap.utils.random(0, 360),
      });
    });

    gsap.set(finalTextRef.current, { opacity: 0, scale: 1.8 });

    // TIMELINE PRINCIPAL
    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power4.out" },
      repeat: -1,
      repeatDelay: 2.5,
      yoyo: true,
    });

    // Desvanecer partículas hacia el centro
    tl.to(
      particles,
      {
        opacity: 0,
        x: 0,
        y: 0,
        z: 0,
        scale: 0,
        stagger: { each: 0.005, from: "random" },
        duration: 1.2,
      },
      0
    );

    // Texto revelándose con elasticidad
    tl.to(
      finalTextRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: "elastic.out(1, 0.4)",
      },
      0.5
    );

    return () => {tl.kill()};
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-gray-950 flex justify-center items-center overflow-hidden perspective-midrange"
    >
      {Array.from({ length: NUMBER_OF_PARTICLES }).map((_, index) => (
        <div
          key={index}
          ref={(el) => setParticleRef(el, index)}
          className="absolute w-2 h-2 bg-indigo-400 rounded-full shadow-lg shadow-indigo-500/50"
          style={{ willChange: "transform, opacity" }}
        />
      ))}

      <h1
        ref={finalTextRef}
        className="text-7xl sm:text-8xl md:text-9xl font-black text-center uppercase tracking-wider 
                 text-transparent bg-clip-text 
                 bg-linear-to-r from-purple-400 via-pink-500 to-red-500 
                 z-10 select-none cursor-default"
        style={{ willChange: "transform, opacity" }}
      >
        {text}
      </h1>
    </div>
  );
};

export default CosmicReveal;
