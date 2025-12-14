"use client"
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Asegúrate de que ScrollTrigger esté registrado.
if (typeof window !== 'undefined' && !gsap.isTweening) {
  gsap.registerPlugin(ScrollTrigger);
}

interface IntroScrollEffectProps {
  children: React.ReactNode;
  imageUrl: string; // ¡Esta prop es la clave del cambio!
}

const IntroScrollEffect: React.FC<IntroScrollEffectProps> = ({ children, imageUrl }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // --- Configuración del ScrollTrigger para la Intro ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",      // Fija la sección al llegar arriba
        end: "bottom top",     // Termina cuando la parte inferior de la sección toca el top del viewport
        scrub: true,           // Vincula la animación al scroll
        pin: true,             // Mantiene la sección fija mientras dura la animación
      },
    });

    // --- Animación: Desvanecimiento y empuje (Fade and Push) ---
    tl.to(contentRef.current, {
        opacity: 0,            // 1. Desvanece el contenido del texto
        y: -100,               // 2. Mueve el contenido ligeramente hacia arriba mientras se desvanece
        duration: 0.5,
        ease: "power1.in"
    }, 0); 
    
    // Limpieza de ScrollTrigger al desmontar el componente
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.trigger === section && st.kill());
    };
  }, []);

  return (
    // La sección completa que será pineada (fijada)
    <div 
      ref={sectionRef} 
      className="min-h-screen flex items-center justify-center relative overflow-hidden" 
    >
        {/* --- 1. Imagen de Fondo (Background Image) --- */}
        <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>

        {/* --- 2. Overlay Oscuro (Dark Overlay) --- */}
        {/* Fondo negro con opacidad para asegurar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black opacity-70"></div> 

        {/* --- 3. Contenido (Content) --- */}
        {/* El contenido necesita un z-index más alto y color de texto claro */}
        <div ref={contentRef} className="text-center relative z-10 p-4">
            <div className="text-white"> 
                {children}
            </div>
        </div>
    </div>
  );
};

export default IntroScrollEffect;