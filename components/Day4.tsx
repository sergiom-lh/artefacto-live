import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from './Layout';
import CTAModal from './CTAModal';
import { AppRoute } from '../types';
import { COLORS } from '../constants';
import { analyzeBusiness } from '../services/geminiService';

interface Day4Props {
  setRoute: (route: AppRoute) => void;
}

// Helper to remove the "thought" artifacts from Gemini
const cleanGeminiOutput = (text: string) => {
  if (!text) return "";
  // Removes lines starting with "thought" followed by text until a double newline or end of string
  // Also handles the specific "thought I will search" pattern common in Search Grounding
  let cleaned = text.replace(/^thought\s+[\s\S]*?(\n\n|$)/i, '');
  // Clean up any remaining leading whitespace
  return cleaned.trim();
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onclick="{handleCopy}" classname="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors" title="Copiar Prompt">
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" classname="h-4 w-4 text-green-400" fill="none" viewbox="0 0 24 24" stroke="currentColor" strokewidth="{2}">
            <path strokelinecap="round" strokelinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
          <span classname="text-green-400">Copiado</span>
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" classname="h-4 w-4" fill="none" viewbox="0 0 24 24" stroke="currentColor" strokewidth="{2}">
            <path strokelinecap="round" strokelinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          Copiar
        </>
      )}
    </button>
  );
};

const Day4: React.FC<day4props> = ({ setRoute }) => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string |="" null="">(null);
  const [sources, setSources] = useState<any[]>([]);
  const [showCTA, setShowCTA] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    setSources([]);

    try {
      const result = await analyzeBusiness(url);
      const cleanedText = cleanGeminiOutput(result.text || "");
      
      setAnalysis(cleanedText || "No se pudo generar el análisis. Inténtalo de nuevo.");
      setSources(result.sources || []);
      
      // Trigger CTA after analysis success
      setTimeout(() => setShowCTA(true), 1500);

    } catch (error) {
      console.error(error);
      setAnalysis("Hubo un error al conectar con el servidor de análisis. Asegúrate de que la URL es correcta.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Parse logic to split the raw text into Intro and Agent Cards
  const parseResult = (text: string) => {
    if (!text) return { intro: '', agents: [] };
    // Split by "### Agente" (case insensitive)
    const parts = text.split(/(?=### Agente)/i);
    return {
      intro: parts[0],
      agents: parts.slice(1)
    };
  };

  const { intro, agents } = analysis ? parseResult(analysis) : { intro: '', agents: [] };

  return (
    <layout title="Día 4: Auditoría de Negocio con IA" onback="{()" ==""> setRoute(AppRoute.HOME)}>
      <ctamodal isopen="{showCTA}" onclose="{()" ==""> setShowCTA(false)} 
        title="¡Imagina el ROI!"
        message="Estos agentes son solo ideas. En IA Heroes Pro, te enseñamos a construirlos e implementarlos en tu negocio en menos de 8 meses."
      />

      <div classname="space-y-8 pb-10">
        
        {/* Input Section */}
        <div classname="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 classname="text-xl font-bold text-slate-800 mb-2">Descubre tu potencial de automatización</h2>
          <p classname="text-slate-600 mb-4">
            Introduce la URL de tu sitio web (o el de un competidor). La IA analizará el modelo de negocio y diseñará 3 agentes personalizados para aumentar la rentabilidad.
          </p>
          
          <div classname="flex flex-col gap-3">
            <input type="text" value="{url}" onchange="{(e)" ==""> setUrl(e.target.value)}
              placeholder="https://www.mi-negocio.com"
              className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-pink-500 outline-none text-lg bg-white text-slate-900 placeholder-slate-400"
            />
            <button onclick="{handleAnalyze}" disabled="{isAnalyzing" ||="" !url}="" classname="w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition hover:brightness-110 disabled:opacity-50 flex justify-center items-center gap-2" style="{{" backgroundcolor:="" colors.primary="" }}="">
              {isAnalyzing ? (
                <>
                  <svg classname="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24">
                    <circle classname="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokewidth="4"></circle>
                    <path classname="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analizando la web en tiempo real...
                </>
              ) : (
                '🔍 Analizar Negocio'
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {analysis && (
          <div classname="space-y-8 animate-fade-in">
             
             {/* 1. General Analysis (Intro) */}
             {intro.trim() && (
               <div classname="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#243F4C]">
                 <h3 classname="font-bold text-lg text-[#243F4C] mb-3 flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" classname="h-5 w-5" viewbox="0 0 20 20" fill="currentColor">
                     <path fillrule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" cliprule="evenodd"/>
                   </svg>
                   Análisis del Negocio
                 </h3>
                 <div classname="prose prose-slate max-w-none text-slate-600">
                    <reactmarkdown>{intro}</ReactMarkdown>
                 </div>
               </div>
             )}

             {/* 2. Agents Grid */}
             {agents.length > 0 && (
               <div>
                  <h3 classname="text-2xl font-bold text-slate-800 mb-6 px-2">Agentes Propuestos</h3>
                  <div classname="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {agents.map((agentText, index) => (
                      <div key="{index}" classname="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                        {/* Decorative Header Stripe */}
                        <div classname="h-2 w-full bg-gradient-to-r from-[#243F4C] to-[#FF2878]"></div>
                        
                        <div classname="p-6 flex-1 flex flex-col">
                          <reactmarkdown components="{{" card="" title="" (###="" agente="" x)="" h3:="" ({node,="" ...props})=""> <h3 classname="text-xl font-bold text-[#243F4C] mb-4 pb-3 border-b border-slate-100" {...props}=""/>,
                                // Paragraphs
                                p: ({node, ...props}) => <p classname="text-slate-600 mb-4 text-sm leading-relaxed" {...props}=""/>,
                                // Bold (ROI Impact)
                                strong: ({node, ...props}) => <span classname="font-bold text-[#243F4C] bg-blue-50 px-2 py-1 rounded inline-block mb-1" {...props}=""/>,
                                // Lists
                                ul: ({node, ...props}) => <ul classname="list-disc list-outside ml-4 mb-4 text-sm text-slate-600 space-y-1" {...props}=""/>,
                                ol: ({node, ...props}) => <ol classname="list-decimal list-outside ml-4 mb-4 text-sm text-slate-600 space-y-1" {...props}=""/>,
                                // Custom Code Block for System Prompt
                                code: ({node, inline, className, children, ...props}: any) => {
                                  if (inline) return <code classname="bg-slate-100 text-pink-600 px-1 rounded font-mono text-xs" {...props}="">{children}</code>;
                                  
                                  const content = String(children).replace(/\n$/, '');
                                  
                                  // Parse content to style headers (# ROL) differently inside the dark block
                                  const lines = content.split('\n');
                                  const formattedContent = lines.map((line, i) => {
                                    const trimmed = line.trim();
                                    // Check for headers like "# ROL", "# CONTEXTO"
                                    if (trimmed.startsWith('#')) {
                                      return (
                                        <span key="{i}" classname="block font-bold mt-4 mb-1 first:mt-0" style="{{" color:="" colors.accent="" }}="">
                                          {line}
                                        </span>
                                      );
                                    }
                                    // Bullet points inside the prompt
                                    if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                                       return <span key="{i}" classname="block text-slate-300 pl-2">{line}</span>;
                                    }
                                    return <span key="{i}" classname="block text-slate-200">{line}</span>;
                                  });

                                  return (
                                    <div classname="bg-[#0F172A] rounded-xl overflow-hidden shadow-inner border border-slate-800 mt-auto">
                                      {/* Header of the Code Block */}
                                      <div classname="flex items-center justify-between px-4 py-2 bg-[#1e293b] border-b border-slate-700">
                                        <div classname="flex items-center gap-2">
                                          <div classname="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                          <div classname="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                          <div classname="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                          <span classname="ml-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest">System Prompt</span>
                                        </div>
                                        <copybutton text="{content}"/>
                                      </div>
                                      
                                      {/* Content */}
                                      <div classname="p-4 overflow-x-auto">
                                        <pre classname="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                                          {formattedContent}
                                        </pre>
                                      </div>
                                    </div>
                                  );
                                }
                             }}
                          >
                            {agentText}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
             )}
             
             {/* 3. Sources */}
             {sources.length > 0 && (
               <div classname="pt-6 border-t border-slate-200">
                 <h4 classname="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Fuentes Analizadas</h4>
                 <div classname="flex flex-wrap gap-2">
                   {sources.map((chunk, idx) => (
                     chunk.web?.uri ? (
                       <a key="{idx}" href="{chunk.web.uri}" target="_blank" rel="noopener noreferrer" classname="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs hover:bg-slate-200 transition-colors">
                         <svg xmlns="http://www.w3.org/2000/svg" classname="h-3 w-3" viewbox="0 0 20 20" fill="currentColor">
                            <path fillrule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" cliprule="evenodd"/>
                         </svg>
                         {chunk.web.title || new URL(chunk.web.uri).hostname}
                       </a>
                     ) : null
                   ))}
                 </div>
               </div>
             )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Day4;