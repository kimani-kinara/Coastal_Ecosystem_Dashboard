
import React, { useState } from 'react';
import { EcosystemTarget, SpectralIndex } from '../types';
import { getGisGuidance } from '../services/geminiService';

interface SidebarProps {
  onTargetChange: (target: EcosystemTarget | null) => void;
  onIndexChange: (index: SpectralIndex | null) => void;
  activeTarget: EcosystemTarget | null;
  activeIndex: SpectralIndex | null;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onTargetChange, 
  onIndexChange, 
  activeTarget, 
  activeIndex 
}) => {
  const [query, setQuery] = useState('');
  const [guidance, setGuidance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAskGis = async () => {
    if (!query) return;
    setLoading(true);
    const res = await getGisGuidance(query);
    setGuidance(res || null);
    setLoading(false);
  };

  return (
    <div className="w-80 h-full bg-slate-800 border-r border-slate-700 flex flex-col p-4 overflow-y-auto z-10">
      <div className="mb-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          GOD OF GIS
        </h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Lead Architect Panel</p>
      </div>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-tighter">Monitoring Targets</h2>
        <div className="space-y-2">
          {Object.values(EcosystemTarget).map((target) => (
            <button
              key={target}
              onClick={() => onTargetChange(activeTarget === target ? null : target)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-all border ${
                activeTarget === target 
                  ? 'bg-blue-600 border-blue-400 text-white' 
                  : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {target}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-tighter">Spectral Indicators (GEE)</h2>
        <div className="flex gap-2 flex-wrap">
          {Object.values(SpectralIndex).map((idx) => (
            <button
              key={idx}
              onClick={() => onIndexChange(activeIndex === idx ? null : idx)}
              className={`px-3 py-1 rounded-full text-xs transition-all border ${
                activeIndex === idx 
                  ? 'bg-emerald-600 border-emerald-400 text-white' 
                  : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {idx}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-auto border-t border-slate-700 pt-6">
        <h2 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-tighter">Architect Query</h2>
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about spatial topology, projections, or indicators..."
            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px]"
          />
          <button 
            onClick={handleAskGis}
            disabled={loading}
            className="mt-2 w-full py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-xs font-medium disabled:opacity-50"
          >
            {loading ? 'Consulting Docs...' : 'Query God of GIS'}
          </button>
        </div>
        
        {guidance && (
          <div className="mt-4 p-3 bg-slate-900/50 border border-slate-700 rounded text-[11px] leading-relaxed text-slate-300 animate-in fade-in duration-500">
            <p className="font-bold text-blue-400 mb-1">Architect Guidance:</p>
            {guidance}
          </div>
        )}
      </section>
    </div>
  );
};

export default Sidebar;
