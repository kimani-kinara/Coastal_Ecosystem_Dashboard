
export enum EcosystemTarget {
  SHORELINE = 'Shoreline Dynamics',
  MANGROVES = 'Mangroves',
  CORAL_REEFS = 'Coral Reefs',
  SEAGRASS = 'Seagrass'
}

export enum SpectralIndex {
  NDVI = 'NDVI',
  MNDWI = 'MNDWI',
  NDTI = 'NDTI'
}

export interface MapRegion {
  name: string;
  coords: [number, number];
  zoom: number;
  description: string;
}

export interface EcosystemStats {
  target: EcosystemTarget;
  healthIndex: number;
  trend: 'improving' | 'stable' | 'declining';
  coverageKm2: number;
}
