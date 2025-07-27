"use client";

import { CityCanvas } from "@/components/CityCanvas";
import { InfoPanelContent } from "@/components/panels/InfoPanelContent";
import { PlanPanelContent } from "@/components/panels/PlanPanelContent";
import { PromptBar } from "@/components/PromptBar";
import { Panel } from "@/components/ui/Panel";
import { PanelToggleButton } from "@/components/ui/PanelToggleButton";
import { useSimulationStore } from "@/store/simulationStore";

export default function Home() {
  const { 
    isInfoPanelOpen, 
    isPlanPanelOpen, 
    toggleInfoPanel, 
    togglePlanPanel 
  } = useSimulationStore();
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <CityCanvas />

      {!isInfoPanelOpen && <PanelToggleButton side="left" onClick={toggleInfoPanel} />}
      {!isPlanPanelOpen && <PanelToggleButton side="right" onClick={togglePlanPanel} />}
      
      <Panel side="left" isOpen={isInfoPanelOpen} onClose={toggleInfoPanel}>
        <InfoPanelContent />
      </Panel>
      
      <Panel side="right" isOpen={isPlanPanelOpen} onClose={togglePlanPanel}>
        <PlanPanelContent />
      </Panel>

      <PromptBar />
    </div>
  );
}
