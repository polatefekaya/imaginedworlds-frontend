'use client';

import { useEffect, useRef } from 'react';
import { useSimulationStore } from '@/store/simulationStore';
import { initializeCanvas, drawPatches, CANVAS_WIDTH, CANVAS_HEIGHT, drawPatch } from '@/lib/renderer';
import { signalRService } from '@/lib/signalrService';
import { CommentedTilePatchResponse } from '@/types/simulation';

export function CityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isConnected = useSimulationStore((state) => state.isConnected);
  const status = useSimulationStore((state) => state.status);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isConnected) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const connection = signalRService.getConnection(); 
    if (connection) {
      const handler = (patch: CommentedTilePatchResponse) => {
        console.log(`drawing x: ${patch.x}, y: ${patch.y}, tileType: ${patch.tileType}`)
        drawPatch(context, patch);
      };
      connection.on("WorldUpdatedPiece", handler);
    
      return () => {
        connection.off("WorldUpdatedPiece", handler);
      };
    }
  }, [isConnected]);

  useEffect(() => {
    if (status === 'generating') {
      const canvas = canvasRef.current;
      if (canvas?.getContext('2d')) {
        initializeCanvas(canvas.getContext('2d')!);
      }
    }
  }, [status]);
  

  return (
    <div className="bg-gray-100 absolute inset-0 flex h-full w-full items-center justify-center">
      <div className="bg-white rounded-2xl border border-slate-200 p-2">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="rounded-xl w-[70vmin] h-[70vmin]"
        />
      </div>
    </div>
  );
}
