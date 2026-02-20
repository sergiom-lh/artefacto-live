import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import Layout from './Layout';
import CTAModal from './CTAModal';
import { AppRoute } from '../types';
import { COLORS } from '../constants';
import { 
  ArrowRight, ArrowLeft, CheckCircle, Info, Brain, Sparkles, AlertTriangle, Cpu, 
  Target, Link, ListOrdered, Lightbulb, TrendingUp, DollarSign,
  Bot, Database, Wrench, Zap, Network, MessageSquare, Mail, Globe, Layers,
  Calendar, FileText, MessageCircle
} from 'lucide-react';

// --- Data for the Chart ---
const chartData = [
  { year: 1850, Railroad: 3.6, Telephony: 0, Electrification: 0, Cars: 0, Comms: 0, Computers: 0, Software: 0, AI: 0 },
  { year: 1860, Railroad: 2.8, Telephony: 0, Electrification: 0, Cars: 0, Comms: 0, Computers: 0, Software: 0, AI: 0 },
  { year: 1870, Railroad: 5.4, Telephony: 0, Electrification: 0, Cars: 0, Comms: 0, Computers: 0, Software: 0, AI: 0 },
  { year: 1880, Railroad: 3.2, Telephony: 0.1, Electrification: 0, Cars: 0, Comms: 0, Computers: 0, Software: 0, AI: 0 },
  { year: 1890, Railroad: 1.8, Telephony: 0.1, Electrification: 0.1, Cars: 0, Comms: 0, Computers: 0, Software: 0, AI: 0 },
  { year: 1900, Railroad: 0.5, Telephony: 0.2, Electrification: 0.3, Cars: 0.1, Comms: 0, Computers: 0, Software: 0, AI: 0 },
  { year: 1910, Railroad: 0.6, Telephony: 0.3, Electrification: 0.6, Cars: 0.8, Comms: 0, Computers: 0, Software: 0, AI: 0 },
  { year: 1920, Railroad: 0.4, Telephony: 0.4, Electrification: 0.8, Cars: 3.0, Comms: 0, Computers: 0, Software: 0, AI: 0 },
  { year: 1930, Railroad: 0.2, Telephony: 0.3, Electrification: 0.7, Cars: 1.2, Comms: 0, Computers: 0, Software: 0, AI: 0 },
  { year: 1940, Railroad: 0.1, Telephony: 0.2, Electrification: 0.5, Cars: 1.0, Comms: 0, Computers: 0, Software: 0, AI: 0 },
  { year: 1950, Railroad: 0, Telephony: 0.3, Electrification: 0.4, Cars: 0.5, Comms: 0.1, Computers: 0, Software: 0, AI: 0 },
  { year: 1960, Railroad: 0, Telephony: 0.4, Electrification: 0.3, Cars: 0.4, Comms: 0.3, Computers: 0.1, Software: 0, AI: 0 },
  { year: 1970, Railroad: 0, Telephony: 0.5, Electrification: 0.2, Cars: 0.3, Comms: 0.5, Computers: 0.3, Software: 0.1, AI: 0 },
  { year: 1980, Railroad: 0, Telephony: 0.6, Electrification: 0.1, Cars: 0.2, Comms: 0.8, Computers: 0.8, Software: 0.3, AI: 0 },
  { year: 1990, Railroad: 0, Telephony: 0.5, Electrification: 0, Cars: 0.1, Comms: 1.0, Computers: 1.2, Software: 0.8, AI: 0 },
  { year: 2000, Railroad: 0, Telephony: 0.3, Electrification: 0, Cars: 0, Comms: 1.2, Computers: 1.4, Software: 1.5, AI: 0 },
  { year: 2010, Railroad: 0, Telephony: 0.1, Electrification: 0, Cars: 0, Comms: 0.8, Computers: 1.6, Software: 1.8, AI: 0.1 },
  { year: 2020, Railroad: 0, Telephony: 0, Electrification: 0, Cars: 0, Comms: 0.5, Computers: 2.0, Software: 2.2, AI: 0.5 },
  { year: 2024, Railroad: 0, Telephony: 0, Electrification: 0, Cars: 0, Comms: 0.4, Computers: 2.2, Software: 2.5, AI: 2.0 },
  { year: 2026, Railroad: 0, Telephony: 0, Electrification: 0, Cars: 0, Comms: 0.3, Computers: 2.3, Software: 2.8, AI: 4.5 },
  { year: 2028, Railroad: 0, Telephony: 0, Electrification: 0, Cars: 0, Comms: 0.2, Computers: 2.4, Software: 3.0, AI: 6.5 },
  { year: 2030, Railroad: 0, Telephony: 0, Electrification: 0, Cars: 0, Comms: 0.1, Computers: 2.5, Software: 3.2, AI: 8.1 },
];

const slides = [
  {
    type: 'flip',
    title: "¿Qué es la Era Exponencial?",
    icon: "🚀",
    question: "¿Por qué todo cambia tan rápido?",
    answer: `Durante más de un siglo, la economía global creció estable al ~3% anual. Ahora, la convergencia simultánea de **5 plataformas exponenciales** (IA, Robótica, Energía, Blockchain y Biología Programable) podría duplicar ese ritmo.

**ARK Invest** proyecta un crecimiento del **7.3% para 2030**, frente al 3.1% del FMI, apostando a que la aceleración mutua entre estas tecnologías generará un salto comparable al que produjeron los ferrocarriles y la electricidad hace un siglo.`
  },
  {
    type: 'chart',
    title: "Olas de Inversión Tecnológica",
    description: "Gasto de capital como porcentaje del PIB (Histórico y Proyectado)",
    icon: "📈"
  },
  {
    type: 'interactive_text',
    title: "¿Qué es la IA Generativa?",
    icon: "🧠",
    content: `La **IA Generativa** (ChatGPT, Claude, Gemini, Grok) crea contenido nuevo **prediciendo la siguiente palabra** más probable a partir de miles de millones de parámetros.
    
**No piensa: predice**, pero con resultados que parecen inteligentes.

Su funcionamiento es opaco (**caja negra**), lo que implica riesgos como alucinaciones y sesgos heredados. Por eso, la calidad del resultado no depende del modelo sino de **cómo le hablas**.`,
    interactiveElement: "token_predictor"
  },
  {
    type: 'prompt_engineering',
    title: "Prompt Engineering",
    icon: "🗣️",
    content: {
      summary: "El Prompt Engineering es el arte de hablarle y dar instrucciones precisas a la IA para obtener resultados de nivel experto. No requiere saber programar; profesionales de lingüística, marketing o periodismo ya lo practican.",
      fact: "El mercado lo valora: salarios de $126K–$335K en EE.UU., con crecimiento proyectado superior al 15% anual hasta 2030.",
      techniques: [
        {
          id: 'priming',
          name: 'Cebado (Priming)',
          desc: 'Asignar a la IA un rol, contexto, objetivo, tareas, formato de salida y ejemplos antes de pedirle nada. Más especificidad = más precisión.',
          icon: 'Target',
          example: 'Actúa como un experto en marketing digital. Tu objetivo es crear 5 títulos atractivos para un blog sobre IA...'
        },
        {
          id: 'cot',
          name: 'Chain of Thought',
          desc: 'Forzar a la IA a razonar paso a paso antes de responder. Mejora la precisión en problemas complejos y decisiones estratégicas.',
          icon: 'Link',
          example: 'Antes de dar la respuesta final, piensa paso a paso: 1. Analiza el problema. 2. Identifica las variables clave. 3. Calcula la solución...'
        },
        {
          id: 'ltm',
          name: 'Least to Most',
          desc: 'Dividir un problema grande en subproblemas ordenados de menor a mayor complejidad. A diferencia de CoT, aquí se resuelven múltiples subproblemas de forma incremental.',
          icon: 'ListOrdered',
          example: 'Para escribir un libro: 1. Genera ideas de temas. 2. Selecciona el mejor tema. 3. Crea el índice. 4. Escribe el capítulo 1...'
        },
        {
          id: 'gen_know',
          name: 'Conocimiento Generado',
          desc: 'Enfoque en dos pasos: primero la IA genera y valida conocimiento relevante, luego lo usa como base para la tarea. Reduce alucinaciones.',
          icon: 'Lightbulb',
          example: 'Paso 1: Genera 5 hechos clave sobre la fotosíntesis. Paso 2: Usa esos hechos para escribir un poema sobre una planta.'
        }
      ]
    }
  },
  {
    type: 'ai_agents',
    title: "Agentes de IA",
    icon: "🤖",
    content: {
      title: "De 'Chatbot' a 'Empleado Digital'",
      description: "Los Agentes de IA suponen el salto de 'la IA me responde' a 'la IA hace cosas por mí'. A diferencia de la IA generativa tradicional (input → output), un agente usa herramientas, toma decisiones y ejecuta tareas autónomamente.",
      components: [
        { id: 'brain', name: 'Cerebro (LLM)', desc: 'El modelo (GPT-4, Claude) que razona, planifica y toma decisiones.', icon: 'Brain', color: 'bg-purple-100 text-purple-600' },
        { id: 'tools', name: 'Herramientas', desc: 'Conexiones externas: Gmail, CRM, Slack, Buscador Web.', icon: 'Wrench', color: 'bg-blue-100 text-blue-600' },
        { id: 'memory', name: 'Memoria', desc: 'Almacena contexto a largo plazo y recuerda interacciones pasadas.', icon: 'Database', color: 'bg-amber-100 text-amber-600' },
        { id: 'action', name: 'Acción', desc: 'Capacidad de ejecutar: realizar pagos, enviar emails, escribir código.', icon: 'Zap', color: 'bg-emerald-100 text-emerald-600' }
      ],
      protocols: [
        { name: 'MCP (Anthropic)', desc: 'Estándar para conectar agentes con herramientas.' },
        { name: 'A2A (Google)', desc: 'Protocolo para que los agentes hablen entre sí.' }
      ]
    }
  },
  {
    type: 'agent_examples',
    title: "Ejemplos Prácticos",
    icon: "⚡",
    content: {
      examples: [
        {
          id: 'dental_assistant',
          title: "Asistente Virtual Clínica Dental",
          scenario: "Un paciente potencial visita el sitio web y abre el chat.",
          tools: [
            { name: 'Chatbot', icon: 'MessageSquare', color: 'text-blue-500' },
            { name: 'NLP Engine', icon: 'Brain', color: 'text-purple-500' },
            { name: 'CRM', icon: 'Database', color: 'text-orange-500' },
            { name: 'Calendar', icon: 'Calendar', color: 'text-green-500' }
          ],
          steps: [
            { id: 1, tool: 'Chatbot', action: 'Saludo: "¡Hola! Soy Ana de Clínica Sonrisas. ¿Cómo te llamas?"', icon: 'MessageSquare' },
            { id: 2, tool: 'Usuario', action: 'Responde: "Hola, soy Carlos."', icon: 'MessageCircle' },
            { id: 3, tool: 'NLP Engine', action: 'Identifica nombre y actualiza contexto.', icon: 'Brain' },
            { id: 4, tool: 'Chatbot', action: 'Pregunta: "Gracias Carlos. ¿En qué tratamiento estás interesado?"', icon: 'MessageSquare' },
            { id: 5, tool: 'Usuario', action: 'Responde: "Quiero un blanqueamiento."', icon: 'MessageCircle' },
            { id: 6, tool: 'CRM', action: 'Registra lead: Carlos - Interés: Blanqueamiento.', icon: 'Database' },
            { id: 7, tool: 'Chatbot', action: 'Pregunta: "¿Te gustaría agendar una cita de valoración?"', icon: 'MessageSquare' },
            { id: 8, tool: 'Usuario', action: 'Responde: "Sí, por favor."', icon: 'MessageCircle' },
            { id: 9, tool: 'Chatbot', action: 'Envía Link: "Aquí tienes mi calendario para elegir tu hora: cal.com/sonrisas"', icon: 'Calendar' }
          ],
          stats: { time: '45s', intervention: '0%' },
          platform: 'Voiceflow, Stack AI, Bland AI'
        }
      ]
    }
  }
];

// --- Agent Examples Component ---
const AgentExamplesSlide = ({ content }: { content: any }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const example = content.examples[0];
  const chatEndRef = useRef<htmldivelement>(null);

  // Auto-play loop logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= example.steps.length - 1) {
          return 0; // Loop back to start
        }
        return prev + 1;
      });
    }, 2500); // 2.5 seconds per step for better readability

    return () => clearInterval(interval);
  }, [example.steps.length]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStep]);

  const getIcon = (name: string) => {
    switch(name) {
      case 'MessageSquare': return <messagesquare classname="w-4 h-4"/>;
      case 'MessageCircle': return <messagecircle classname="w-4 h-4"/>;
      case 'Calendar': return <calendar classname="w-4 h-4"/>;
      case 'Brain': return <brain classname="w-4 h-4"/>;
      case 'Database': return <database classname="w-4 h-4"/>;
      default: return <zap classname="w-4 h-4"/>;
    }
  };

  // Filter steps for chat view (only Chatbot and Usuario)
  const chatSteps = example.steps.slice(0, currentStep + 1).filter((step: any) => 
    step.tool === 'Chatbot' || step.tool === 'Usuario'
  );

  // Get current active step details
  const activeStep = example.steps[currentStep];

  // Determine if typing indicator should show (before the NEXT bot message)
  const nextChatStepIndex = example.steps.findIndex((s: any, i: number) =>
    i > currentStep && (s.tool === 'Chatbot' || s.tool === 'Usuario')
  );
  const nextChatStep = nextChatStepIndex !== -1 ? example.steps[nextChatStepIndex] : null;
  const showTypingIndicator = nextChatStep !== null && nextChatStep.tool !== 'Usuario';

  return (
    <div classname="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[42rem] md:h-[46rem] animate-fade-in-up">
      
      {/* Header */}
      <div classname="bg-slate-50 p-4 border-b border-slate-100 text-center relative">
        <div classname="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-sm mb-2">
          <bot classname="w-6 h-6 text-indigo-600"/>
        </div>
        <h3 classname="text-xl font-bold text-slate-800 mb-1">{example.title}</h3>
        <p classname="text-slate-500 text-sm italic">"{example.scenario}"</p>
      </div>

      <div classname="p-4 md:p-6 overflow-hidden flex-grow flex flex-col">
        
        {/* Simulation Area */}
        <div classname="flex-grow flex flex-col md:flex-row gap-4 h-full overflow-hidden">
          
          {/* Chat Interface Simulation */}
          <div classname="flex-1 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-inner relative h-full">
            <div classname="bg-white p-2 border-b border-slate-100 flex items-center gap-2 shadow-sm z-10">
              <div classname="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span classname="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Chat en Vivo</span>
            </div>
            
            <div classname="flex-grow p-3 overflow-y-auto custom-scrollbar space-y-3 bg-slate-50/50">
              {chatSteps.map((step: any) => (
                <div key="{step.id}" classname="{`flex" w-full="" ${step.tool="==" 'usuario'="" ?="" 'justify-end'="" :="" 'justify-start'}="" animate-fade-in-up`}="">
                  <div classname="{`max-w-[85%]" p-2.5="" rounded-2xl="" text-xs="" md:text-sm="" shadow-sm="" ${="" step.tool="==" 'usuario'="" ?="" 'bg-indigo-600="" text-white="" rounded-tr-none'="" :="" 'bg-white="" text-slate-700="" border="" border-slate-200="" rounded-tl-none'="" }`}="">
                    {step.tool !== 'Usuario' && (
                      <div classname="flex items-center gap-1 mb-0.5 font-bold text-indigo-600 text-[10px] uppercase tracking-wide">
                        {step.tool}
                      </div>
                    )}
                    {step.action.replace(/^.*: "/, '').replace(/"$/, '')}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {showTypingIndicator && (
                <div classname="flex justify-start animate-fade-in">
                  <div classname="bg-white border border-slate-200 h-6 px-2 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-sm">
                    <div classname="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                    <div classname="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div classname="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
              <div ref="{chatEndRef}"/>
            </div>
          </div>

          {/* Dashboard / Stats / Live Status */}
          <div classname="w-full md:w-1/3 flex flex-col gap-3 h-full overflow-hidden">
            
            {/* Live Process Status */}
            <div classname="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden flex-shrink-0">
              <div classname="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <h5 classname="font-bold text-slate-400 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                <cpu classname="w-3 h-3 animate-pulse text-indigo-500"/>
                Proceso en Tiempo Real
              </h5>
              
              <div classname="min-h-[60px] flex flex-col justify-center">
                {activeStep ? (
                  <div classname="animate-fade-in">
                    <div classname="flex items-center gap-2 mb-1 text-indigo-600 font-bold text-xs">
                      {getIcon(activeStep.icon)}
                      {activeStep.tool}
                    </div>
                    <p classname="text-slate-700 text-xs leading-relaxed line-clamp-2">
                      {activeStep.action.replace(/^.*: "/, '').replace(/"$/, '')}
                    </p>
                  </div>
                ) : (
                  <p classname="text-slate-400 text-xs italic">Esperando inicio...</p>
                )}
              </div>
            </div>

            {/* Tools Used (Active Highlight) */}
            <div classname="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex-shrink-0">
              <h5 classname="font-bold text-slate-400 text-[10px] uppercase tracking-widest mb-2">Stack Tecnológico</h5>
              <div classname="grid grid-cols-1 gap-1.5">
                {example.tools.map((tool: any, idx: number) => {
                  const isActive = activeStep && (activeStep.tool === tool.name || activeStep.icon === tool.icon);
                  return (
                    <div key="{idx}" classname="{`flex" items-center="" gap-2="" p-1.5="" rounded-lg="" border="" transition-all="" duration-300="" ${="" isactive="" ?="" 'bg-indigo-50="" border-indigo-200="" shadow-sm="" scale-105'="" :="" 'bg-slate-50="" border-slate-100="" opacity-70'="" }`}="">
                      <div classname="{`p-1" rounded-md="" bg-white="" shadow-sm="" ${tool.color}`}="">{getIcon(tool.icon)}</div>
                      <span classname="{`text-xs" font-bold="" ${isactive="" ?="" 'text-indigo-700'="" :="" 'text-slate-600'}`}="">{tool.name}</span>
                      {isActive && <div classname="ml-auto w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metrics */}
            <div classname="{`bg-gradient-to-br" from-slate-800="" to-slate-900="" text-white="" p-4="" rounded-xl="" shadow-lg="" mt-auto="" transition-all="" duration-700="" flex-shrink-0="" ${currentstep="==" example.steps.length="" -="" 1="" ?="" 'opacity-100="" scale-100'="" :="" 'opacity-80="" scale-95="" grayscale'}`}="">
              <h5 classname="font-bold text-slate-400 text-[10px] uppercase tracking-widest mb-3">Métricas</h5>
              <div classname="flex justify-between items-end mb-2">
                <span classname="text-slate-300 text-xs">Tiempo</span>
                <span classname="text-lg font-mono font-bold text-emerald-400">Inmediato</span>
              </div>
              <div classname="flex justify-between items-end">
                <span classname="text-slate-300 text-xs">Conversión</span>
                <span classname="text-lg font-mono font-bold text-emerald-400">+40%</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

// --- AI Agents Component ---
const AIAgentsSlide = ({ content }: { content: any }) => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'comparison' | 'exercise'>('diagram');
  const [visibleComponents, setVisibleComponents] = useState<string[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string |="" null="">(null);
  
  // Exercise State
  const [matches, setMatches] = useState<record<string, string="">>({});
  const [selectedMatchId, setSelectedMatchId] = useState<string |="" null="">(null);
  const [isExerciseComplete, setIsExerciseComplete] = useState(false);

  // Animation Sequence
  useEffect(() => {
    if (activeTab === 'diagram') {
      const sequence = ['brain', 'tools', 'memory', 'action'];
      let timeouts: NodeJS.Timeout[] = [];
      
      setVisibleComponents([]); // Reset
      
      sequence.forEach((id, index) => {
        const timeout = setTimeout(() => {
          setVisibleComponents(prev => [...prev, id]);
        }, index * 800 + 500); // Staggered delay
        timeouts.push(timeout);
      });

      return () => timeouts.forEach(clearTimeout);
    }
  }, [activeTab]);

  const getIcon = (name: string) => {
    switch(name) {
      case 'Brain': return <brain classname="w-6 h-6"/>;
      case 'Wrench': return <wrench classname="w-6 h-6"/>;
      case 'Database': return <database classname="w-6 h-6"/>;
      case 'Zap': return <zap classname="w-6 h-6"/>;
      default: return <bot classname="w-6 h-6"/>;
    }
  };

  const handleMatchClick = (id: string, type: 'component' | 'description') => {
    if (matches[id] || (type === 'description' && Object.values(matches).includes(id))) return; // Already matched

    if (!selectedMatchId) {
      if (type === 'component') setSelectedMatchId(id);
    } else {
      if (type === 'description') {
        // Check if correct
        const correctMatch = {
          'brain': 'desc_brain',
          'tools': 'desc_tools',
          'memory': 'desc_memory',
          'action': 'desc_action'
        };
        
        if (correctMatch[selectedMatchId as keyof typeof correctMatch] === id) {
          setMatches(prev => ({ ...prev, [selectedMatchId]: id }));
          if (Object.keys(matches).length + 1 === 4) setIsExerciseComplete(true);
        }
        setSelectedMatchId(null);
      } else {
        setSelectedMatchId(id); // Switch selection
      }
    }
  };

  return (
    <div classname="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[40rem] md:h-[44rem] animate-fade-in-up">
      <style>{`
        @keyframes flow-down {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-line {
          0% { stroke-opacity: 0.4; stroke-width: 2; }
          50% { stroke-opacity: 1; stroke-width: 4; }
          100% { stroke-opacity: 0.4; stroke-width: 2; }
        }
        .animate-flow-down {
          animation: flow-down 2s infinite linear;
        }
        .animate-spin-slow {
          animation: spin-slow 10s infinite linear;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s infinite linear;
        }
        .animate-pulse-line {
          animation: pulse-line 2s infinite ease-in-out;
          filter: drop-shadow(0 0 2px rgba(99, 102, 241, 0.5));
        }
      `}</style>

      <div classname="flex border-b border-slate-100">
        <button onclick="{()" ==""> setActiveTab('diagram')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'diagram' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Diagrama Interactivo
        </button>
        <button onclick="{()" ==""> setActiveTab('comparison')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'comparison' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Antes vs Después
        </button>
        <button onclick="{()" ==""> setActiveTab('exercise')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'exercise' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Ejercicio
        </button>
      </div>

      <div classname="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow relative">
        
        {/* DIAGRAM TAB */}
        {activeTab === 'diagram' && (
          <div classname="h-full flex flex-col relative overflow-hidden">
            {/* Background Tech Effect */}
            <div classname="absolute inset-0 opacity-5 pointer-events-none">
              <div classname="absolute inset-0" style="{{" backgroundimage:="" 'radial-gradient(#4f46e5="" 1px,="" transparent="" 1px)',="" backgroundsize:="" '20px="" 20px'="" }}=""></div>
            </div>

            <div classname="text-center mb-4 relative z-10">
              <h3 classname="text-2xl font-bold text-slate-800 mb-2">Anatomía de un Agente</h3>
              <p classname="text-slate-500 text-sm">El cerebro orquesta, las herramientas ejecutan.</p>
            </div>

            <div classname="relative flex-grow flex items-center justify-center min-h-[300px]">
              
              {/* SVG Connections Layer */}
              <svg classname="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                  <marker id="arrowhead" markerwidth="10" markerheight="7" refx="9" refy="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1"/>
                  </marker>
                </defs>
                
                {/* Paths to components */}
                {/* Brain (Center) to Tools (Top) */}
                {visibleComponents.includes('tools') && (
                  <path d="M 50% 50% L 50% 15%" stroke="#818cf8" strokewidth="2" fill="none" classname="animate-pulse-line"/>
                )}
                {/* Brain to Memory (Bottom Left) */}
                {visibleComponents.includes('memory') && (
                  <path d="M 50% 50% L 20% 70%" stroke="#818cf8" strokewidth="2" fill="none" classname="animate-pulse-line"/>
                )}
                {/* Brain to Action (Bottom Right) */}
                {visibleComponents.includes('action') && (
                  <path d="M 50% 50% L 80% 70%" stroke="#818cf8" strokewidth="2" fill="none" classname="animate-pulse-line"/>
                )}

                {/* Animated Flow Particles */}
                {visibleComponents.includes('tools') && (
                  <circle r="4" fill="#6366f1">
                    <animatemotion dur="1.5s" repeatcount="indefinite" path="M 50% 50% L 50% 15%"/>
                  </circle>
                )}
                {visibleComponents.includes('memory') && (
                  <circle r="4" fill="#f59e0b">
                    <animatemotion dur="1.5s" repeatcount="indefinite" path="M 50% 50% L 20% 70%"/>
                  </circle>
                )}
                {visibleComponents.includes('action') && (
                  <circle r="4" fill="#10b981">
                    <animatemotion dur="1.5s" repeatcount="indefinite" path="M 50% 50% L 80% 70%"/>
                  </circle>
                )}
              </svg>

              {/* Central Brain */}
              <div classname="{`absolute" z-20="" transition-all="" duration-700="" transform="" ${visiblecomponents.includes('brain')="" ?="" 'opacity-100="" scale-100'="" :="" 'opacity-0="" scale-50'}`}="" style="{{" top:="" '50%',="" left:="" '50%',="" transform:="" 'translate(-50%,="" -50%)'="" }}="" onclick="{()" ==""> setSelectedComponent('brain')}
              >
                <div classname="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center border-4 border-purple-100 shadow-[0_0_30px_rgba(168,85,247,0.3)] cursor-pointer hover:scale-105 transition-transform relative overflow-hidden group">
                  <div classname="absolute inset-0 bg-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <brain classname="w-10 h-10 text-purple-600 mb-1 relative z-10"/>
                  <span classname="text-xs font-bold text-slate-700 relative z-10">CEREBRO</span>
                  {/* Pulse Ring */}
                  <div classname="absolute inset-0 rounded-full border-2 border-purple-400 opacity-0 animate-ping"></div>
                </div>
              </div>

              {/* Orbiting Components */}
              {[
                { id: 'tools', top: '15%', left: '50%', translate: '-translate-x-1/2 -translate-y-1/2', icon: 'Wrench', label: 'HERRAMIENTAS', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
                { id: 'memory', top: '70%', left: '20%', translate: '-translate-x-1/2 -translate-y-1/2', icon: 'Database', label: 'MEMORIA', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
                { id: 'action', top: '70%', left: '80%', translate: '-translate-x-1/2 -translate-y-1/2', icon: 'Zap', label: 'ACCIÓN', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' }
              ].map((comp) => (
                <div key="{comp.id}" classname="{`absolute" z-20="" transition-all="" duration-700="" transform="" ${visiblecomponents.includes(comp.id)="" ?="" 'opacity-100'="" :="" 'opacity-0'}`}="" style="{{" top:="" comp.top,="" left:="" comp.left,="" transform:="" comp.translate="" }}="" onclick="{()" ==""> setSelectedComponent(comp.id)}
                >
                  <div classname="{`w-20" h-20="" bg-white="" rounded-full="" flex="" flex-col="" items-center="" justify-center="" border-2="" ${comp.border}="" shadow-lg="" cursor-pointer="" hover:-translate-y-1="" hover:shadow-xl="" transition-all="" group`}="">
                    <div classname="{`p-2" rounded-full="" ${comp.bg}="" mb-1="" group-hover:scale-110="" transition-transform`}="">
                      {getIcon(comp.icon)}
                    </div>
                    <span classname="text-[10px] font-bold text-slate-600">{comp.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail Modal/Overlay */}
            {selectedComponent && (
              <div classname="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-slide-up z-30">
                <div classname="flex justify-between items-start mb-2">
                  <h4 classname="text-lg font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    {getIcon(content.components.find((c: any) => c.id === selectedComponent)?.icon)}
                    {content.components.find((c: any) => c.id === selectedComponent)?.name}
                  </h4>
                  <button onclick="{()" ==""> setSelectedComponent(null)} className="p-1 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                    <span classname="sr-only">Cerrar</span>
                    ✕
                  </button>
                </div>
                <p classname="text-slate-600 text-sm mb-4 leading-relaxed">
                  {content.components.find((c: any) => c.id === selectedComponent)?.desc}
                </p>
                <div classname="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 border border-slate-200 shadow-inner">
                  <strong classname="block mb-1 text-slate-800 uppercase text-[10px] tracking-wider">Ejemplos Reales:</strong>
                  {selectedComponent === 'brain' && " GPT-4, Claude 3.5 Sonnet, Gemini 1.5 Pro."}
                  {selectedComponent === 'tools' && " Gmail API, Google Calendar, Slack Webhooks, Salesforce CRM."}
                  {selectedComponent === 'memory' && " Bases de datos vectoriales (Pinecone), Historial de chat (Redis)."}
                  {selectedComponent === 'action' && " Ejecutar pagos (Stripe), Desplegar código (Vercel), Enviar emails."}
                </div>
              </div>
            )}
          </div>
        )}

        {/* COMPARISON TAB */}
        {activeTab === 'comparison' && (
          <div classname="flex flex-col md:flex-row gap-6 h-full items-center justify-center p-2">
            {/* Chatbot Side */}
            <div classname="flex-1 w-full max-w-sm flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 h-72 relative overflow-hidden group hover:border-slate-300 transition-colors">
              <h4 classname="font-bold text-slate-400 uppercase tracking-widest mb-6 absolute top-6">Chatbot (Lineal)</h4>
              
              <div classname="relative flex flex-col items-center gap-6 w-full max-w-[120px] z-10">
                <div classname="w-full bg-white p-2 rounded-lg shadow-sm border border-slate-200 text-center text-xs font-bold text-slate-600 z-10">Input</div>
                <div classname="w-full bg-purple-100 text-purple-700 p-2 rounded-lg shadow-sm border border-purple-200 text-center font-bold z-10">LLM</div>
                <div classname="w-full bg-white p-2 rounded-lg shadow-sm border border-slate-200 text-center text-xs font-bold text-slate-600 z-10">Output</div>
                
                {/* Connecting Line */}
                <div classname="absolute top-0 bottom-0 w-0.5 bg-slate-200 -z-10"></div>
                
                {/* Moving Particle */}
                <div classname="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-lg z-20 animate-flow-down"></div>
              </div>
            </div>

            {/* Agent Side */}
            <div classname="flex-1 w-full max-w-sm flex flex-col items-center justify-center p-6 bg-indigo-50 rounded-2xl border border-indigo-100 h-72 relative overflow-hidden">
              <div classname="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm z-20">NUEVO ESTÁNDAR</div>
              <h4 classname="font-bold text-indigo-600 uppercase tracking-widest mb-6 absolute top-6">Agente (Cíclico)</h4>
              
              <div classname="relative w-56 h-56 flex items-center justify-center mt-6">
                {/* Cyclic Path */}
                <svg classname="absolute inset-0 w-full h-full animate-spin-slow-reverse">
                  <circle cx="50%" cy="50%" r="70" fill="none" stroke="#a5b4fc" strokewidth="2" strokedasharray="6 6"/>
                </svg>

                {/* Orbiting Particles */}
                <div classname="absolute inset-0 animate-spin-slow">
                  <div classname="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2">
                    <div classname="absolute top-[15%] left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/30"></div>
                    <div classname="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/30"></div>
                  </div>
                </div>

                {/* Central Brain */}
                <div classname="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-indigo-100 z-10 relative">
                  <bot classname="w-8 h-8 text-indigo-600"/>
                  <div classname="absolute -bottom-5 text-[9px] font-bold text-indigo-400 uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-indigo-100">Cerebro</div>
                </div>

                {/* Labels */}
                <div classname="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-2 py-0.5 rounded text-[9px] font-bold text-slate-500 border border-slate-100">Planificar</div>
                <div classname="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-2 py-0.5 rounded text-[9px] font-bold text-slate-500 border border-slate-100">Ejecutar</div>
                <div classname="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur px-2 py-0.5 rounded text-[9px] font-bold text-slate-500 border border-slate-100">Herramientas</div>
                <div classname="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur px-2 py-0.5 rounded text-[9px] font-bold text-slate-500 border border-slate-100">Memoria</div>
              </div>
            </div>
          </div>
        )}

        {/* EXERCISE TAB */}
        {activeTab === 'exercise' && (
          <div classname="h-full flex flex-col">
            <div classname="text-center mb-6">
              <h3 classname="text-xl font-bold text-slate-800">Conecta los puntos</h3>
              <p classname="text-slate-500 text-sm">Empareja cada componente con su función correcta.</p>
            </div>

            <div classname="grid grid-cols-2 gap-8 flex-grow">
              {/* Components Column */}
              <div classname="space-y-4">
                {content.components.map((comp: any) => (
                  <div key="{comp.id}" onclick="{()" ==""> handleMatchClick(comp.id, 'component')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                      matches[comp.id] ? 'bg-emerald-50 border-emerald-200 opacity-50' :
                      selectedMatchId === comp.id ? 'bg-indigo-50 border-indigo-500 shadow-md' : 
                      'bg-white border-slate-200 hover:border-indigo-200'
                    }`}
                  >
                    <div classname="{`w-8" h-8="" rounded-full="" flex="" items-center="" justify-center="" ${comp.color}="" bg-opacity-20`}="">
                      {getIcon(comp.icon)}
                    </div>
                    <span classname="font-bold text-sm text-slate-700">{comp.name}</span>
                    {matches[comp.id] && <checkcircle classname="w-4 h-4 text-emerald-500 ml-auto"/>}
                  </div>
                ))}
              </div>

              {/* Descriptions Column */}
              <div classname="space-y-4">
                {[
                  { id: 'desc_brain', text: 'Razona, planifica y toma decisiones.' },
                  { id: 'desc_tools', text: 'Conecta con el mundo exterior (APIs, Webs).' },
                  { id: 'desc_memory', text: 'Mantiene el contexto de conversaciones pasadas.' },
                  { id: 'desc_action', text: 'Ejecuta tareas reales como pagos o envíos.' }
                ].map((desc) => (
                  <div key="{desc.id}" onclick="{()" ==""> handleMatchClick(desc.id, 'description')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-sm flex items-center ${
                      Object.values(matches).includes(desc.id) ? 'bg-emerald-50 border-emerald-200 opacity-50' :
                      'bg-white border-slate-200 hover:border-indigo-200'
                    }`}
                  >
                    {desc.text}
                  </div>
                ))}
              </div>
            </div>

            {isExerciseComplete && (
              <div classname="mt-4 p-4 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center gap-2 animate-bounce">
                <sparkles classname="w-5 h-5"/>
                <strong>¡Correcto!</strong> Has entendido la arquitectura de un agente.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

// --- Prompt Engineering Component ---
const PromptEngineeringSlide = ({ content }: { content: any }) => {
  const [flippedTech, setFlippedTech] = useState<string |="" null="">(null);

  const getIcon = (name: string) => {
    switch(name) {
      case 'Target': return <target classname="w-5 h-5"/>;
      case 'Link': return <link classname="w-5 h-5"/>;
      case 'ListOrdered': return <listordered classname="w-5 h-5"/>;
      case 'Lightbulb': return <lightbulb classname="w-5 h-5"/>;
      default: return <sparkles classname="w-5 h-5"/>;
    }
  };

  return (
    <div classname="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[36rem] md:h-[40rem] animate-fade-in-up">
      <div classname="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow">
        
        {/* Header */}
        <div classname="flex items-center gap-3 mb-6">
          <div classname="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
            <span classname="text-2xl">🗣️</span>
          </div>
          <div>
             <h3 classname="text-2xl font-bold text-slate-800">Prompt Engineering</h3>
             <p classname="text-slate-500 text-sm font-medium">El arte de programar en lenguaje natural</p>
          </div>
        </div>

        {/* Summary & Fact */}
        <div classname="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div classname="md:col-span-2 prose prose-slate text-slate-600 leading-relaxed text-sm md:text-base">
            <p>{content.summary}</p>
          </div>
          <div classname="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-4 flex flex-col justify-center relative overflow-hidden shadow-sm">
             <div classname="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-emerald-200 rounded-full opacity-20 blur-xl"></div>
             <div classname="flex items-center gap-2 mb-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
               <trendingup classname="w-4 h-4"/> Dato Interesante
             </div>
             <p classname="text-emerald-900 font-medium text-sm leading-snug relative z-10">
               {content.fact}
             </p>
          </div>
        </div>

        {/* Techniques Grid */}
        <h4 classname="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
          <sparkles classname="w-4 h-4 text-pink-500"/> 4 Técnicas Avanzadas (Haz click para ver ejemplos)
        </h4>
        
        <div classname="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
          {content.techniques.map((tech: any) => (
            <div key="{tech.id}" classname="relative h-40 cursor-pointer perspective-1000 group" onclick="{()" ==""> setFlippedTech(flippedTech === tech.id ? null : tech.id)}
            >
              <div classname="{`relative" w-full="" h-full="" duration-500="" preserve-3d="" transition-transform="" ${flippedtech="==" tech.id="" ?="" 'rotate-y-180'="" :="" ''}`}="">
                
                {/* Front */}
                <div classname="absolute w-full h-full backface-hidden bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between">
                   <div classname="flex items-start gap-3">
                      <div classname="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                        {getIcon(tech.icon)}
                      </div>
                      <div>
                        <h5 classname="font-bold text-slate-800 text-sm">{tech.name}</h5>
                        <p classname="text-xs text-slate-500 mt-1 line-clamp-3">{tech.desc}</p>
                      </div>
                   </div>
                   <div classname="text-xs text-indigo-500 font-semibold flex items-center gap-1 mt-2 self-end">
                     Ver Ejemplo <arrowright classname="w-3 h-3"/>
                   </div>
                </div>

                {/* Back */}
                <div classname="absolute w-full h-full backface-hidden rotate-y-180 bg-indigo-600 rounded-xl p-4 shadow-lg text-white flex flex-col justify-center">
                   <h5 classname="font-bold text-xs uppercase tracking-wider text-indigo-200 mb-2">Ejemplo:</h5>
                   <p classname="text-sm font-medium leading-relaxed italic">"{tech.example}"</p>
                   <div classname="mt-auto text-xs text-indigo-200 self-end flex items-center gap-1">
                     <arrowleft classname="w-3 h-3"/> Volver
                   </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

// --- Token Predictor Component ---
const TokenPredictor = () => {
  const [step, setStep] = useState(0); // 0: input, 1: calculating, 2: result
  
  const predictions = [
    { word: "herramienta", prob: 85, color: "#10b981" }, // Emerald
    { word: "amenaza", prob: 10, color: "#ef4444" },    // Red
    { word: "moda", prob: 5, color: "#f59e0b" },       // Amber
  ];

  const handlePredict = () => {
    setStep(1);
    setTimeout(() => setStep(2), 1500);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <div classname="bg-slate-900 rounded-xl p-4 md:p-6 text-white shadow-inner border border-slate-700 w-full max-w-md mx-auto mt-4">
      <div classname="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
        <cpu classname="w-4 h-4 text-pink-500"/>
        <span classname="text-xs font-mono text-slate-400 uppercase">Motor de Predicción (LLM)</span>
      </div>

      <div classname="font-mono text-lg md:text-xl mb-6">
        <span classname="text-slate-400">La IA es una... </span>
        {step === 2 && (
          <span classname="text-emerald-400 font-bold animate-fade-in bg-emerald-400/10 px-1 rounded">
            herramienta
          </span>
        )}
        {step === 0 && <span classname="animate-pulse text-slate-600">|</span>}
      </div>

      {step === 1 && (
        <div classname="space-y-3 mb-4 animate-fade-in">
          <p classname="text-xs text-slate-500 mb-2">Calculando probabilidades...</p>
          {predictions.map((p, i) => (
            <div key="{i}" classname="space-y-1">
              <div classname="flex justify-between text-xs">
                <span classname="font-mono text-slate-300">"{p.word}"</span>
                <span classname="text-slate-400">{p.prob}%</span>
              </div>
              <div classname="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div classname="h-full rounded-full transition-all duration-1000 ease-out" style="{{" width:="" `${p.prob}%`,="" backgroundcolor:="" p.color,="" animationdelay:="" `${i="" *="" 100}ms`="" }}=""></div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div classname="mt-4 flex justify-end">
        {step !== 1 && (
          <button onclick="{step" =="=" 2="" ?="" handlereset="" :="" handlepredict}="" classname="{`px-4" py-2="" rounded-lg="" text-sm="" font-bold="" transition-all="" flex="" items-center="" gap-2="" ${="" step="==" 2="" ?="" 'bg-slate-700="" hover:bg-slate-600="" text-white'="" :="" 'bg-pink-600="" hover:bg-pink-500="" text-white="" shadow-lg="" hover:shadow-pink-500="" 25'="" }`}="">
            {step === 2 ? 'Reiniciar' : 'Predecir Siguiente Token'}
            {step === 0 && <sparkles classname="w-4 h-4"/>}
          </button>
        )}
        {step === 1 && (
           <div classname="px-4 py-2 text-sm text-slate-400 flex items-center gap-2">
             <div classname="w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
             Procesando...
           </div>
        )}
      </div>
    </div>
  );
};

interface Day1Props {
  setRoute: (route: AppRoute) => void;
}

const Day1: React.FC<day1props> = ({ setRoute }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
       handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleFinish = () => {
     setShowCTA(true);
  };

  const currentSlide = slides[currentIndex];
  const progress = ((currentIndex + 1) / slides.length) * 100;

  return (
    <layout title="Día 1: La Era Exponencial" onback="{()" ==""> setRoute(AppRoute.HOME)}>
      <ctamodal isopen="{showCTA}" onclose="{()" ==""> setShowCTA(false)}
        title="¡Has visto el futuro!"
        message="La gráfica no miente: estamos ante la mayor oportunidad de inversión y crecimiento de la historia. ¿Estás preparado para surfear esta ola?"
      />

      <script type='text/javascript' nonce='kWsmRNVioUI1/9/HzfhSeA==' src='https://aistudio.google.com/JJPZ7S6q46kgYc2uGTKJmrxCW3ENX63ZbXd2u4o8eCB2VynI7rPJaJcdaiONxM-39QrSEhtOYRVfY6eQbpeyraT-HCQdAx_MvXZWKxn_BsD1oqf2dObzKjuyPVaHq-6woFpu5Ekb3tl0iUMja6n8_8jTn2_1cHQxlUXypgPajtO_qvbo2hJlAoqXorjYBJUpw0Y7jxW2vqb5ImxmyuQ6ZJgcMwzbOm2YfXA6up94f6hl0r8r7_1anUqpIhgGFMIJe2tE1LVRAC8wtO62w-RyT3fgEZIhecdNdvC1pc19Vxb2d_17Np_yTCEYyCnO6vYBDQ6gATPZ9WMaF7iZj96VDfSlRnRZJfOq1kztgVNAUdiYUpx8Vzxs-fA2ANuttzbIsxehTqlQsEURbS-cLdY3KpzpvlvJrOCmJT348HjfMTWVdRek0-u5vvP6tW4UbILMmQlL8h7Lk0DrpoK9-ekr6z9dEj7NvTuM-SBqDUk1TxSoDLTuAKAfePcXeZy2tqtePTNmyoCitbcP67oIvWidABThbcGzJp3xlBerzZbD9ZEnvrnOKPL2QW_b7wF7t0E7gfyNZlvrGssGyV8wmIChYQqqQmvurc2Z6e7PM--V0TjyPjeCRQ'></script><style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      <div classname="flex flex-col items-center justify-center min-h-[70vh] space-y-6 w-full max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div classname="w-full max-w-md bg-slate-200 rounded-full h-2 mb-4">
          <div classname="h-2 rounded-full transition-all duration-500" style="{{" width:="" `${math.min(progress,="" 100)}%`,="" backgroundcolor:="" colors.accent="" }}=""></div>
        </div>

        <div classname="text-center space-y-2 mb-4">
           <h2 classname="text-sm md:text-base text-slate-500 font-semibold uppercase tracking-wider">
             Parte {currentIndex + 1} de {slides.length}
           </h2>
        </div>

        {/* Content Area */}
        <div classname="w-full flex justify-center">
          
          {currentSlide.type === 'flip' ? (
            /* FLIP CARD COMPONENT */
            <div classname="relative w-full max-w-md h-[28rem] md:h-[32rem] cursor-pointer group perspective-1000" onclick="{()" ==""> setIsFlipped(!isFlipped)}
            >
              <div classname="{`relative" w-full="" h-full="" duration-700="" preserve-3d="" transition-transform="" ${isflipped="" ?="" 'rotate-y-180'="" :="" ''}`}="">
                
                {/* Front Side */}
                <div classname="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center border border-slate-100 hover:shadow-2xl transition-shadow">
                  <div classname="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-5xl shadow-inner">
                    {currentSlide.icon}
                  </div>
                  <h3 classname="text-2xl md:text-3xl font-bold mb-6 text-slate-800">
                    {currentSlide.title}
                  </h3>
                  <p classname="text-slate-500 font-medium text-lg italic">
                    {currentSlide.question}
                  </p>
                  <div classname="mt-auto text-xs md:text-sm text-slate-400 font-semibold uppercase tracking-widest flex items-center gap-2 animate-pulse">
                    <info classname="w-4 h-4"/>
                    Haz click para descubrir
                  </div>
                </div>

                {/* Back Side */}
                <div classname="absolute w-full h-full backface-hidden rotate-y-180 rounded-3xl shadow-xl flex flex-col p-8 text-center overflow-hidden" style="{{" backgroundcolor:="" colors.primary="" }}="">
                  <div classname="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl"></div>
                  <div classname="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-pink-500 opacity-10 rounded-full blur-3xl"></div>

                  <h3 classname="text-xl font-bold mb-6 text-white border-b border-white/20 pb-4 relative z-10">
                    {currentSlide.title}
                  </h3>
                  
                  <div classname="text-white/90 text-base md:text-lg leading-relaxed flex-grow text-left overflow-y-auto relative z-10 pr-2 custom-scrollbar">
                    <reactmarkdown components="{{" p:="" ({node,="" ...props})=""> <p classname="mb-4 last:mb-0" {...props}=""/>,
                        strong: ({node, ...props}) => <strong classname="font-bold text-[#FF2878] bg-white/10 px-1 rounded" {...props}=""/>
                      }}
                    >
                      {currentSlide.answer || ""}
                    </ReactMarkdown>
                  </div>

                  <div classname="mt-6 w-full relative z-10">
                     <button onclick="{(e)" ==""> {
                         e.stopPropagation();
                         handleNext();
                       }}
                       className="w-full bg-white text-slate-900 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-50 transition flex items-center justify-center gap-2"
                     >
                       Siguiente <arrowright classname="w-4 h-4"/>
                     </button>
                  </div>
                </div>

              </div>
            </div>
          ) : currentSlide.type === 'prompt_engineering' ? (
            /* PROMPT ENGINEERING COMPONENT */
            <div classname="w-full max-w-4xl flex flex-col">
              <promptengineeringslide content="{currentSlide.content}"/>
              
              <div classname="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center mt-4 rounded-xl shadow-sm">
                 <button onclick="{handlePrev}" classname="text-slate-500 hover:text-slate-800 font-semibold px-4 py-2 rounded-lg hover:bg-slate-200 transition flex items-center gap-2">
                   <arrowleft classname="w-4 h-4"/> Anterior
                 </button>
                 
                 <button onclick="{handleNext}" classname="bg-[#FF2878] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:brightness-110 transition transform hover:scale-105 flex items-center gap-2">
                   Siguiente <arrowright classname="w-4 h-4"/>
                 </button>
              </div>
            </div>
          ) : currentSlide.type === 'ai_agents' ? (
            /* AI AGENTS COMPONENT */
            <div classname="w-full max-w-4xl flex flex-col">
              <aiagentsslide content="{currentSlide.content}"/>
              
              <div classname="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center mt-4 rounded-xl shadow-sm">
                 <button onclick="{handlePrev}" classname="text-slate-500 hover:text-slate-800 font-semibold px-4 py-2 rounded-lg hover:bg-slate-200 transition flex items-center gap-2">
                   <arrowleft classname="w-4 h-4"/> Anterior
                 </button>
                 
                 <button onclick="{handleNext}" classname="bg-[#FF2878] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:brightness-110 transition transform hover:scale-105 flex items-center gap-2">
                   Siguiente <arrowright classname="w-4 h-4"/>
                 </button>
              </div>
            </div>
          ) : currentSlide.type === 'agent_examples' ? (
            /* AGENT EXAMPLES COMPONENT */
            <div classname="w-full max-w-4xl flex flex-col">
              <agentexamplesslide content="{currentSlide.content}"/>
              
              <div classname="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center mt-4 rounded-xl shadow-sm">
                 <button onclick="{handlePrev}" classname="text-slate-500 hover:text-slate-800 font-semibold px-4 py-2 rounded-lg hover:bg-slate-200 transition flex items-center gap-2">
                   <arrowleft classname="w-4 h-4"/> Anterior
                 </button>
                 
                 <button onclick="{handleFinish}" classname="bg-[#FF2878] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:brightness-110 transition transform hover:scale-105 flex items-center gap-2">
                   Finalizar <checkcircle classname="w-4 h-4"/>
                 </button>
              </div>
            </div>
          ) : currentSlide.type === 'interactive_text' ? (
            /* INTERACTIVE TEXT COMPONENT */
            <div classname="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col animate-fade-in-up">
              <div classname="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
                
                {/* Text Content */}
                <div classname="flex-1">
                  <div classname="flex items-center gap-3 mb-4">
                    <div classname="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                      <brain classname="w-6 h-6"/>
                    </div>
                    <h3 classname="text-2xl font-bold text-slate-800">{currentSlide.title}</h3>
                  </div>

                  <div classname="prose prose-slate text-slate-600 leading-relaxed">
                    <reactmarkdown components="{{" strong:="" ({node,="" ...props})=""> <strong classname="font-bold text-[#243F4C] bg-blue-50 px-1 rounded" {...props}=""/>
                      }}
                    >
                      {currentSlide.content || ""}
                    </ReactMarkdown>
                  </div>

                  <div classname="mt-6 flex gap-2">
                    <div classname="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500">ChatGPT</div>
                    <div classname="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500">Claude</div>
                    <div classname="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500">Gemini</div>
                    <div classname="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500">Grok</div>
                  </div>
                </div>

                {/* Interactive Widget */}
                <div classname="w-full md:w-1/2 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  {currentSlide.interactiveElement === 'token_predictor' && <tokenpredictor/>}
                  
                  <div classname="mt-4 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
                    <alerttriangle classname="w-4 h-4 flex-shrink-0 mt-0.5"/>
                    <p>
                      <strong>Riesgo:</strong> Al ser una "caja negra", puede inventar datos (alucinaciones) si no le das el contexto adecuado.
                    </p>
                  </div>
                </div>

              </div>

              <div classname="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center mt-auto">
                 <button onclick="{handlePrev}" classname="text-slate-500 hover:text-slate-800 font-semibold px-4 py-2 rounded-lg hover:bg-slate-200 transition flex items-center gap-2">
                   <arrowleft classname="w-4 h-4"/> Anterior
                 </button>
                 
                 <button onclick="{handleNext}" classname="bg-[#FF2878] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:brightness-110 transition transform hover:scale-105 flex items-center gap-2">
                   Siguiente <arrowright classname="w-4 h-4"/>
                 </button>
              </div>
            </div>
          ) : (
            /* CHART COMPONENT */
            <div classname="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[32rem] md:h-[36rem] animate-fade-in-up">
              <div classname="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div>
                  <h3 classname="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
                    {currentSlide.icon} {currentSlide.title}
                  </h3>
                  <p classname="text-slate-500 text-sm md:text-base mt-1">
                    {currentSlide.description}
                  </p>
                </div>
                <div classname="hidden md:block text-xs font-mono bg-slate-200 px-2 py-1 rounded text-slate-600">
                  Source: ARK Investment Management LLC, 2024
                </div>
              </div>

              <div classname="flex-grow p-2 md:p-6 relative">
                <responsivecontainer width="100%" height="100%">
                  <linechart data="{chartData}" margin="{{" top:="" 20,="" right:="" 30,="" left:="" 0,="" bottom:="" 0="" }}="">
                    <cartesiangrid strokedasharray="3 3" vertical="{false}" stroke="#e2e8f0"/>
                    <xaxis datakey="year" tick="{{fill:" '#64748b',="" fontsize:="" 12}}="" axisline="{false}" tickline="{false}" mintickgap="{30}"/>
                    <yaxis tick="{{fill:" '#64748b',="" fontsize:="" 12}}="" axisline="{false}" tickline="{false}" tickformatter="{(value)" ==""> `${value}%`}
                      domain={[0, 9]}
                    />
                    <tooltip contentstyle="{{" borderradius:="" '12px',="" border:="" 'none',="" boxshadow:="" '0="" 10px="" 15px="" -3px="" rgba(0,="" 0,="" 0,="" 0.1)'="" }}="" itemstyle="{{" fontsize:="" '12px',="" padding:="" 0="" }}="" labelstyle="{{" fontweight:="" 'bold',="" color:="" '#1e293b',="" marginbottom:="" '8px'="" }}=""/>
                    <legend wrapperstyle="{{" paddingtop:="" '20px'="" }}=""/>
                    
                    {/* Historical Waves */}
                    <line type="monotone" datakey="Railroad" stroke="#64748b" strokewidth="{2}" dot="{false}" activedot="{{" r:="" 6="" }}="" opacity="{0.5}"/>
                    <line type="monotone" datakey="Cars" stroke="#ef4444" strokewidth="{2}" dot="{false}" activedot="{{" r:="" 6="" }}="" opacity="{0.6}"/>
                    <line type="monotone" datakey="Computers" stroke="#eab308" strokewidth="{2}" dot="{false}" activedot="{{" r:="" 6="" }}="" opacity="{0.7}"/>
                    
                    {/* The Big Wave */}
                    <line type="monotone" datakey="AI" name="AI Software" stroke="#6366f1" strokewidth="{4}" dot="{false}" activedot="{{" r:="" 8,="" strokewidth:="" 0="" }}="" animationduration="{2000}"/>
                  </LineChart>
                </ResponsiveContainer>
                
                {/* Annotation Overlay */}
                <div classname="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 animate-fade-in delay-1000">
                  {/* Optional: Add floating labels if needed, but Legend handles it well */}
                </div>
              </div>

              <div classname="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                 <button onclick="{handlePrev}" classname="text-slate-500 hover:text-slate-800 font-semibold px-4 py-2 rounded-lg hover:bg-slate-200 transition flex items-center gap-2">
                   <arrowleft classname="w-4 h-4"/> Anterior
                 </button>
                 
                 <button onclick="{handleNext}" classname="bg-[#FF2878] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:brightness-110 transition transform hover:scale-105 flex items-center gap-2">
                   Siguiente <arrowright classname="w-4 h-4"/>
                 </button>
              </div>
            </div>
          )}

        </div>

        {/* Navigation Controls (Only for Flip Card state to go back) */}
        {currentSlide.type === 'flip' && (
          <div classname="flex justify-between w-full max-w-md px-4">
            <button onclick="{handlePrev}" disabled="{currentIndex" =="=" 0}="" classname="text-slate-400 hover:text-slate-600 font-semibold disabled:opacity-0 transition px-2 py-1 flex items-center gap-1">
              <arrowleft classname="w-4 h-4"/> Anterior
            </button>
            <div classname="w-8"></div> {/* Spacer */}
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Day1;