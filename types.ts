
export interface MaterialLayer {
  family: string;
  grade: string;
  dosage: number;
  rmRate: number;
  scrapRate: number;
}

export interface Material {
  id: string;
  name: string;
  density: number; // g/cm3
  pricePerKg: number; // USD
  thermalDiffusivity: number; // mm2/s
  meltTemp: number; // C
  moldTemp: number; // C
  ejectTemp: number; // C
}

export interface Machine {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  tonnage: number;
  hourlyRate: number; // USD/hr
  clampingForce: number; // kN
  tieBarHorizontal: number; // mm
  tieBarVertical: number; // mm
  openingWidth: number; // mm
  meltingVolume: number; // L
}

export interface EstimationState {
  projectName: string;
  projectNumber: string;
  annualVolume: number;
  region: string;
  commodity: string;
  clientName: string;
  costingResponsibility: string;
  
  // Detailed Material Definition
  baseMaterial: MaterialLayer;
  masterbatch1: MaterialLayer;
  masterbatch2: MaterialLayer;
  recycle: MaterialLayer;
  
  // Runner System
  runnerType: 'cold' | 'hot';
  runnerWeight: number; // g
  
  // Geometric Parameters
  partLength: number; // mm
  partWidth: number; // mm
  partHeight: number; // mm
  partVolume: number; // cm3 (cc)
  wallThickness: number; // mm (Avg)
  maxWallThickness: number; // mm
  minWallThickness: number; // mm
  avgWallThickness: number; // mm
  surfaceArea: number; // mm2
  projectedArea: number; // mm2
  density: number; // g/cc
  
  materialId: string; // Legacy/Basic lookup
  regrindPercentage: number; // Basic
  
  // Machine & Process
  manufacturer: string;
  machineModel: string;
  machineId: string;
  cavities: number;
  efficiency: number; // %
  
  injectionPressure: number; // Kg/cm2
  demoldTemp: number; // C
  injTemp: number; // C
  moldTemp: number; // C

  // Cycle Time Components
  injectionTime: number;
  coolingTimeManual: number;
  actuationTime: number;
  ejectionTime: number;
  loadingTime: number;
}

export interface CostBreakdown {
  process: number;
  icc: number;
  rejection: number;
  profit: number;
  overhead: number;
  packaging: number;
  logistics: number;
  rawMaterial: number;
}

export interface CalculationResults {
  partWeight: number; // g
  shotWeight: number; // g
  coolingTime: number; // s
  cycleTime: number; // s
  materialCostPerPart: number;
  processCostPerPart: number;
  totalCostPerPart: number;
  totalAnnualProjectCost: number;
  effectiveMaterialRate: number;
  weightBreakdown: {
    base: number;
    mb: number;
    regrind: number;
  };
  requiredTonnage: number; // kN
  isTonnageValid: boolean;
  injectionVolume: number; // L
  hourlyOutput: number;
  breakdown: CostBreakdown;
}
