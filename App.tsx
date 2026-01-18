
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Dashboard from './components/Dashboard';
import { EcosystemTarget, SpectralIndex } from './types';

const App: React.FC = () => {
  const [activeTarget, setActiveTarget] = useState<EcosystemTarget | null>(null);
  const [activeIndex, setActiveIndex] = useState<SpectralIndex | null>(null);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-900 text-slate-100 font-sans">
      {/* Sidebar - Controls and AI Agent */}
      <Sidebar 
        onTargetChange={setActiveTarget}
        onIndexChange={setActiveIndex}
        activeTarget={activeTarget}
        activeIndex={activeIndex}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header Overlay */}
        <header className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-900/90 to-transparent p-6 z-10 pointer-events-none">
          <div className="flex justify-between items-center pointer-events-auto">
            <div>
              <h1 className="text-xl font-bold tracking-tight">Kenyan Coastal Ecosystem Dashboard</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                GEE Tier 1 Pipeline Active | Sentinel-2 L2A
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Active Target</span>
                <span className="text-sm text-blue-400 font-semibold">{activeTarget || 'Global Coastline'}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Spectral View</span>
                <span className="text-sm text-emerald-400 font-semibold">{activeIndex || 'True Color Composite'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Map Visualization */}
        <div className="flex-1">
          <Map activeTarget={activeTarget} activeIndex={activeIndex} />
        </div>

        {/* Analytical Dashboard */}
        <Dashboard />

        {/* Bottom Status Bar */}
        <footer className="h-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-4">
          <div className="flex gap-4 items-center">
            <span className="text-[9px] text-slate-500 font-mono uppercase">EPSG:4326</span>
            <span className="text-[9px] text-slate-500 font-mono uppercase">Resolution: 10m/pixel</span>
          </div>
          <div className="text-[9px] text-slate-600 font-mono">
            V1.0.4-BETA // DATA SOURCE: COPERNICUS_S2_SR_HARMONIZED
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
