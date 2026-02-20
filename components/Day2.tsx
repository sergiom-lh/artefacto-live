import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import CTAModal from './CTAModal';
import { AppRoute } from '../types';
import { COLORS } from '../constants';
import { generateImage, generateVideo, enhancePrompt, checkUserKeySelection, openKeySelection } from '../services/geminiService';

interface Day2Props {
  setRoute: (route: AppRoute) => void;
}

const Day2: React.FC<day2props> = ({ setRoute }) => {
  const [mode, setMode] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string |="" null="">(null);
  const [error, setError] = useState<string |="" null="">(null);
  const [hasKey, setHasKey] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    checkUserKeySelection().then(setHasKey);
  }, []);

  const handleConnectKey = async () => {
    try {
      await openKeySelection();
      setHasKey(true);
    } catch (e) {
      console.error("Key selection failed", e);
    }
  };

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    try {
      const betterPrompt = await enhancePrompt(prompt);
      setPrompt(betterPrompt);
      setIsOptimized(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setResultUrl(null);

    try {
      // API Key is only strictly required for Veo (Video)
      if (mode === 'video' && !hasKey) {
          await handleConnectKey();
      }

      let url = '';
      if (mode === 'image') {
        url = await generateImage(prompt);
      } else {
        url = await generateVideo(prompt);
      }
      setResultUrl(url);
      
      // Show CTA shortly after result appears
      setTimeout(() => {
        setShowCTA(true);
      }, 2000);

    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Requested entity was not found")) {
         setHasKey(false);
         setError("La sesión de la llave API ha caducado. Por favor, conéctala de nuevo.");
      } else {
         setError("Ocurrió un error al generar el contenido. Inténtalo de nuevo.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<htmltextareaelement>) => {
    setPrompt(e.target.value);
    setIsOptimized(false);
  };

  return (
    <layout title="Día 2: Estudio Creativo" onback="{()" ==""> setRoute(AppRoute.HOME)}>
      <ctamodal isopen="{showCTA}" onclose="{()" ==""> setShowCTA(false)} 
        title="¡Increíble resultado!"
        message="¿Ves lo fácil que es crear contenido profesional con IA? En IA Heroes Pro aprenderás a usar estas herramientas para marketing y ventas."
      />

      <div classname="space-y-6">
        {/* Mode Toggles */}
        <div classname="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex">
          <button onclick="{()" ==""> { setMode('image'); setResultUrl(null); setError(null); }}
            className={`flex-1 py-3 px-2 rounded-lg text-sm md:text-base font-bold transition-all ${mode === 'image' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            📸 Imagen (Flash)
          </button>
          <button onclick="{()" ==""> { setMode('video'); setResultUrl(null); setError(null); }}
            className={`flex-1 py-3 px-2 rounded-lg text-sm md:text-base font-bold transition-all ${mode === 'video' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            🎥 Video (Veo)
          </button>
        </div>

        {/* API Key Gate - Only for Video */}
        {!hasKey && mode === 'video' ? (
           <div classname="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl shadow-sm">
            <h3 classname="font-bold text-yellow-800 text-lg mb-2">Acceso Requerido para Video</h3>
            <p classname="text-yellow-700 mb-4 text-sm md:text-base">
              Para usar el modelo de generación de video <strong>Veo</strong>, necesitas conectar tu cuenta de Google.
            </p>
            <button onclick="{handleConnectKey}" classname="bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition w-full md:w-auto">
              🔑 Conectar Cuenta Google
            </button>
            <div classname="mt-3 text-xs text-yellow-600">
               <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" classname="underline">Información sobre facturación</a>
            </div>
          </div>
        ) : (
          <div classname="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4 relative">
            
            <div classname="flex flex-wrap justify-between items-end gap-2">
              <label classname="block text-base md:text-lg font-medium text-slate-700">
                Describe lo que quieres crear:
              </label>
              {isOptimized && (
                <span classname="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
                  <span classname="text-emerald-500">✨</span> Optimizado
                </span>
              )}
            </div>

            <textarea value="{prompt}" onchange="{handlePromptChange}" placeholder="{mode" =="=" 'image'="" ?="" "un="" robot="" futurista="" pintando="" un="" cuadro..."="" :="" "un="" gato="" conduciendo="" un="" coche="" deportivo="" de="" neón..."}="" classname="{`w-full" p-4="" rounded-xl="" border="" focus:ring-2="" focus:ring-pink-500="" focus:border-transparent="" outline-none="" min-h-[120px]="" text-base="" md:text-lg="" bg-white="" text-slate-900="" placeholder-slate-400="" transition-colors="" ${isoptimized="" ?="" 'border-emerald-300="" ring-1="" ring-emerald-100'="" :="" 'border-slate-300'}`}=""/>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleEnhance}
                disabled={isEnhancing || !prompt}
                className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 flex justify-center items-center gap-2 text-sm md:text-base"
              >
                 {isEnhancing ? (
                    <span className="animate-spin">✨</span> 
                 ) : '✨'} 
                 Mejorar Prompt
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="flex-[2] py-3 px-4 rounded-xl font-bold text-white disabled:opacity-50 shadow-lg flex justify-center items-center gap-2 transition-transform active:scale-95 text-sm md:text-base"
                style={{ backgroundColor: COLORS.accent }}
              >
                {isGenerating ? (
                   <>
                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     {mode === 'video' ? 'Generando...' : 'Generando...'}
                   </>
                ) : (
                   `Generar ${mode === 'image' ? 'Imagen' : 'Video'}`
                )}
              </button>
            </div>
            {error && <p className="text-red-500 text-center text-sm font-medium mt-2">{error}</p>}
          </div>
        )}

        {/* Result Area */}
        {resultUrl && (
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 mt-6 animate-fade-in">
            <h3 className="text-center font-bold text-slate-700 mb-4">¡Aquí tienes tu creación!</h3>
            <div className="rounded-xl overflow-hidden flex justify-center bg-slate-100">
              {mode === 'image' ? (
                <img src={resultUrl} alt="Generado por IA" className="max-w-full max-h-[300px] md:max-h-[500px] object-contain" />
              ) : (
                <video src={resultUrl} controls className="max-w-full max-h-[300px] md:max-h-[500px]" autoPlay loop />
              )}
            </div>
            <div className="mt-4 text-center">
               <a href={resultUrl} download={`ia-heroes-${mode}-${Date.now()}`} className="text-blue-600 hover:underline font-semibold text-sm md:text-base">
                 Descargar {mode === 'image' ? 'Imagen' : 'Video'}
               </a>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Day2;