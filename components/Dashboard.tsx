
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { EcosystemTarget, EcosystemStats } from '../types';

const MOCK_STATS: EcosystemStats[] = [
  { target: EcosystemTarget.MANGROVES, healthIndex: 0.82, trend: 'improving', coverageKm2: 450 },
  { target: EcosystemTarget.CORAL_REEFS, healthIndex: 0.45, trend: 'declining', coverageKm2: 210 },
  { target: EcosystemTarget.SEAGRASS, healthIndex: 0.67, trend: 'stable', coverageKm2: 180 },
  { target: EcosystemTarget.SHORELINE, healthIndex: 0.55, trend: 'stable', coverageKm2: 600 }
];

const TIME_DATA = [
  { month: 'Jan', ndvi: 0.65, mndwi: 0.2 },
  { month: 'Feb', ndvi: 0.68, mndwi: 0.22 },
  { month: 'Mar', ndvi: 0.72, mndwi: 0.25 },
  { month: 'Apr', ndvi: 0.60, mndwi: 0.35 },
  { month: 'May', ndvi: 0.55, mndwi: 0.45 },
  { month: 'Jun', ndvi: 0.58, mndwi: 0.40 },
  { month: 'Jul', ndvi: 0.62, mndwi: 0.30 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="w-full h-1/3 bg-slate-900 border-t border-slate-800 p-4 grid grid-cols-4 gap-4 overflow-hidden">
      {/* Ecosystem Health Cards */}
      <div className="col-span-1 space-y-3 overflow-y-auto">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Health Overview</h3>
        {MOCK_STATS.map((stat) => (
          <div key={stat.target} className="bg-slate-800/50 p-2 rounded border border-slate-700/50">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-medium text-slate-400">{stat.target}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                stat.trend === 'improving' ? 'bg-emerald-500/10 text-emerald-400' : 
                stat.trend === 'declining' ? 'bg-rose-500/10 text-rose-400' : 
                'bg-blue-500/10 text-blue-400'
              }`}>
                {stat.trend}
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-lg font-bold">{(stat.healthIndex * 100).toFixed(0)}%</span>
              <span className="text-[10px] text-slate-500 pb-1">{stat.coverageKm2} km²</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="col-span-3 grid grid-cols-2 gap-4">
        <div className="bg-slate-800/20 p-3 rounded-lg border border-slate-700/50 flex flex-col">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-wider">Historical Indicator Variance (Sentinel-2)</h4>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TIME_DATA}>
                <defs>
                  <linearGradient id="colorNdvi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" fontSize={10} stroke="#94a3b8" />
                <YAxis fontSize={10} stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="ndvi" stroke="#10b981" fillOpacity={1} fill="url(#colorNdvi)" />
                <Area type="monotone" dataKey="mndwi" stroke="#3b82f6" fillOpacity={0.1} fill="#3b82f6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/20 p-3 rounded-lg border border-slate-700/50 flex flex-col">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-wider">Ecosystem Coverage Density</h4>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_STATS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="target" fontSize={8} stroke="#94a3b8" />
                <YAxis fontSize={10} stroke="#94a3b8" />
                <Tooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: '10px' }}
                />
                <Bar dataKey="coverageKm2" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
