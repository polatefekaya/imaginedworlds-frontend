'use client';

import { useEffect, useRef } from 'react';
import { useSimulationStore } from '@/store/simulationStore';
import { initializeCanvas, drawPatches, CANVAS_WIDTH, CANVAS_HEIGHT, drawPatch } from '@/lib/renderer';
import { signalRService } from '@/lib/signalrService';
import { CommentedTilePatchResponse } from '@/types/simulation';

export function CityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const status = useSimulationStore((state) => state.status);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const connection = signalRService.getConnection(); 
    if (connection) {
      const handler = (patch: CommentedTilePatchResponse) => {
        drawPatch(context, patch);
      };
      connection.on("WorldUpdatedPiece", handler);
    
      return () => {
        connection.off("WorldUpdatedPiece", handler);
      };
    }
  }, []);

  useEffect(() => {
    if (status === 'generating') {
      const canvas = canvasRef.current;
      if (canvas?.getContext('2d')) {
        initializeCanvas(canvas.getContext('2d')!);
      }
    }
  }, [status]);
  

  return (
    <div className="bg-gray-900 absolute inset-0 flex h-full w-full items-center justify-center">
      <div className="bg-white rounded-2xl border border-slate-200 p-2">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH/1.25}
          height={CANVAS_HEIGHT/1.25}
          className="rounded-xl"
        />
      </div>
    </div>
  );
}
