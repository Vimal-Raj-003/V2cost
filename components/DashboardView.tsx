
import React from 'react';
import { EstimationState } from '../types';
import { REGIONS } from '../constants';

interface Props {
  state: EstimationState;
  onUpdate: (updates: Partial<EstimationState>) => void;
  onNext: () => void;
  onCancel: () => void;
}

const DashboardView: React.FC<Props> = ({ state, onUpdate, onNext, onCancel }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Project Parameters</h1>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full text-xs font-semibold text-primary dark:text-blue-300">
            25% Complete
          </div>
        </div>
        <div className="mt-4 w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-1/4 rounded-full"></div>
        </div>
        <p className="mt-6 text-subtext-light dark:text-subtext-dark max-w-3xl">
          Define the project scope and administrative details for your quote. These inputs will determine the baseline tracking and cost allocation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Project Information Card */}
          <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="material-icons-round text-primary text-xl">assignment</span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Project Information</h2>
              </div>
              <div className="text-right group">
                <label htmlFor="project-number-input" className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block mb-1 cursor-pointer group-hover:text-primary transition-colors">Project Number</label>
                <input 
                  id="project-number-input"
                  type="text"
                  spellCheck={false}
                  className="text-sm font-mono font-black text-primary bg-primary/5 px-2 py-1 rounded border border-primary/10 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-right w-44 hover:bg-primary/10 transition-all"
                  value={state.projectNumber}
                  onChange={(e) => onUpdate({ projectNumber: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-between">
                  Target Annual Volume
                  <span className="material-icons-round text-gray-400 text-sm cursor-help" title="Expected units per year">info</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input 
                    className="block w-full rounded-md border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3" 
                    placeholder="50,000" 
                    type="number"
                    value={state.annualVolume}
                    onChange={(e) => onUpdate({ annualVolume: parseInt(e.target.value) || 0 })}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">units</span>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Region
                </label>
                <select 
                  value={state.region}
                  onChange={(e) => onUpdate({ region: e.target.value })}
                  className="block w-full rounded-md border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3"
                >
                  {REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Commodity
                </label>
                <select 
                  value={state.commodity}
                  onChange={(e) => onUpdate({ commodity: e.target.value })}
                  className="block w-full rounded-md border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3"
                >
                  <option value="Plastics - Injection">Plastics - Injection</option>
                  <option value="Plastics - Extrusion">Plastics - Extrusion</option>
                  <option value="Metal - Stamping">Metal - Stamping</option>
                  <option value="Metal - Die Casting">Metal - Die Casting</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Commodity Project Name
                </label>
                <input 
                  className="block w-full rounded-md border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3" 
                  placeholder="e.g. Enclosure Set V2" 
                  type="text"
                  value={state.projectName}
                  onChange={(e) => onUpdate({ projectName: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Ownership & Responsibility Card */}
          <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
              <span className="material-icons-round text-primary text-xl">badge</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Ownership & Responsibility</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Client Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons-round text-gray-400 text-sm">business</span>
                  </div>
                  <input 
                    className="block w-full rounded-md border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm py-2.5 pl-10 pr-3" 
                    placeholder="Acme Corp" 
                    type="text"
                    value={state.clientName}
                    onChange={(e) => onUpdate({ clientName: e.target.value })}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Costing Responsibility
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons-round text-gray-400 text-sm">person</span>
                  </div>
                  <input 
                    className="block w-full rounded-md border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm py-2.5 pl-10 pr-3" 
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

        {/* Sidebar Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-icons-round text-subtext-light dark:text-subtext-dark text-lg">assessment</span>
              <h3 className="text-sm font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Estimate Preview</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-border-light dark:border-border-dark">
                <span className="text-sm text-subtext-light dark:text-subtext-dark">Tooling Tier</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">Class 104</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed border-border-light dark:border-border-dark">
                <span className="text-sm text-subtext-light dark:text-subtext-dark">Est. Lead Time</span>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">4-6 Weeks</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-subtext-light dark:text-subtext-dark">Complexity</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-6 h-2 rounded-full bg-primary"></div>
                    <div className="w-6 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="w-6 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <span className="text-xs text-subtext-light dark:text-subtext-dark">Low</span>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800/50 flex gap-3">
              <span className="material-icons-round text-primary text-xl flex-shrink-0 mt-0.5">lightbulb</span>
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="font-bold text-slate-800 dark:text-slate-200">Tip:</span> Ensure the "Region" matches your final shipping destination to minimize logistics overhead in the final cost calculation.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-12 flex justify-end gap-4 border-t border-border-light dark:border-border-dark pt-6 pb-12">
        <button 
          onClick={onCancel}
          className="px-6 py-2.5 rounded-lg border border-border-light dark:border-border-dark text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-gray-700 bg-white dark:bg-card-dark"
        >
          Cancel
        </button>
        <button 
          onClick={onNext}
          className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-sm transition-colors shadow-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Next: Part Details
          <span className="material-icons-round text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardView;
