import { BrainCircuit, Bot, Palette } from 'lucide-react';
import { InfoCard } from './InfoCard';

export function InfoPanelContent() {
  return (
    // Make this the main flex container, filling the panel's height
    <div className="flex h-full flex-col">
      
      {/* --- TOP STICKY SECTION --- */}
      {/* This part will not shrink and will stay at the top */}
      <div className="flex-shrink-0">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900">Imagined Worlds</h2>
          <p className="text-slate-600 mt-1 text-md">Create your dream world with timelapse and of course, with AI.</p>
        </div>
        <div className="flex items-start gap-4 mb-8">
          <div>
            <h3 className="font-semibold text-md text-slate-800">Concept</h3>
            <p className="mt-1 text-slate-600 text-sm">
              Translate a user's written dream into a living, visual world. This project uses a powerful AI to act as a creative director, making intelligent decisions to generate a city from scratch.
            </p>
          </div>
        </div>
      </div>

      {/* --- MIDDLE SCROLLABLE SECTION --- */}
      {/* flex-1 makes it take all available space. overflow-y-auto makes it scroll. */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        <InfoCard title='Step 1: Architecting' text="When you provide a prompt, it's sent to a large language model (Google's Gemini). The AI analyzes your creative intent and generates a high-level, multi-stage construction plan for the world." IconComponent={BrainCircuit}/>
        <InfoCard title='Step 2: Execution Engine' text="Our .NET backend takes the AI's grand plan. Specialized, procedural agents then execute each stage of the plan, running a high-speed simulation to build the entire world in the background." IconComponent={Bot}/>
        <InfoCard title='Step 3: Live Canvas' text="As the engine builds the world, every single change is pushed to your browser in real-time using SignalR. The React frontend then paints these changes, allowing you to watch the creation as a smooth timelapse." IconComponent={Palette}/>
        {/* I removed the duplicate InfoCard, assuming it was a copy-paste error */}
      </div>

      {/* --- BOTTOM STICKY SECTION --- */}
      {/* This part will not shrink and will stay at the bottom */}
      <div className="flex-shrink-0 pt-6">
        <div className="flex items-start gap-4">
          <div>
            <h3 className="font-medium text-slate-500 text-sm">Tech Stack</h3>
            <p className="mt-1 text-slate-400 text-xs">
              Next.js, TypeScript, Tailwind CSS, Zustand, .NET 9, SignalR, and the Google Gemini API.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
    