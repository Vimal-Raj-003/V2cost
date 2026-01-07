
import React from 'react';
import { EstimationState } from '../types';
import { MACHINES } from '../constants';
import { performCalculations } from '../utils/calculations';

interface Props {
  state: EstimationState;
  onUpdate: (updates: Partial<EstimationState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const MachineConfigView: React.FC<Props> = ({ state, onUpdate, onNext, onPrev }) => {
  const results = performCalculations(state);
  const currentMachine = MACHINES.find(m => m.id === state.machineId) || MACHINES[0];

  return (
    <div className="flex flex-col gap-6 h-full animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111318] dark:text-white text-3xl font-black tracking-tight">Machine & Cavity Configuration</h1>
          <p className="text-[#616f89] dark:text-gray-400 text-base">Configure machine parameters and view cavity layout calculations.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-[#1e2330] rounded-lg p-1 border border-gray-200 dark:border-gray-700 flex text-xs font-bold">
            <button className="px-3 py-1.5 rounded bg-gray-100 dark:bg-gray-700 text-[#111318] dark:text-white shadow-sm">Metric</button>
            <button className="px-3 py-1.5 rounded text-[#616f89] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Imperial</button>
          </div>
          <button 
            onClick={onNext}
            className="flex cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-primary hover:bg-blue-700 text-white text-sm font-bold tracking-wide shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            Save Configuration
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Machine Selection */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#1e2330] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#111318] dark:text-white text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">precision_manufacturing</span>
                Machine Selection
              </h3>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded uppercase tracking-wider">Active</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <label className="flex flex-col gap-2">
                <span className="text-[#111318] dark:text-gray-200 text-sm font-semibold">Manufacturer</span>
                <div className="relative">
                  <select 
                    className="appearance-none w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-[#111318] dark:text-white rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer"
                    value={currentMachine.manufacturer}
                    onChange={(e) => {
                      const m = MACHINES.find(mac => mac.manufacturer === e.target.value);
                      if(m) onUpdate({ machineId: m.id });
                    }}
                  >
                    {Array.from(new Set(MACHINES.map(m => m.manufacturer))).map(m => <option key={m}>{m}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[#111318] dark:text-gray-200 text-sm font-semibold">Machine Model</span>
                <div className="relative">
                  <select 
                    className="appearance-none w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-[#111318] dark:text-white rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer"
                    value={state.machineId}
                    onChange={(e) => onUpdate({ machineId: e.target.value })}
                  >
                    {MACHINES.filter(m => m.manufacturer === currentMachine.manufacturer).map(m => (
                      <option key={m.id} value={m.id}>{m.model}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                </div>
              </label>
            </div>

            <div className="bg-slate-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700/50">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Technical Specifications: {currentMachine.manufacturer} {currentMachine.model}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6">
                <TechSpec label="Origin" value="Austria" />
                <TechSpec label="Clamping Unit" value="Horizontal" />
                <TechSpec label="Tie Bar (Hor)" value={`${currentMachine.tieBarHorizontal} mm`} />
                <TechSpec label="Tie Bar (Ver)" value={`${currentMachine.tieBarVertical} mm`} />
                <TechSpec label="Melting Volume" value={`${currentMachine.meltingVolume} L`} />
                <TechSpec label="Dry Running Time" value="4.5 s" />
                <TechSpec label="Opening Width" value={`${currentMachine.openingWidth} mm`} />
                <div className="flex flex-col bg-blue-50 dark:bg-blue-900/30 -m-2 p-2 rounded-lg border border-blue-200 dark:border-blue-700/50 shadow-sm">
                  <span className="text-primary dark:text-blue-300 text-xs font-bold uppercase">Machine Tonnage</span>
                  <span className="text-primary dark:text-blue-300 text-lg font-mono font-black">{currentMachine.clampingForce} kN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Layout Visualization */}
          <div className="bg-white dark:bg-[#1e2330] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#111318] dark:text-white text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">view_quilt</span>
                Layout Visualization
              </h3>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1 text-gray-500"><div className="w-3 h-3 rounded-full bg-primary/20 border border-primary"></div> Cavity</span>
                <span className="flex items-center gap-1 text-gray-500"><div className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700"></div> Mold Base</span>
              </div>
            </div>
            
            <div className="flex-1 bg-gray-50 dark:bg-[#151a25] rounded-lg border border-dashed border-gray-300 dark:border-gray-700 min-h-[300px] flex items-center justify-center relative p-8">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-400">Width: 975mm</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-mono text-gray-400">Height: 450mm</div>
              
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 w-full max-w-[480px] aspect-[2/1] shadow-sm rounded flex items-center justify-center p-4 relative">
                <div className={`grid gap-12 w-full h-full p-4 place-items-center ${state.cavities > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {Array.from({ length: state.cavities }).map((_, i) => (
                    <div key={i} className="aspect-square w-full max-w-[80px] rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-lg text-primary font-bold">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-600 -z-10"></div>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-sm font-bold text-[#111318] dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-500 text-base">tune</span>
                Process Parameters
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <ProcessValue label="RM/Inj Pressure" value={state.injectionPressure} unit="Kg/cm²" />
                <ProcessValue label="DeMold Temp" value={state.demoldTemp} unit="°C" />
                <ProcessValue label="Inj Temp" value={state.injTemp} unit="°C" />
                <ProcessValue label="Mold Temp" value={state.moldTemp} unit="°C" />
                <ProcessValue label="Thermal Diffusivity" value={0.09} unit="mm²/s" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Inputs & Calculations */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white dark:bg-[#1e2330] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-[#111318] dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">input</span>
              Part Inputs
            </h3>
            <div className="flex flex-col gap-4">
              <PartInput label="Projected Area" value={state.projectedArea} unit="cm²" onChange={(v) => onUpdate({ projectedArea: v })} />
              <PartInput label="Part Weight" value={results.partWeight.toFixed(1)} unit="g" disabled />
              <label className="flex flex-col gap-1.5">
                <span className="text-[#111318] dark:text-gray-200 text-sm font-semibold">Cavities</span>
                <select 
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-[#111318] dark:text-white rounded-lg h-10 px-3 pr-10 focus:ring-primary focus:border-primary outline-none font-mono text-right"
                  value={state.cavities}
                  onChange={(e) => onUpdate({ cavities: parseInt(e.target.value) })}
                >
                  {[1, 2, 4, 8, 16, 32].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl shadow-lg shadow-blue-500/20 p-6 text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-20 transform scale-150 group-hover:scale-175 transition-transform duration-500">
              <span className="material-symbols-outlined text-9xl">apps</span>
            </div>
            <div className="relative z-10">
              <p className="text-blue-100 text-sm font-medium mb-1">Calculated Capacity</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-5xl font-black tracking-tight">{state.cavities}</h2>
                <span className="text-xl font-medium text-blue-100">Cavities</span>
              </div>
            </div>
            <div className="relative z-10 mt-4 pt-4 border-t border-white/20 flex justify-between items-center">
              <div>
                <p className="text-blue-200 text-xs uppercase tracking-wide">Layout</p>
                <p className="font-bold text-lg">{state.cavities > 1 ? `${state.cavities/2} x 2` : '1 x 1'}</p>
              </div>
              <div>
                <p className="text-blue-200 text-xs uppercase tracking-wide text-right">Efficiency</p>
                <p className="font-bold text-lg text-right">{state.efficiency}%</p>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <MetricCard icon="square_foot" label="Tie Bar Dist" value="975x450" unit="mm" />
            <MetricCard icon="water_drop" label="Inj Volume" value={results.injectionVolume.toFixed(2)} unit="L" />
            <MetricCard icon="straighten" label="Tool Size" value="975x450x420" unit="mm" />
            <MetricCard icon="compress" label="Clamp Force Req" value={results.requiredTonnage} unit="kN" highlight={!results.isTonnageValid} />
          </div>

          {/* Tonnage Calculations */}
          <div className="bg-white dark:bg-[#1e2330] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#111318] dark:text-white text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Tonnage Calculations
              </h3>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-bold border ${results.isTonnageValid ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                <span className="material-symbols-outlined text-sm font-bold">{results.isTonnageValid ? 'check_circle' : 'error'}</span>
                {results.isTonnageValid ? 'Valid' : 'Exceeded'}
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="w-full text-sm">
                <CalculationRow label="Req. based on Clamping Force" value={`${results.requiredTonnage} kN`} />
                <CalculationRow label="Req. based on Tie Bar Dist." value="1000 kN" />
                <CalculationRow label="Req. based on Shot Wt." value="1500 kN" />
                <div className="flex justify-between py-3 mt-1 bg-gray-50 dark:bg-gray-800/50 rounded px-3">
                  <span className="font-bold text-[#111318] dark:text-white">Required Final Tonnage</span>
                  <span className="font-mono font-bold text-primary text-lg">{results.requiredTonnage} kN</span>
                </div>
              </div>
              
              <div className="relative pt-6 pb-2">
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase">
                  <span>0 kN</span>
                  <span>Machine Cap: {currentMachine.clampingForce} kN</span>
                </div>
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative">
                  <div 
                    className={`h-full rounded-full relative transition-all duration-1000 ${results.isTonnageValid ? 'bg-primary' : 'bg-red-500'}`} 
                    style={{ width: `${Math.min(100, (results.requiredTonnage / currentMachine.clampingForce) * 100)}%` }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white/50"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-400 leading-relaxed mt-2 italic">
                <span className="material-symbols-outlined text-sm align-text-bottom mr-1">info</span>
                Final tonnage determined by maximum requirement across all criteria.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechSpec: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-500 dark:text-gray-400 text-xs">{label}</span>
    <span className="text-[#111318] dark:text-white text-base font-mono font-medium">{value}</span>
  </div>
);

const ProcessValue: React.FC<{ label: string, value: number, unit: string }> = ({ label, value, unit }) => (
  <div className="flex flex-col p-3 rounded bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
    <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</span>
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-bold text-[#111318] dark:text-white font-mono">{value.toFixed(2)}</span>
      <span className="text-[10px] text-gray-400 font-medium">{unit}</span>
    </div>
  </div>
);

const MetricCard: React.FC<{ icon: string, label: string, value: string | number, unit: string, highlight?: boolean }> = ({ icon, label, value, unit, highlight }) => (
  <div className={`bg-white dark:bg-[#1e2330] p-4 rounded-xl border shadow-sm transition-colors ${highlight ? 'border-red-500 bg-red-50/10' : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'}`}>
    <div className="text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
      <span className="material-symbols-outlined text-lg">{icon}</span>
      <span className="text-[10px] font-bold uppercase">{label}</span>
    </div>
    <p className={`text-xl font-bold font-mono ${highlight ? 'text-red-600' : 'text-[#111318] dark:text-white'}`}>
      {value} <span className="text-xs text-gray-400 font-sans font-normal">{unit}</span>
    </p>
  </div>
);

const PartInput: React.FC<{ label: string, value: string | number, unit: string, onChange?: (v: number) => void, disabled?: boolean }> = ({ label, value, unit, onChange, disabled }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-[#111318] dark:text-gray-200 text-sm font-semibold flex justify-between">
      {label}
      <span className="text-gray-400 font-normal text-[10px] uppercase">per part</span>
    </span>
    <div className="relative">
      <input 
        className={`w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-[#111318] dark:text-white rounded-lg h-10 px-3 pr-10 focus:ring-primary focus:border-primary outline-none font-mono text-right ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : ''}`} 
        type="number" 
        value={value} 
        disabled={disabled}
        onChange={(e) => onChange?.(parseFloat(e.target.value) || 0)}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-medium select-none">{unit}</span>
    </div>
  </label>
);

const CalculationRow: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
    <span className="text-gray-600 dark:text-gray-400">{label}</span>
    <span className="font-mono font-medium">{value}</span>
  </div>
);

export default MachineConfigView;
