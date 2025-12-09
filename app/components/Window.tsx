// src/components/Window.tsx
import { motion } from 'framer-motion';
import { Minimize, Maximize, X } from 'lucide-react';
import { useWindowStore } from '@/store/windowStore';

// Mapeo simple de componentes
const WindowContent = ({ component }) => {
  switch (component) {
    case 'PortfolioWindow':
      return <div className="p-4 text-white">¡Mi Portafolio Web! (Arrastra y redimensiona)</div>;
    case 'AboutWindow':
      return <div className="p-4 text-white">Acerca de este WebOS: Next.js + Framer Motion.</div>;
    default:
      return <div className="p-4 text-white">Contenido de la ventana {component}</div>;
  }
};

export const Window = ({ item }) => {
  const { closeWindow, focusWindow, maxZIndex } = useWindowStore();
  
  // Usaremos un Z-Index incremental simple para simular el foco
  const zIndex = item.id + maxZIndex; 

  const handleFocus = () => focusWindow(item.id);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute bg-gray-800/90 shadow-2xl rounded-lg overflow-hidden min-w-[300px] min-h-[200px] border border-gray-700 backdrop-blur-md"
      style={{ 
        x: item.x, 
        y: item.y, 
        zIndex: zIndex, // Asignación de Z-Index
        width: 600, 
        height: 400 
      }}
      // Propiedad 'drag' en la ventana completa
      drag
      dragMomentum={false} // Desactivar inercia para sensación de escritorio
      dragConstraints={{ left: 0, top: 0, right: window.innerWidth - 300, bottom: window.innerHeight - 50 }}
      dragListener={false} // Desactivamos el drag en la ventana completa
      onMouseDown={handleFocus} // Enfocar al hacer clic en cualquier parte de la ventana
    >
      {/* BARRA DE TÍTULO ARRASTRABLE */}
      <motion.header
        className="flex justify-between items-center p-2 bg-gray-700/80 cursor-grab active:cursor-grabbing text-white"
        // Habilitamos el arrastre específicamente para la barra de título
        onPointerDown={(e) => {
          e.stopPropagation(); // Evita que se propague el evento al Window.tsx y solo active el drag de la barra
          handleFocus();
        }}
        drag // Habilita el arrastre de la barra de título
        dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }} // Deshabilitar desplazamiento del drag
        onDrag={(event, info) => {
          // Lógica para mover la ventana completa arrastrando solo la barra de título
        }}
        onDoubleClick={() => { /* Maximizar */ }}
      >
        <h2 className="text-sm font-semibold">{item.title}</h2>
        <div className="flex space-x-2">
          <button className="text-sm hover:bg-gray-600 p-1 rounded"><Minimize size={16} /></button>
          <button className="text-sm hover:bg-gray-600 p-1 rounded"><Maximize size={16} /></button>
          <button 
            onClick={() => closeWindow(item.id)} 
            className="text-sm hover:bg-red-600 p-1 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </motion.header>

      {/* CONTENIDO */}
      <div className="flex-grow h-full overflow-auto">
        <WindowContent component={item.component} />
      </div>
    </motion.div>
  );
};