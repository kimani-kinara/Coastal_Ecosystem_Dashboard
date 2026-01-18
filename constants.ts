
import { MapRegion, EcosystemTarget } from './types';

export const KENYA_COAST_BOUNDS: [[number, number], [number, number]] = [
  [-4.7, 39.0], // Southern tip near Lunga Lunga
  [1.7, 41.6]   // Northern tip near Lamu/Kiunga
];

export const REGIONS: MapRegion[] = [
  {
    name: "Lamu Archipelago",
    coords: [-2.27, 40.90],
    zoom: 11,
    description: "Extensive mangrove forests and complex tidal networks."
  },
  {
    name: "Watamu & Malindi",
    coords: [-3.35, 40.01],
    zoom: 12,
    description: "Marine protected areas with rich coral reef ecosystems."
  },
  {
    name: "Mombasa & Kwale",
    coords: [-4.04, 39.66],
    zoom: 11,
    description: "High urban pressure and industrial port activities."
  }
];

export const ECOSYSTEM_COLORS: Record<EcosystemTarget, string> = {
  [EcosystemTarget.SHORELINE]: '#3b82f6', // Blue
  [EcosystemTarget.MANGROVES]: '#10b981', // Green
  [EcosystemTarget.CORAL_REEFS]: '#f59e0b', // Amber
  [EcosystemTarget.SEAGRASS]: '#84cc16'  // Lime
};
