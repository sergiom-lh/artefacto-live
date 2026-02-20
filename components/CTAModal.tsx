import React from 'react';
import { COLORS } from '../constants';

interface CTAModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const CTAModal: React.FC<ctamodalprops> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  const CAMPAIGN_URL = "https://live.learningheroes.com/iah-artefact";

  return (
    <div classname="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop with blur */}
      <div classname="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onclick="{onClose}"></div>

      {/* Modal Content */}
      <div classname="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 animate-fade-in-up">
        
        {/* Decorative Header */}
        <div classname="h-32 bg-gradient-to-r from-[#243F4C] to-[#2a4d5e] relative flex items-center justify-center overflow-hidden">
           <div classname="absolute top-0 right-0 w-32 h-32 bg-[#FF2878] rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
           <div classname="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full blur-2xl opacity-20 -ml-5 -mb-5"></div>
           <span classname="text-6xl animate-bounce-slow relative z-10">🚀</span>
           
           <button onclick="{onClose}" classname="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" strokewidth="{2}" stroke="currentColor" classname="w-6 h-6">
               <path strokelinecap="round" strokelinejoin="round" d="M6 18L18 6M6 6l12 12"/>
             </svg>
           </button>
        </div>

        <div classname="p-8 text-center">
          <h2 classname="text-2xl font-bold text-slate-800 mb-2">
            {title || "¿Te ha gustado la experiencia?"}
          </h2>
          <p classname="text-slate-600 mb-8 text-lg leading-relaxed">
            {message || "Esto es solo el 1% de lo que puedes lograr. Si quieres dominar la IA y transformar tu carrera, únete a la élite."}
          </p>

          <div classname="space-y-3">
            <a href="{CAMPAIGN_URL}" target="_blank" rel="noopener noreferrer" classname="block w-full py-4 px-6 rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-xl hover:brightness-110 transition-all transform hover:scale-[1.02]" style="{{" backgroundcolor:="" colors.accent="" }}="">
              👉 Reserva tu Plaza en IA Heroes Pro
            </a>
            
            <button onclick="{onClose}" classname="block w-full py-3 px-6 rounded-xl font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors">
              Continuar explorando la app
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAModal;