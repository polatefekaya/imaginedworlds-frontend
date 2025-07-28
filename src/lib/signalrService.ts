import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useSimulationStore } from '@/store/simulationStore';
import { TilePatch, PlanStage, ConstructionPlanResponse, FocusResponse, CommentedTilePatchResponse, FlatCommentedTilePatchResponse } from '@/types/simulation';
import { TileType, toTileType } from '@/types/tiles';

class SignalRService {
  private connection: HubConnection | null = null;
  public getConnectionId = (): string | null => this.connection?.connectionId || null;
  public getConnection = (): HubConnection | null => this.connection;

  public async start() {
    if (this.connection?.state === 'Connected') return;

    const hubUrl = process.env.NEXT_PUBLIC_API_URL + "/imaginedWorldsHub" || "https://localhost:7236/imaginedWorldsHub";
    
    this.connection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        //skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
      
    this.registerEventHandlers();

    try {
      useSimulationStore.getState().startConnecting();
      await this.connection.start();
      useSimulationStore.getState().setConnectionStatus(true);
    } catch (err) {
      console.error("SignalR Connection Error: ", err);
      useSimulationStore.getState().setConnectionStatus(false);
    }
  }

  private registerEventHandlers() {
    if (!this.connection) return;

    this.connection.on("SimulationStarted", () => {
      console.log("SimulationStarted received");
      useSimulationStore.getState().handleSimulationStarted();
    });

    this.connection.on("PlanCreated", (plan: ConstructionPlanResponse) => {
      console.log("PlanCreated received");
      useSimulationStore.getState().handlePlanCreated(plan);
    });
    
    this.connection.on("StageStarted", (stage: PlanStage) => {
      console.log("StageStarted received");
      useSimulationStore.getState().handleStageStarted(stage);
    });

    this.connection.on("FocusChanged", (focus: FocusResponse) => {
      console.log("AI focus changed to:", focus);
      useSimulationStore.getState().handleFocusChanged(focus);
    });
    
    this.connection.on("WorldUpdatedPiece", (patch: FlatCommentedTilePatchResponse) => {
      console.log("WorldUpdatedPiece received");

      const resp:CommentedTilePatchResponse = {x: patch.x, y: patch.y, comment: patch.comment, tileType: toTileType(patch.tileType) as TileType}
      useSimulationStore.getState().applyPatch(resp);
    });

    this.connection.on("SimulationEnded", () => {
      console.log("SimulationEnded received");
      useSimulationStore.getState().handleSimulationEnded();
    });
    
    this.connection.onclose(() => {
        useSimulationStore.getState().setConnectionStatus(false);
    });

    this.connection.on("GenerationFailed", (errorMessage: string) => {
      console.log("GenerationFailed received");
        useSimulationStore.getState().handleGenerationFailed(errorMessage);
    });
  }

  public async stop() {
    if (!this.connection) return;

    // 1. Unregister all event handlers to release them from memory.
    this.connection.off("SimulationStarted");
    this.connection.off("PlanCreated");
    this.connection.off("StageStarted");
    this.connection.off("FocusChanged");
    this.connection.off("WorldUpdatedPiece");
    this.connection.off("SimulationEnded");
    this.connection.off("GenerationFailed");
    
    // 2. Stop the connection.
    try {
      await this.connection.stop();
      console.log("SignalR Disconnected.");
    } catch (err) {
      console.error("Error stopping SignalR connection: ", err);
    } finally {
      this.connection = null;
      useSimulationStore.getState().setConnectionStatus(false);
    }
  }
}


export const signalRService = new SignalRService();
