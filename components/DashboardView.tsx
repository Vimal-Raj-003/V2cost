
import React, { useState } from 'react';
import { EstimationState } from '../types';
import { REGIONS } from '../constants';

interface Props {
  state: EstimationState;
  onUpdate: (updates: Partial<EstimationState>) => void;
  onNext: () => void;
  onCancel: () => void;
}

const DashboardView: React.FC<Props> = ({ state, onUpdate, onNext, onCancel }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("File dropped:", e.dataTransfer.files[0].name);
      onNext();
    }
  };

  return (
    <div className="animate-fadeIn pb-20">
      <div className="mb-10 text-center lg:text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Project Initialization</h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
              Initialize your costing project by defining administrative details and selecting your preferred input method.
            </p>
          </div>
          <div className="bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 shadow-sm">
            <span className="text-xs font-black text-primary uppercase tracking-widest">Phase 1: Setup</span>
          </div>
        </div>
        <div className="mt-6 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
          <div className="h-full bg-primary w-1/4 rounded-full shadow-[0_0_10px_rgba(19,91,236,0.4)]"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Project Information - Main Form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 transition-colors">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/5 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-blue-400">
                  <span className="material-icons-round">assignment</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Project Details</h2>
              </div>
              <div className="text-right">
                <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">Project #</label>
                <div className="text-sm font-mono font-black text-primary bg-primary/5 dark:bg-primary/20 px-3 py-1.5 rounded-lg border border-primary/10">
                  {state.projectNumber}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Target Annual Volume</label>
                <div className="relative">
                  <input 
                    className="block w-full h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all px-4 outline-none" 
                    placeholder="50,000" 
                    type="number"
                    value={state.annualVolume}
                    onChange={(e) => onUpdate({ annualVolume: parseInt(e.target.value) || 0 })}
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-xs font-bold uppercase">Units</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Production Region</label>
                <select 
                  value={state.region}
                  onChange={(e) => onUpdate({ region: e.target.value })}
                  className="block w-full h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all px-4 outline-none"
                >
                  {REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Commodity Type</label>
                <select 
                  value={state.commodity}
                  onChange={(e) => onUpdate({ commodity: e.target.value })}
                  className="block w-full h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all px-4 outline-none"
                >
                  <option value="Plastics - Injection">Plastics - Injection Molding</option>
                  <option value="Plastics - Extrusion">Plastics - Extrusion</option>
                  <option value="Metal - Die Casting">Metal - Die Casting</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Project Internal Name</label>
                <input 
                  className="block w-full h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all px-4 outline-none" 
                  placeholder="e.g. Front Panel Housing" 
                  type="text"
                  value={state.projectName}
                  onChange={(e) => onUpdate({ projectName: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Client Organization</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <span className="material-icons-round text-sm">business</span>
                  </div>
                  <input 
                    className="block w-full h-12 pl-11 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all px-4 outline-none" 
                    placeholder="Company Name" 
                    type="text"
                    value={state.clientName}
                    onChange={(e) => onUpdate({ clientName: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Assigned Expert</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <span className="material-icons-round text-sm">person</span>
                  </div>
                  <input 
                    className="block w-full h-12 pl-11 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all px-4 outline-none" 
                    placeholder="Full Name" 
                    type="text"
                    value={state.costingResponsibility}
                    onChange={(e) => onUpdate({ costingResponsibility: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dialogue Box Section - PROJECT SOURCE */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden sticky top-24 transition-colors">
            <div className="p-6 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between transition-colors">
              <h3 className="font-black text-sm uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="material-icons-round text-primary">auto_awesome</span>
                Source Selection
              </h3>
              <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#135bec]"></div>
            </div>
            
            <div className="p-8">
              {/* CAD Upload Zone */}
              <div className="mb-8">
                <div 
                  className={`group relative h-64 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer ${
                    dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900/40'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('cad-upload')?.click()}
                >
                  <input id="cad-upload" type="file" className="hidden" accept=".stp,.step,.igs,.iges" onChange={(e) => e.target.files && onNext()} />
                  <div className="size-16 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                    <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">Upload 3D Model</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[200px]">
                    Drop your <strong className="text-slate-900 dark:text-slate-200">STP, STEP, or IGS</strong> files here for instant geometric analysis.
                  </p>
                  
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[8px] font-bold dark:text-slate-300">STP</div>
                      <div className="size-6 rounded-full bg-slate-100 dark:bg-slate-600 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[8px] font-bold text-primary dark:text-blue-400">IGS</div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Industry Standard</span>
                  </div>
                </div>
              </div>

              <div className="relative mb-8 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                </div>
                <span className="relative z-10 px-4 bg-white dark:bg-surface-dark text-[10px] font-black text-slate-400 tracking-[0.25em] transition-colors">OR PROCEED MANUALLY</span>
              </div>

              {/* Manual Entry Section */}
              <div className="flex flex-col gap-4">
                <button 
                  onClick={onNext}
                  className="w-full h-14 rounded-xl bg-slate-900 dark:bg-white dark:hover:bg-slate-100 hover:bg-black text-white dark:text-slate-900 font-black text-base shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 group"
                >
                  <span className="material-symbols-outlined text-[24px] group-hover:rotate-12 transition-transform">edit_note</span>
                  Manual Costing
                </button>
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 flex gap-3 transition-colors">
                  <span className="material-symbols-outlined text-primary dark:text-blue-400 text-xl">info</span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    Select manual costing if you already have finalized geometric parameters like surface area and volume.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="px-8 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center transition-colors">
              <button 
                onClick={onCancel}
                className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                Reset Project
              </button>
              <div className="flex items-center gap-1.5">
                <span className="material-icons-round text-primary dark:text-blue-400 text-sm">verified_user</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secure Neural Link</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
