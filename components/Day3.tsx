import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from './Layout';
import CTAModal from './CTAModal';
import { AppRoute, ChatMessage } from '../types';
import { COLORS } from '../constants';
import { sendConsultantMessage } from '../services/geminiService';

interface Day3Props {
  setRoute: (route: AppRoute) => void;
}

const Day3: React.FC<day3props> = ({ setRoute }) => {
  const [messages, setMessages] = useState<chatmessage[]>([
    { role: 'model', text: 'Hola. Soy tu consultor de carrera de IA Heroes. Veo que tienes interés en la Inteligencia Artificial. Cuéntame, **¿a qué te dedicas y qué te preocupa de tu futuro profesional?**' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  // Track if we have already shown the CTA to avoid spamming
  const hasShownCTARef = useRef(false);

  const messagesEndRef = useRef<htmldivelement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Format history for API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const reply = await sendConsultantMessage(history, userMsg);
      if (reply) {
         setMessages(prev => [...prev, { role: 'model', text: reply }]);
         
         // Show CTA only after the first successful user interaction response
         if (!hasShownCTARef.current) {
            hasShownCTARef.current = true;
            setTimeout(() => setShowCTA(true), 3000); // Wait 3s so user can read a bit first
         }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Lo siento, tuve un problema pensando la respuesta. ¿Podrías repetirlo?", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <layout title="Día 3: Consultoría de Carrera" onback="{()" ==""> setRoute(AppRoute.HOME)}>
      <ctamodal isopen="{showCTA}" onclose="{()" ==""> setShowCTA(false)} 
        title="¿Te sientes identificado?"
        message="Nuestro consultor IA solo puede darte consejos básicos. En el programa IA Heroes Pro tendrás tutorías reales y un plan de carrera personalizado."
      />

      <div classname="flex flex-col h-[calc(100dvh-140px)] md:h-[70vh] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300">
        
        {/* Chat Area */}
        <div classname="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            
            return (
              <div key="{idx}" classname="{`flex" ${isuser="" ?="" 'justify-end'="" :="" 'justify-start'}`}="">
                {/* Avatar / Icon */}
                {!isUser && (
                   <div classname="w-8 h-8 rounded-full bg-gradient-to-br from-[#243F4C] to-[#2a4d5e] flex items-center justify-center text-white text-xs mr-2 mt-1 shadow-sm flex-shrink-0">
                     🤖
                   </div>
                )}

                <div classname="{`max-w-[85%]" md:max-w-[75%]="" p-4="" rounded-2xl="" text-base="" md:text-lg="" shadow-sm="" leading-relaxed="" ${="" isuser="" ?="" 'bg-slate-800="" text-white="" rounded-br-none'="" :="" 'bg-white="" text-slate-700="" border="" border-slate-200="" rounded-tl-none'="" }="" ${msg.iserror="" ?="" 'border-red-500="" bg-red-50="" text-red-800'="" :="" ''}`}="">
                  <reactmarkdown components="{{" custom="" paragraphs="" with="" spacing="" p:="" ({node,="" ...props})=""> <p classname="mb-2 last:mb-0" {...props}=""/>,
                      
                      // Custom Bold (colors depend on background)
                      strong: ({node, ...props}) => (
                        <strong classname="{`font-bold" ${isuser="" ?="" 'text-white'="" :="" 'text-[#243f4c]'}`}="" {...props}=""/>
                      ),
                      
                      // Lists
                      ul: ({node, ...props}) => <ul classname="list-disc pl-5 mb-2 space-y-1" {...props}=""/>,
                      ol: ({node, ...props}) => <ol classname="list-decimal pl-5 mb-2 space-y-1" {...props}=""/>,
                      li: ({node, ...props}) => <li classname="pl-1" {...props}=""/>,

                      // Headers (scaled down to fit chat)
                      h1: ({node, ...props}) => <h3 classname="font-bold text-base mb-1 mt-1" {...props}=""/>,
                      h2: ({node, ...props}) => <h3 classname="font-bold text-base mb-1 mt-1" {...props}=""/>,
                      h3: ({node, ...props}) => <h3 classname="font-bold text-sm mb-1 mt-1" {...props}=""/>,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            );
          })}
          
          {isLoading && (
             <div classname="flex justify-start items-end">
               <div classname="w-8 h-8 rounded-full bg-gradient-to-br from-[#243F4C] to-[#2a4d5e] flex items-center justify-center text-white text-xs mr-2 shadow-sm flex-shrink-0 mb-1">
                 🤖
               </div>
               <div classname="bg-white p-4 rounded-2xl border border-slate-200 rounded-tl-none flex items-center gap-2 shadow-sm">
                 <div classname="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                 <div classname="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                 <div classname="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
               </div>
             </div>
          )}
          <div ref="{messagesEndRef}"/>
        </div>

        {/* Input Area */}
        <div classname="p-3 md:p-4 bg-white border-t border-slate-200">
          <div classname="flex gap-2 md:gap-3">
            <input type="text" value="{input}" onchange="{(e)" ==""> setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu respuesta aquí..."
              className="flex-1 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none text-base bg-white text-slate-900 placeholder-slate-400 shadow-inner"
              autoFocus
            />
            <button onclick="{handleSend}" disabled="{isLoading" ||="" !input.trim()}="" classname="px-4 md:px-6 py-3 rounded-xl font-bold text-white transition-all transform active:scale-95 hover:shadow-lg disabled:opacity-50 disabled:hover:shadow-none" style="{{" backgroundcolor:="" colors.accent="" }}="">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Day3;