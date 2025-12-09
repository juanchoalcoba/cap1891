// src/app/page.tsx
'use client';

import { DesktopIcon } from '@/components/DesktopIcon';
import { Window } from '@/components/Window';
import { useWindowStore } from '@/store/windowStore';
import { AnimatePresence } from 'framer-motion';

export default function Desktop() {
  const { windows } = useWindowStore();

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      {/* 1. ICONOS DEL ESCRITORIO */}
      <DesktopIcon 
        title="Mis Proyectos" 
        component="PortfolioWindow" 
        defaultX={20} 
        defaultY={20} 
      />
      <DesktopIcon 
        title="Acerca de Mí" 
        component="AboutWindow" 
        defaultX={20} 
        defaultY={120} 
      />
       <DesktopIcon 
        title="Configuración" 
        component="SettingsWindow" 
        defaultX={20} 
        defaultY={220} 
      />
      
      {/* 2. VENTANAS ACTIVAS */}
      {/* AnimatePresence permite animaciones de salida (Exit) */}
      <AnimatePresence>
        {windows.map((item) => (
          <Window key={item.id} item={item} />
        ))}
      </AnimatePresence>

      {/* 3. BARRA DE TAREAS (¡Implementación Pendiente!) */}
      <footer className="absolute bottom-0 left-0 right-0 h-10 bg-gray-900/80 backdrop-blur-sm flex items-center justify-between p-2">
        <span className="text-white text-sm">WebOS Next.js</span>
        {/* Aquí irían los iconos de las ventanas minimizadas y el reloj */}
      </footer>
    </main>
  );
}