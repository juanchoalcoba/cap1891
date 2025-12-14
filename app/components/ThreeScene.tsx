"use client"; // Necesario para usar APIs del navegador en Next.js

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Seguridad

    // ------------------------------
    // 1. Crear la escena
    // ------------------------------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    // ------------------------------
    // 2. Configurar la cámara
    // ------------------------------
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(3, 3, 5);

    // ------------------------------
    // 3. Crear el Renderer
    // ------------------------------
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ------------------------------
    // 4. Añadir luces
    // ------------------------------
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(3, 3, 3);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    // ------------------------------
    // 5. Crear un objeto 3D
    // ------------------------------
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0x5577ff,
      metalness: 0.6,
      roughness: 0.3,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // ------------------------------
    // 6. Controles de cámara
    // ------------------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // ------------------------------
    // 7. Ajustar al cambiar tamaño
    // ------------------------------
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // ------------------------------
    // 8. Loop de animación
    // ------------------------------
    let animationId: number;

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // ------------------------------
    // 9. Cleanup
    // ------------------------------
    return () => {
      window.removeEventListener("resize", handleResize);

      cancelAnimationFrame(animationId);

      geometry.dispose();
      material.dispose();

      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100vh",
        display: "block",
      }}
    />
  );
}
