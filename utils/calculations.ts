
import { EstimationState, CalculationResults, Material, Machine } from '../types';
import { MATERIALS, MACHINES } from '../constants';

export const calculateCoolingTime = (material: Material, wallThickness: number): number => {
  const { thermalDiffusivity, meltTemp, moldTemp, ejectTemp } = material;
  const h = wallThickness;
  const alpha = thermalDiffusivity;
  
  const factor = (Math.pow(h, 2)) / (Math.pow(Math.PI, 2) * alpha);
  const tempRatio = (4 / Math.PI) * ((meltTemp - moldTemp) / (ejectTemp - moldTemp));
  
  return factor * Math.log(tempRatio);
};

export const performCalculations = (state: EstimationState): CalculationResults => {
  const material = MATERIALS.find(m => m.id === state.materialId) || MATERIALS[0];
  const machine = MACHINES.find(m => m.id === state.machineId) || MACHINES[0];

  // 1. Weight Calculations
  const partWeight = state.partVolume * material.density;
  const shotWeight = (partWeight * state.cavities) + state.runnerWeight;

  // 2. Cycle Time - From manual inputs
  const cycleTime = state.injectionTime + state.coolingTimeManual + state.actuationTime + state.ejectionTime + state.loadingTime;

  // 3. Direct Costs
  const effectiveMaterialPrice = material.pricePerKg * (1 - (state.regrindPercentage / 100) * 0.5);
  const materialCostPerShot = (shotWeight / 1000) * effectiveMaterialPrice;
  const materialCostPerPart = materialCostPerShot / state.cavities;

  const processCostPerHour = machine.hourlyRate;
  const processCostPerShot = (processCostPerHour / 3600) * cycleTime;
  const processCostPerPart = processCostPerShot / state.cavities;

  // 4. Detailed Financial Components (Market Standards)
  const rawMaterial = materialCostPerPart;
  const process = processCostPerPart;
  
  // ICC (Interest Carry Cost) - 1% of raw material
  const icc = rawMaterial * 0.01;
  
  // Rejection - 2% of Direct (RM + Process)
  const rejection = (rawMaterial + process) * 0.02;
  
  // Overhead - 10% of Process
  const overhead = process * 0.10;
  
  // Packaging - 2% of Direct
  const packaging = (rawMaterial + process) * 0.02;
  
  // Logistics - 3% of Direct
  const logistics = (rawMaterial + process) * 0.03;
  
  // Subtotal before profit
  const subtotal = rawMaterial + process + icc + rejection + overhead + packaging + logistics;
  
  // Profit - 8% of total
  const profit = subtotal * 0.08;

  const totalCostPerPart = subtotal + profit;
  const totalAnnualProjectCost = totalCostPerPart * state.annualVolume;

  // 5. Technical Parameters
  const injectionVolume = (shotWeight / 1000) / material.density;
  const clampForceReq = (state.projectedArea * state.cavities * 0.4); 
  const requiredTonnage = Math.ceil(clampForceReq);
  const isTonnageValid = machine.clampingForce >= requiredTonnage;

  const hourlyOutput = Math.floor((3600 / Math.max(cycleTime, 0.1)) * state.cavities * (state.efficiency / 100));

  return {
    partWeight,
    shotWeight,
    coolingTime: state.coolingTimeManual,
    cycleTime,
    materialCostPerPart,
    processCostPerPart,
    totalCostPerPart,
    totalAnnualProjectCost,
    effectiveMaterialRate: effectiveMaterialPrice,
    weightBreakdown: {
      base: partWeight * (1 - state.regrindPercentage / 100),
      mb: 0,
      regrind: partWeight * (state.regrindPercentage / 100)
    },
    requiredTonnage,
    isTonnageValid,
    injectionVolume,
    hourlyOutput,
    breakdown: {
      process,
      icc,
      rejection,
      profit,
      overhead,
      packaging,
      logistics,
      rawMaterial
    }
  };
};
