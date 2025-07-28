'use client';

import { useEffect, useState } from 'react';
import { useSimulationStore } from '@/store/simulationStore';
import { Agent } from '@/types/simulation';
import { Wand2, Loader2, XCircle, ChevronUp, Check, AlertTriangle } from 'lucide-react';
import { apiService } from '@/services/apiService';

export function PromptBar() {
  const [prompt, setPrompt] = useState('');
  const [isAgentSelectorOpen, setAgentSelectorOpen] = useState(false);

  const {
    status,
    agents,
    selectedAgentCodeName,
    errorMessage,
    fetchAgents,
    selectAgent,
    startGeneration,
    startCancelling,
    reset,
    resetWithoutGridReset,
  } = useSimulationStore();

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const handleGenerate = () => startGeneration(prompt);
  const handleCancel = () => {
    startCancelling();
    apiService.cancelGeneration();
    resetWithoutGridReset();
  };

  let selectedAgent: Agent | undefined = undefined;

  if(agents){
    selectedAgent = agents.find(a => a.codeName === selectedAgentCodeName);
  }
  useEffect(() => {
  }, [selectedAgentCodeName]);

  const isInteractive = status === 'idle' || status === 'ready';
  const isWorking = status === 'generating' || status === 'cancelling';

  if (status === 'error') {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-4 rounded-lg bg-red-100 border border-red-400 p-4 shadow-xl">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <div className="flex flex-col">
            <span className="font-bold text-red-800">An Error Occurred</span>
            <span className="text-sm text-red-700">{errorMessage}</span>
          </div>
          <button onClick={reset} className="ml-4 text-sm font-semibold text-red-800 hover:underline">
            Reset
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
      
      {isInteractive && isAgentSelectorOpen && (
        <div className="absolute bottom-full mb-3 w-full rounded-xl bg-white/90 p-2 shadow-2xl backdrop-blur-lg border border-slate-200/80">
          <div className="flex flex-col gap-1">
            {agents.map((agent) => (
              <button
                key={agent.codeName}
                onClick={() => {
                  selectAgent(agent.codeName);
                  setAgentSelectorOpen(false);
                }}
                className="flex items-center w-full gap-3 p-3 text-left rounded-lg hover:bg-slate-200/70"
              >
                <img src={agent.iconUrl} alt={agent.displayName} className="w-6 h-6"/>
                <span className="flex-grow font-semibold text-slate-700">{agent.displayName}</span>
                {agent.codeName === selectedAgentCodeName && <Check className="w-5 h-5 text-sky-600" />}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 rounded-full bg-white/70 p-2 shadow-xl backdrop-blur-lg border border-slate-200/80">
        
        <button 
          onClick={() => setAgentSelectorOpen(!isAgentSelectorOpen)}
          disabled={!isInteractive}
          className="flex items-center gap-2 p-3 rounded-full hover:bg-slate-200/70 disabled:cursor-not-allowed"
        >
          {selectedAgent ? (
            <img src={selectedAgent.iconUrl} alt={selectedAgent.displayName} className="w-7 h-7"/>
          ) : (
            <div className="w-7 h-7 rounded-full bg-slate-300 animate-pulse"/>
          )}
          <ChevronUp className={`w-5 h-5 text-slate-500 transition-transform ${isAgentSelectorOpen ? 'rotate-180' : ''}`} />
        </button>

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={!isInteractive || !selectedAgentCodeName}
          placeholder={status === 'fetching_agents' ? "Loading agents..." : selectedAgentCodeName ? "Imagine a world..." : "Select an agent to begin"}
          className="w-80 bg-transparent px-4 text-lg placeholder-slate-400 focus:outline-none"
        />

        {isWorking ? (
          <button 
            onClick={handleCancel}
            disabled={status === 'cancelling'}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-all disabled:bg-red-400"
          >
            {status === 'cancelling' ? <Loader2 className="h-6 w-6 animate-spin"/> : <XCircle className="h-6 w-6" />}
          </button>
        ) : (
          <button 
            onClick={handleGenerate}
            disabled={!prompt || !selectedAgentCodeName}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white transition-all duration-150 ease-in-out hover:scale-105 active:scale-95 disabled:bg-slate-400 disabled:scale-100 disabled:cursor-not-allowed"
          >
            <Wand2 className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}