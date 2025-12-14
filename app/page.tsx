import CurtainScrollEffect from "./components/Curtain";
import IntroScrollEffect from "./components/IntroScroll"; 
import ZoomOutTransition from "./components/ZoomOut"; 
// Importa tu nuevo componente o sección aquí
import FinalSectionComponent from "./components/FinalSection";
import Image from "next/image";

// URL de la imagen que quieres usar para la introducción
// Reemplaza esta URL con la ruta a tu propia imagen.
const CLUB_IMAGE_URL = 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp4234990.jpg&sp=1765681222Td80e1bae3587f628390bd58e453b441933fee4172aad46dd07a261f59847d973'; 

const Page = () => {

  
  return (
    <div>
      {/* --- 1. SECCIÓN DE INTRODUCCIÓN (Desvanecimiento y Empuje) --- 
        Ahora pasamos la 'imageUrl' para que el fondo sea la imagen con overlay.
      */}
      <IntroScrollEffect imageUrl={CLUB_IMAGE_URL}>
        <div className="text-yellow-200 flex flex-col justify-center items-center"> {/* Usamos text-white para el texto de introducción */}
            <h2 className="text-5xl md:text-7xl font-bold p-4 max-w-5xl">
              Bienvenidos al sitio del Club Atletico Peñarol
            </h2>
            <p className="mt-2 text-xl md:text-2xl">
              Desliza hacia abajo para descubrir más sobre nuestro legado y pasión.
            </p>
            <Image
                        src="/cap.png"
                        alt="Soccer Ball"
                        width={72}
                        height={72}
                        className="rounded-3xl bg-black mt-12"
                        
                      />
        </div>
      </IntroScrollEffect>

      {/* --- 2. EL EFECTO DE CORTINA --- */}
      {/* Asumiendo que gta.jpeg y gta2.jpeg son rutas correctas dentro de tu proyecto */}
      <CurtainScrollEffect
        text="Club Atletico Peñarol"
        imageUrl="dron.jpeg"
        wallpaperUrl="./p1.jpeg"
      />

      {/* --- 3. SECCIÓN DE TRANSICIÓN FINAL (Zoom Out) --- */}
      <ZoomOutTransition title="Peñarol 1891">
          {/* Este div representa la sección que aparece después del zoom. */}
        <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100  p-10">
          <div className="mt-20 h-screen "> 
            
          </div>
        </div>
      </ZoomOutTransition>
        <IntroScrollEffect imageUrl={CLUB_IMAGE_URL}>
        <div className="text-yellow-200 w-160 flex flex-col justify-center items-center"> {/* Usamos text-white para el texto de introducción */}
            <h2 className="text-4xl md:text-5xl font-bold p-4 max-w-5xl">
              <span className="text-amber-300">PEÑAROL</span> CAMPEÓN DE AMÉRICA Y DEL MUNDO
            </h2>
            <p className="mt-2 text-xl w-full balance md:text-2xl">
              Peñarol es el único club uruguayo que ha ganado la <span className="text-amber-500">Copa Libertadores</span> y la Copa Intercontinental en dos ocasiones
            </p>
            <Image
                        src="/cap.png"
                        alt="Soccer Ball"
                        width={72}
                        height={72}
                        className="rounded-3xl bg-black mt-12"
                        
                      />
        </div>
      </IntroScrollEffect>
      {/* --- 4. NUEVA SECCIÓN POST-ANIMACIÓN --- */}
       
      
    </div>
  );
}

export default Page;