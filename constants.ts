
import { Material, Machine } from './types';

export const MATERIALS: Material[] = [
  { 
    id: 'abs-gen', 
    name: 'ABS (Generic)', 
    density: 1.04, 
    pricePerKg: 2.85, 
    thermalDiffusivity: 0.08, 
    meltTemp: 230, 
    moldTemp: 60, 
    ejectTemp: 90 
  },
  { 
    id: 'pc-gen', 
    name: 'Polycarbonate (Generic)', 
    density: 1.20, 
    pricePerKg: 4.50, 
    thermalDiffusivity: 0.11, 
    meltTemp: 290, 
    moldTemp: 90, 
    ejectTemp: 130 
  },
  { 
    id: 'pp-gen', 
    name: 'Polypropylene (Generic)', 
    density: 0.90, 
    pricePerKg: 1.65, 
    thermalDiffusivity: 0.07, 
    meltTemp: 210, 
    moldTemp: 40, 
    ejectTemp: 80 
  },
  { 
    id: 'pa66-gen', 
    name: 'Nylon 6/6', 
    density: 1.14, 
    pricePerKg: 3.20, 
    thermalDiffusivity: 0.09, 
    meltTemp: 275, 
    moldTemp: 80, 
    ejectTemp: 150 
  }
];

export const MACHINES: Machine[] = [
  { 
    id: 'm-50', 
    name: 'Micro 50T', 
    manufacturer: 'Arburg',
    model: 'Allrounder 370',
    tonnage: 50, 
    hourlyRate: 35, 
    clampingForce: 500,
    tieBarHorizontal: 370,
    tieBarVertical: 370,
    openingWidth: 450,
    meltingVolume: 0.15
  },
  { 
    id: 'm-900', 
    name: 'Engel Duo 900T', 
    manufacturer: 'Engel',
    model: 'Duo5550/900',
    tonnage: 900, 
    hourlyRate: 140, 
    clampingForce: 9000,
    tieBarHorizontal: 1700,
    tieBarVertical: 1600,
    openingWidth: 1980,
    meltingVolume: 13.5
  },
  { 
    id: 'm-250', 
    name: 'Std 250T', 
    manufacturer: 'KraussMaffei',
    model: 'GX 250',
    tonnage: 250, 
    hourlyRate: 72, 
    clampingForce: 2500,
    tieBarHorizontal: 630,
    tieBarVertical: 630,
    openingWidth: 800,
    meltingVolume: 0.85
  }
];

export const REGIONS = [
  { id: 'na', name: 'North America', multiplier: 1.0 },
  { id: 'sea', name: 'Southeast Asia', multiplier: 0.7 },
  { id: 'eu', name: 'Europe', multiplier: 1.1 },
  { id: 'mx', name: 'Mexico', multiplier: 0.85 }
];
