"use client";
import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Registra el plugin de ScrollTrigger una vez
gsap.registerPlugin(ScrollTrigger);

// --- TIPOS ---
interface CurtainScrollEffectProps {
  text: string;
  imageUrl: string;
  wallpaperUrl: string; // ✨ NUEVA: Imagen para el fondo revelado
}

const CurtainScrollEffect: React.FC<CurtainScrollEffectProps> = ({
  text,
  imageUrl,
  wallpaperUrl,
}) => {
  // Referencias para los elementos del DOM
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  // ¡NUEVA REFERENCIA para el icono!
  const iconRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Configuración del ScrollTrigger ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=1500", // La duración total de la animación de scroll
        scrub: true,
        pin: true,
        // markers: true,
      },
    });

    // --- Definición de la Animación ---

    // 1. Mover las "cortinas" (mitades de la imagen) hacia afuera
    // Duración de la Fase de Cortina: 1 unidad relativa
    tl.to(
      leftCurtainRef.current,
      { x: "-100%", duration: 1, ease: "power2.inOut" },
      0
    );
    tl.to(
      rightCurtainRef.current,
      { x: "100%", duration: 1, ease: "power2.inOut" },
      0
    );

    // 2. Animación dramática para el texto revelado
    // Comienza al 20% de la duración de las cortinas, termina casi al 100% de las cortinas
    tl.to(
      textRef.current,
      {
        opacity: 1,
        scale: 1.5,
        duration: 0.8, // Ligeramente más corta para que el icono entre justo después
        ease: "power1.out",
      },
      0.2
    );

    // 3. ¡NUEVA FASE: Añadir el icono!
    // Usamos `>` para indicar "al final de la animación anterior" O un valor absoluto de tiempo (1)
    // Usaremos `1` (que es cuando las cortinas y el texto terminan su animación principal)
    tl.to(
      iconRef.current,
      {
        opacity: 1, // El icono se vuelve visible
        scale: 1, // Vuelve a su tamaño normal (empezó en 0)
        y: 0, // Vuelve a su posición original (empezó -50)
        borderRadius: "100%", // Asegura que el icono no tenga bordes redondeados
        duration: 0.5,
        ease: "back.out(1.7)", // Un efecto de "rebote" para el icono
      },
      1
    ); // Comienza justo cuando las cortinas y el texto principal terminan su fase (en la posición relativa 1.0 del timeline)

    // Limpieza de ScrollTrigger al desmontar el componente
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(
        (st) => st.trigger === container && st.kill()
      );
    };
  }, [imageUrl]);

  // --- Estilos CSS ---
  const curtainStyles: React.CSSProperties = {
    position: "absolute",
    top: 0,
    width: "50vw",
    height: "100%",
    backgroundSize: "100vw 100vh",
    backgroundRepeat: "no-repeat",
    zIndex: 1,
  };

  const textStyle: React.CSSProperties = {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "6vw",
    color: "yellow",
    opacity: 0, // Inicialmente oculto
    zIndex: 0, // ¡Subimos el zIndex para asegurar que el texto/icono esté encima!
    textAlign: "center",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
    // Usamos Flexbox para centrar el icono y el texto
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column", // Apila el texto y el icono verticalmente
  };

  // Estilo del icono (Balón de Fútbol ⚽)
  const iconStyle: React.CSSProperties = {
    display: "block", // Asegura que tome su propia línea (dentro del flexbox)
    fontSize: "3vw", // Tamaño más pequeño que el texto principal
    marginTop: "0.5em", // Separación del texto
    opacity: 0, // Inicialmente oculto
    scale: 0, // Empezará pequeño y crecerá
    
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        // ----------------------------------------------------
        // ✨ CAMBIO CLAVE: Reemplazar el color por la imagen
        // ----------------------------------------------------
        backgroundImage: `url(${wallpaperUrl})`, // Usamos la nueva prop aquí
        backgroundSize: "cover", // Cubre todo el contenedor
        backgroundPosition: "center center", // Centra la imagen
        backgroundAttachment: "fixed", // Opcional: Para un efecto paralaje sutil si el contenedor fuera más grande
        // ----------------------------------------------------
      }}
    >
      {/* --- CORTINA IZQUIERDA/DERECHA (Sin cambios aquí) --- */}
      <div
        ref={leftCurtainRef}
        style={{
          ...curtainStyles,
          left: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "0% center",
        }}
      />
      <div
        ref={rightCurtainRef}
        style={{
          ...curtainStyles,
          right: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "100% center",
        }}
      />

      {/* --- TEXTO Y REVELACIÓN DEL ICONO --- */}
      {/* El texto ahora es un contenedor Flex */}
      <h1 ref={textRef} style={textStyle}>
        {text}
        {/* ¡El nuevo icono! */}
        <span
          ref={iconRef}
          style={iconStyle}
          role="img"
          aria-label="Balón de Fútbol"
        >
          <Image
            src="/cap.png"
            alt="Soccer Ball"
            width={72}
            height={72}
            className="rounded-3xl bg-black"
            
          />
        </span>
      </h1>
    </div>
  );
};

export default CurtainScrollEffect;
