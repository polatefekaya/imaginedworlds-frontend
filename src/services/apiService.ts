import { signalRService } from '@/lib/signalrService';
import { Agent } from '@/types/simulation';

type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7236";
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
    throw new Error(errorBody.message || `HTTP error! status: ${response.status}`);
  }

  return response;
}

export const apiService = {
  fetchAgents: async (): Promise<ApiResponse<Agent[]>> => {
    try {
      const response = await apiFetch('/api/agents', { method: 'GET' });
      const data: Agent[] = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Error fetching agents:", error);
      return { success: false, error: (error as Error).message };
    }
  },

  startGeneration: async (prompt: string, agentCodeName: string): Promise<ApiResponse<boolean>> => {
    try {
      const connectionId = signalRService.getConnectionId();
      if (!connectionId) {
        throw new Error("FATAL: SignalR is not connected. Cannot start generation.");
      }

      const response = await apiFetch('/api/creation/start', {
        method: 'POST',
        body: JSON.stringify({
          userPrompt: prompt,
          agentCodeName: agentCodeName,
          connectionId: connectionId
        }),
      });

      const data = await response.json();

      return { success: true, data };
    } catch (error) {
      console.error("Error starting generation:", error);
      return { success: false, error: (error as Error).message };
    }
  },
  cancelGeneration: async (): Promise<ApiResponse<boolean>> => {
    try {
      const connectionId = signalRService.getConnectionId();
      if (!connectionId) throw new Error("SignalR is not connected.");

      const response = await apiFetch('/api/creation/cancel', {
        method: 'POST',
        body: JSON.stringify({ connectionId }),
      });
      return { success: true, data: true };
    } catch (error) {
      console.error("Error cancelling generation:", error);
      return { success: false, error: (error as Error).message };
    }
  },
};