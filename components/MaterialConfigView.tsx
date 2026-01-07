
import React from 'react';
import { EstimationState, MaterialLayer } from '../types';
import { performCalculations } from '../utils/calculations';

interface Props {
  state: EstimationState;
  onUpdate: (updates: Partial<EstimationState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const MaterialConfigView: React.FC<Props> = ({ state, onUpdate, onNext, onPrev }) => {
  const results = performCalculations(state);

  const updateLayer = (key: keyof EstimationState, updates: Partial<MaterialLayer>) => {
    const layer = state[key] as MaterialLayer;
    onUpdate({ [key]: { ...layer, ...updates } });
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Page Title & Unit Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Material & Runner Config</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl">Define polymer composition, additives, and runner system parameters for accurate cost estimation.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex h-10 items-center rounded-lg bg-slate-200 dark:bg-slate-700 p-1">
            <button className="flex h-full items-center justify-center rounded px-3 text-sm font-medium transition-all shadow-sm bg-white dark:bg-slate-600 text-slate-900 dark:text-white">
              Metric
            </button>
            <button className="flex h-full items-center justify-center rounded px-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
              Imperial
            </button>
          </div>
          <button 
            onClick={onNext}
            className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-sm shadow-blue-500/20 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">save</span>
            <span>Next: Machine Config</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Polymer Definition Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">science</span>
                Polymer Definition
              </h2>
              <button className="text-sm text-primary hover:underline font-medium">Search Database</button>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-100 dark:border-green-800 inline-block text-green-800 dark:text-green-300">Base Polymer</h3>
              <MaterialLayerInputs 
                layer={state.baseMaterial} 
                onChange={(upd) => updateLayer('baseMaterial', upd)} 
              />
            </div>
          </div>

          {/* Additives & Regrind Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">blur_on</span>
                Additives & Regrind
              </h2>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> Masterbatch 1
                </h3>
                <MaterialLayerInputs 
                  layer={state.masterbatch1} 
                  onChange={(upd) => updateLayer('masterbatch1', upd)} 
                  variant="compact"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Masterbatch 2
                </h3>
                <MaterialLayerInputs 
                  layer={state.masterbatch2} 
                  onChange={(upd) => updateLayer('masterbatch2', upd)} 
                  variant="compact"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Recycle
                </h3>
                <MaterialLayerInputs 
                  layer={state.recycle} 
                  onChange={(upd) => updateLayer('recycle', upd)} 
                  variant="compact"
                />
              </div>
            </div>
          </div>

          {/* Runner System Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">account_tree</span>
                Runner System
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button 
                  onClick={() => onUpdate({ runnerType: 'cold' })}
                  className={`cursor-pointer group relative flex flex-col p-4 rounded-xl border-2 transition-all text-left ${state.runnerType === 'cold' ? 'border-primary bg-blue-50/50 dark:bg-blue-900/10' : 'border-slate-200 dark:border-slate-700'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white">Cold Runner</span>
                    <span className={`material-symbols-outlined ${state.runnerType === 'cold' ? 'text-primary' : 'text-slate-300'}`}>
                      {state.runnerType === 'cold' ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Material solidifies in the runner and is ejected with the part.</p>
                </button>
                <button 
                  onClick={() => onUpdate({ runnerType: 'hot' })}
                  className={`cursor-pointer group relative flex flex-col p-4 rounded-xl border-2 transition-all text-left ${state.runnerType === 'hot' ? 'border-primary bg-blue-50/50 dark:bg-blue-900/10' : 'border-slate-200 dark:border-slate-700'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white">Hot Runner</span>
                    <span className={`material-symbols-outlined ${state.runnerType === 'hot' ? 'text-primary' : 'text-slate-300'}`}>
                      {state.runnerType === 'hot' ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Molten plastic is kept hot in the runner manifold. No waste.</p>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-700">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Runner Weight (g)</label>
                  <input 
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" 
                    type="number" 
                    value={state.runnerWeight}
                    onChange={(e) => onUpdate({ runnerWeight: parseFloat(e.target.value) || 0 })}
                  />
                  <p className="mt-1 text-xs text-slate-500">Per shot</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Regrind Usage (%)</label>
                  <input 
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-2.5 text-slate-500 dark:text-slate-400 cursor-not-allowed" 
                    disabled 
                    type="number" 
                    value="100" 
                  />
                  <p className="mt-1 text-xs text-slate-500">Assuming 100% reuse of runner</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white">
                <h3 className="text-sm font-medium text-slate-300 mb-1">Estimated Material Cost</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tight">${results.materialCostPerPart.toFixed(3)}</span>
                  <span className="text-sm font-medium text-slate-400">/ shot</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs">
                  <span className="text-slate-400">Effective Rate</span>
                  <span className="font-semibold text-white">${results.effectiveMaterialRate.toFixed(2)} / kg</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                  {/* CSS Donut Chart Implementation */}
                  <div 
                    className="relative h-32 w-32 rounded-full overflow-hidden" 
                    style={{ 
                      background: `conic-gradient(#135bec 0% 83%, #93c5fd 83% 85%, #cbd5e1 85% 100%)` 
                    }}
                  >
                    <div className="absolute inset-2 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center flex-col">
                      <span className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Total Wt.</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white">{results.shotWeight.toFixed(1)}g</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Weight Breakdown</h4>
                <div className="flex flex-col gap-3">
                  <BreakdownItem color="bg-primary" label="Base Material (Virgin)" value={results.weightBreakdown.base} />
                  <BreakdownItem color="bg-blue-300" label="Masterbatch" value={results.weightBreakdown.mb} />
                  <BreakdownItem color="bg-slate-300" label="Regrind" value={results.weightBreakdown.regrind} />
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-500">Part Weight</span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{results.partWeight.toFixed(1)}g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Runner Weight</span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{state.runnerWeight.toFixed(1)}g</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-blue-50 dark:bg-blue-900/10 p-4 border border-blue-100 dark:border-blue-900/30 flex gap-3">
              <span className="material-symbols-outlined text-primary shrink-0">info</span>
              <div className="text-xs text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Did you know?</p>
                <p>Switching to a Hot Runner system for this project could save approximately <span className="font-bold">$0.02</span> per part in material waste.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={onPrev}
                className="flex-1 px-4 h-12 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={onNext}
                className="flex-[2] px-4 h-12 rounded-lg bg-primary text-white font-bold text-sm hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                Production Setup
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MaterialLayerInputs: React.FC<{ layer: MaterialLayer, onChange: (upd: Partial<MaterialLayer>) => void, variant?: 'default' | 'compact' }> = ({ layer, onChange, variant = 'default' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 ${variant === 'compact' ? 'p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700/50' : ''}`}>
    <div>
      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Material Family</label>
      <input 
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" 
        type="text" 
        value={layer.family}
        onChange={(e) => onChange({ family: e.target.value })}
      />
    </div>
    <div>
      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Material Grade</label>
      <input 
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" 
        type="text" 
        value={layer.grade}
        onChange={(e) => onChange({ grade: e.target.value })}
      />
    </div>
    <div>
      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Dosage (%)</label>
      <input 
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-right" 
        type="number" 
        step="0.1"
        value={layer.dosage}
        onChange={(e) => onChange({ dosage: parseFloat(e.target.value) || 0 })}
      />
    </div>
    <div>
      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">RM Rate ($/kg)</label>
      <input 
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-right" 
        type="number" 
        step="0.01"
        value={layer.rmRate}
        onChange={(e) => onChange({ rmRate: parseFloat(e.target.value) || 0 })}
      />
    </div>
    <div>
      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Scrap Rate ($/kg)</label>
      <input 
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-right" 
        type="number" 
        step="0.01"
        value={layer.scrapRate}
        onChange={(e) => onChange({ scrapRate: parseFloat(e.target.value) || 0 })}
      />
    </div>
  </div>
);

const BreakdownItem: React.FC<{ color: string, label: string, value: number }> = ({ color, label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
    </div>
    <span className="font-medium text-slate-900 dark:text-white">{value.toFixed(1)}g</span>
  </div>
);

export default MaterialConfigView;
