import { useEffect } from 'react';
import { signalRService } from '@/lib/signalrService';

export function useSignalR() {
  useEffect(() => {
    signalRService.start();

    return () => {
      signalRService.stop();
    };
  }, []); 
}
