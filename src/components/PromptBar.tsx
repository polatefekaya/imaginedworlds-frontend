"use client";

import { Wand2, Loader2, X, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useSimulationStore } from "@/store/simulationStore";
import { mockSimulationService } from "@/lib/mockSimulator";
import { apiService } from "@/services/apiService";

export function PromptBar() {
  const [prompt, setPrompt] = useState("");
  const { status, isConnected, reset, errorMessage } = useSimulationStore();
  const isGenerating = status === "generating";
  const isError = status === "error";

  const handleGenerate = async () => {
    if (!prompt || isGenerating || !isConnected) return;

    reset(); // Clear previous state

    const success = await apiService.startGeneration(prompt);
    if (!success) {
      // Handle API call failure (e.g., show an error toast)
      console.error("Failed to start generation via API.");
    }
    // Now we just wait for SignalR events to update the UI.
  };

  if (isError) {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-4 rounded-lg bg-red-100 border border-red-400 p-4 shadow-xl">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <div className="flex flex-col">
            <span className="font-bold text-red-800">Generation Failed</span>
            <span className="text-sm text-red-700">{errorMessage}</span>
          </div>
          <button
            onClick={reset}
            className="ml-4 text-sm font-semibold text-red-800 hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
      <div className="flex items-center gap-2 rounded-3xl bg-white p-1 backdrop-blur-lg border border-slate-300">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isGenerating || !isConnected}
          placeholder={
            isConnected ? "Imagine a world..." : "Connecting to server..."
          }
          className="w-80 bg-transparent px-4 text-lg text-slate-900 placeholder-slate-600 focus:outline-none"
        />

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !isConnected || !prompt}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 disabled:scale-100 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 />}
        </button>
      </div>
    </div>
  );
}
