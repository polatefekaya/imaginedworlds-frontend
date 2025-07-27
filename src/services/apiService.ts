import { signalRService } from "@/lib/signalrService";

export const apiService = {
  startGeneration: async (prompt: string): Promise<boolean> => {
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://localhost:7236";
      
      const connectionId = signalRService.getConnectionId();
      if (!connectionId) {
        console.error(
          "FATAL: SignalR is not connected. Cannot start generation."
        );
        return false;
      }

      const response = await fetch(`${apiUrl}/api/creation/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
        userPrompt: prompt,
        connectionId: connectionId 
      }),
      });
      return response.ok;
    } catch (error) {
      console.error("Error starting generation:", error);
      return false;
    }
  },
};
