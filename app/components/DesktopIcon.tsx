// src/components/DesktopIcon.tsx
import { motion } from 'framer-motion';
import { useWindowStore, WindowItem } from '@/store/windowStore';
import { Folder, User, Settings } from 'lucide-react';

// Mapeo de iconos (usando Lucide)
const getIcon = (component) => {
  switch (component) {
    case 'PortfolioWindow': return <Folder size={36} />;
    case 'AboutWindow': return <User size={36} />;
    case 'SettingsWindow': return <Settings size={36} />;
    default: return <Folder size={36} />;
  }
};

export const DesktopIcon = ({ title, component, defaultX, defaultY }) => {
  const openWindow = useWindowStore((state) => state.openWindow);

  const handleDoubleClick = () => {
    // Abrir ventana en una posición por defecto o aleatoria
    openWindow(title, component, defaultX + 100, defaultY + 100); 
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, top: 0, right: Infinity, bottom: Infinity }}
      dragTransition={{ power: 0.05, timeConstant: 100 }}
      initial={{ x: defaultX, y: defaultY }}
      className="absolute flex flex-col items-center w-24 p-2 cursor-pointer rounded transition-all hover:bg-white/10"
      onDoubleClick={handleDoubleClick}
    >
      <div className="text-4xl text-white">
        {getIcon(component)}
      </div>
      <span className="text-xs text-white mt-1 text-center select-none leading-tight">{title}</span>
    </motion.div>
  );
};