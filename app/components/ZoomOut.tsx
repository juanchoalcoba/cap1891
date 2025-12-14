"use client"
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Asegúrate que ScrollTrigger esté registrado
if (!gsap.isTweening) {
  gsap.registerPlugin(ScrollTrigger);
}

interface ZoomOutTransitionProps {
  title: string;
  children: React.ReactNode; // El contenido que viene DESPUÉS de la animación
}

const ZoomOutTransition: React.FC<ZoomOutTransitionProps> = ({ title, children }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // --- Configuración del ScrollTrigger para el Zoom ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",      // Fija la sección al llegar arriba
        end: "+=1200",         // Duración del scroll para el zoom (ajusta este valor)
        scrub: true,           // Vincula la animación al scroll
        pin: true,             // Mantiene la sección fija mientras dura el zoom
        // markers: true, // Descomentar para debug
      },
    });

    // --- Animación: Zoom Out ---
    tl.to(titleRef.current, {
        scale: 18,          // Escala el título 15 veces su tamaño original
        opacity: 0,         // Lo desvanece
        duration: 1,
        ease: "power2.out"
    }, 0); 
    
    // Opcional: Animar la opacidad del fondo de la sección
    tl.to(section, {
        backgroundColor: "#FFFFFF", // O el color de la sección que viene después
        duration: 0.5,
        overflow: "hidden"
    }, 0.5); // Comienza a cambiar el fondo a mitad de la animación de zoom

    // Limpieza de ScrollTrigger al desmontar el componente
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.trigger === section && st.kill()); 
    };
  }, [title]);

  return (
    <div 
      ref={sectionRef} 
      className="min-h-screen relative flex flex-col items-center justify-center bg-black transition-colors duration-500"
    >
      {/* Título que hace zoom */}
      <h1 
        ref={titleRef} 
        className="text-8xl md:text-9xl font-extrabold text-black z-10 whitespace-nowrap"
      >
        {title}
      </h1>

      {/* Contenido que aparece DESPUÉS de que se complete el pin/zoom 
          (Este contenido en realidad es lo que pusiste en "Contenido después del efecto") */}
      <div 
        className="absolute w-full h-full text-white"
        // Estilos para la sección que aparece después

      >
        {children}
      </div>
      
    </div>
  );
};

export default ZoomOutTransition;