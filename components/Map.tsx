
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap, Rectangle } from 'react-leaflet';
import { KENYA_COAST_BOUNDS, REGIONS, ECOSYSTEM_COLORS } from '../constants';
import { EcosystemTarget, SpectralIndex } from '../types';

interface MapProps {
  activeTarget: EcosystemTarget | null;
  activeIndex: SpectralIndex | null;
}

// Helper to center map
const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const Map: React.FC<MapProps> = ({ activeTarget, activeIndex }) => {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  // Mock spatial data for targets
  const getMockFeatures = (target: EcosystemTarget | null) => {
    if (!target) return [];
    // Just simulating some hotspots along the coast
    return REGIONS.map((r, i) => ({
      id: i,
      name: `${target} at ${r.name}`,
      coords: [r.coords[0] + (Math.random() - 0.5) * 0.1, r.coords[1] + (Math.random() - 0.5) * 0.1] as [number, number],
      intensity: 0.5 + Math.random() * 0.5
    }));
  };

  const features = getMockFeatures(activeTarget);

  return (
    <div className="flex-1 relative">
      <MapContainer
        center={REGIONS[0].coords}
        zoom={REGIONS[0].zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Region selector overlays */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
          {REGIONS.map((region) => (
            <button
              key={region.name}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded bg-slate-800 border text-xs font-semibold shadow-xl transition-all ${
                selectedRegion.name === region.name ? 'border-blue-500 text-blue-400' : 'border-slate-700 text-slate-400'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        <ChangeView center={selectedRegion.coords} zoom={selectedRegion.zoom} />

        {/* Visualization of the Kenyan Coast ROI */}
        <Rectangle 
          bounds={KENYA_COAST_BOUNDS} 
          pathOptions={{ color: 'white', weight: 1, fillOpacity: 0.02, dashArray: '5, 5' }}
        />

        {/* Dynamic Targets */}
        {features.map((f) => (
          <Circle
            key={f.id}
            center={f.coords}
            radius={activeTarget === EcosystemTarget.SHORELINE ? 1500 : 800}
            pathOptions={{
              color: activeTarget ? ECOSYSTEM_COLORS[activeTarget] : 'white',
              fillColor: activeTarget ? ECOSYSTEM_COLORS[activeTarget] : 'white',
              fillOpacity: f.intensity,
              weight: 1
            }}
          >
            <Popup className="bg-slate-900 border-none">
              <div className="p-2 text-slate-900">
                <h3 className="font-bold text-sm">{f.name}</h3>
                <p className="text-xs">Processing Node: GEE Tier 1</p>
                <p className="text-xs">Spectral Fidelity: {Math.round(f.intensity * 100)}%</p>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Active Index Indicator Layer (Simulated Raster Overlay) */}
        {activeIndex && (
           <Rectangle
            bounds={[
              [selectedRegion.coords[0] - 0.05, selectedRegion.coords[1] - 0.05],
              [selectedRegion.coords[0] + 0.05, selectedRegion.coords[1] + 0.05]
            ]}
            pathOptions={{
              color: activeIndex === SpectralIndex.NDVI ? '#10b981' : activeIndex === SpectralIndex.MNDWI ? '#3b82f6' : '#f59e0b',
              fillOpacity: 0.2,
              weight: 0
            }}
          />
        )}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-8 right-8 z-[1000] bg-slate-900/80 backdrop-blur border border-slate-700 p-4 rounded-lg shadow-2xl">
        <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Spatial Legend</h4>
        <div className="space-y-2">
          {Object.entries(ECOSYSTEM_COLORS).map(([name, color]) => (
            <div key={name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[10px] text-slate-200">{name}</span>
            </div>
          ))}
          {activeIndex && (
             <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
                <div className="w-3 h-3 bg-white opacity-40 border border-white" />
                <span className="text-[10px] text-slate-200">Active: {activeIndex}</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
