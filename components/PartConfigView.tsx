import React from 'react';
import { EstimationState } from '../types';

interface Props {
  state: EstimationState;
  onUpdate: (updates: Partial<EstimationState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PartConfigView: React.FC<Props> = ({ state, onUpdate, onNext, onPrev }) => {
  return (
    <div className="flex flex-col gap-6 h-full page-transition">
      {/* Header Info */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{state.projectName}.step</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold border border-green-200 dark:border-green-800">READY</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Material: <strong className="text-slate-900 dark:text-white">ABS (Generic)</strong> <span className="mx-2 text-slate-300 dark:text-slate-700">|</span> Density: {state.density} g/cm³
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-white dark:bg-surface-dark p-1 rounded-lg border border-slate-200 dark:border-border-dark shadow-sm inline-flex h-10">
            <button className="px-4 h-full rounded flex items-center justify-center text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm transition-all">
              Metric (mm)
            </button>
            <button className="px-4 h-full rounded flex items-center justify-center text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
              Imperial (in)
            </button>
          </div>
          <button className="h-10 px-4 rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark text-slate-700 dark:text-white text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            Report
          </button>
          <button 
            onClick={onNext}
            className="h-10 px-6 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2"
          >
            <span>Cost Estimate</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[600px]">
        {/* Left: Parameters */}
        <div className="lg:col-span-5 flex flex-col gap-5 overflow-y-auto pr-1">
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm flex-1 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-border-dark flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">straighten</span>
                Part Parameters
              </h3>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-border-dark">Editable</span>
            </div>
            
            <div className="p-5 flex flex-col gap-1">
              <ParameterInput label="Length" value={state.partLength} unit="mm" onChange={(v) => onUpdate({ partLength: v })} />
              <ParameterInput label="Width" value={state.partWidth} unit="mm" onChange={(v) => onUpdate({ partWidth: v })} />
              <ParameterInput label="Height" value={state.partHeight} unit="mm" onChange={(v) => onUpdate({ partHeight: v })} />
              
              <div className="my-3 h-px bg-slate-100 dark:bg-border-dark"></div>
              
              <ParameterInput label="Max Wall Thickness" value={state.maxWallThickness} unit="mm" onChange={(v) => onUpdate({ maxWallThickness: v })} />
              <ParameterInput label="Min Wall Thickness" value={state.minWallThickness} unit="mm" onChange={(v) => onUpdate({ minWallThickness: v })} />
              <ParameterInput label="Average Wall Thickness" value={state.avgWallThickness} unit="mm" onChange={(v) => { onUpdate({ avgWallThickness: v, wallThickness: v }); }} />
              
              <div className="my-3 h-px bg-slate-100 dark:bg-border-dark"></div>
              
              <ParameterInput label="Volume" value={state.partVolume} unit="cc" onChange={(v) => onUpdate({ partVolume: v })} />
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-border-dark bg-primary/5 dark:bg-primary/10 -mx-2 px-2 rounded mb-1">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-200">Density</label>
                <div className="flex items-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md px-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <input 
                    className="w-24 bg-transparent border-none text-right text-sm font-semibold text-slate-900 dark:text-white p-1 focus:ring-0" 
                    type="number" 
                    value={state.density}
                    onChange={(e) => onUpdate({ density: parseFloat(e.target.value) || 0 })}
                  />
                  <span className="text-xs text-slate-400 font-medium pl-1">g/cc</span>
                </div>
              </div>
              <ParameterInput label="Surface Area" value={state.surfaceArea} unit="mm²" onChange={(v) => onUpdate({ surfaceArea: v })} />
              <ParameterInput label="Projected Area" value={state.projectedArea} unit="mm²" onChange={(v) => onUpdate({ projectedArea: v })} />
            </div>
          </div>
        </div>

        {/* Right: 3D Visualization */}
        <div className="lg:col-span-7 flex flex-col relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-border-dark shadow-inner group">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200 dark:border-border-dark shadow-lg">
            <button className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300" title="Orbit">
              <span className="material-symbols-outlined text-[20px]">3d_rotation</span>
            </button>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1"></div>
            <button className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300" title="Zoom In">
              <span className="material-symbols-outlined text-[20px]">zoom_in</span>
            </button>
            <button className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300" title="Zoom Out">
              <span className="material-symbols-outlined text-[20px]">zoom_out</span>
            </button>
            <button className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300" title="Fit to Screen">
              <span className="material-symbols-outlined text-[20px]">fit_screen</span>
            </button>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1"></div>
            <button className="p-2 rounded bg-primary/10 text-primary" title="Solid View">
              <span className="material-symbols-outlined text-[20px] fill">view_in_ar</span>
            </button>
            <button className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300" title="Wireframe">
              <span className="material-symbols-outlined text-[20px]">grid_4x4</span>
            </button>
          </div>
          
          <div className="flex-1 w-full h-full relative bg-gradient-to-b from-slate-50 to-slate-200 dark:from-slate-900 dark:to-background-dark flex items-center justify-center">
            <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
            <img 
              alt="3D rendering of the Enclosure Top plastic part" 
              className="max-h-[80%] max-w-[80%] object-contain drop-shadow-2xl z-0 transition-transform duration-500 hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDubs1ECaQAgCrms9r8VtPaWuOtSx-uqhr3-WQjHiRDpyA3DrKPJ0u47v_m9zh4FfRW2RGCBSGED1Qpwc1G9ZboPIwsknrzMYcgiaQzSqwfDwps4MK9B42Tuw6aJSujhon5-aGHCLA5pMO7Y8_Z-r9Y0hNnnBu19yBe6ZxxDm8gvXWQdS_FqmWmHRcRAUXynYIc7zS0DAW34I8YMtxS-df6rGGHyjLpjHArAcim7CYEf5-H88jv9zUrQkYANPwqjTvSKVH9Ly2ow_k"
            />
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded text-xs font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-border-dark">
              X: {state.partLength}mm Y: {state.partWidth}mm Z: {state.partHeight}mm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ParameterInput: React.FC<{ label: string, value: number, unit: string, onChange: (v: number) => void }> = ({ label, value, unit, onChange }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-border-dark last:border-0">
    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</label>
    <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md px-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
      <input 
        className="w-24 bg-transparent border-none text-right text-sm font-semibold text-slate-900 dark:text-white p-1 focus:ring-0" 
        type="number" 
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      />
      <span className="text-xs text-slate-400 font-medium pl-1 select-none">{unit}</span>
    </div>
  </div>
);

export default PartConfigView;