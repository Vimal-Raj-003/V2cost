
import React from 'react';
import { EstimationState, CalculationResults } from '../types';
import { MACHINES } from '../constants';

interface Props {
  state: EstimationState;
  results: CalculationResults;
  onUpdate: (updates: Partial<EstimationState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CycleTimeView: React.FC<Props> = ({ state, results, onUpdate, onNext, onPrev }) => {
  const totalTime = results.cycleTime;
  const currentMachine = MACHINES.find(m => m.id === state.machineId) || MACHINES[0];
  
  const getWidth = (time: number) => {
    return `${(time / Math.max(totalTime, 1)) * 100}%`;
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Cycle Time & Parameters</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">Analyze breakdown, identify bottlenecks, and optimize process efficiency.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white dark:bg-slate-800 px-4 text-sm font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
            <span className="material-symbols-outlined mr-2 text-[20px]">restart_alt</span>
            Recalculate
          </button>
          <button 
            onClick={onNext}
            className="flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-md hover:bg-primary-hover transition-colors"
          >
            Save & Continue
          </button>
        </div>
      </div>

      {/* Top Metrics Grid - Updated to 5 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard 
          icon="timer" 
          label="Total Cycle Time" 
          value={totalTime.toFixed(1)} 
          unit="s" 
          badge="-2.1s" 
          color="bg-blue-100 text-blue-600" 
        />
        <MetricCard 
          icon="conveyor_belt" 
          label="Hourly Output" 
          value={results.hourlyOutput.toLocaleString()} 
          unit="pcs" 
          color="bg-purple-100 text-purple-600" 
        />
        <MetricCard 
          icon="payments" 
          label="Machine MHR" 
          value={currentMachine.hourlyRate.toFixed(0)} 
          unit="$/hr" 
          color="bg-emerald-100 text-emerald-600" 
        />
        <MetricCard 
          icon="receipt_long" 
          label="Process Cost" 
          value={results.processCostPerPart.toFixed(3)} 
          unit="/pc" 
          color="bg-indigo-100 text-indigo-600" 
        />
        <TonnageCard 
          value={results.requiredTonnage} 
          utilization={state.efficiency} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Inputs */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Process<br/>Parameters</h3>
              <div className="text-right">
                <button className="text-primary text-sm font-medium hover:text-primary-hover block">Edit</button>
                <button className="text-primary text-sm font-medium hover:text-primary-hover block">Defaults</button>
              </div>
            </div>
            
            <div className="flex flex-col gap-6 flex-1">
              <PhaseInput 
                label="Injection" 
                dotColor="bg-primary" 
                value={state.injectionTime} 
                onChange={(v) => onUpdate({ injectionTime: v })} 
                sub="Calculated" 
              />
              <PhaseInput 
                label="Cooling" 
                dotColor="bg-cyan-400" 
                value={state.coolingTimeManual} 
                onChange={(v) => onUpdate({ coolingTimeManual: v })} 
              />
              <PhaseInput 
                label="Actuation" 
                dotColor="bg-violet-500" 
                value={state.actuationTime} 
                onChange={(v) => onUpdate({ actuationTime: v })} 
              />
              <PhaseInput 
                label="Ejection" 
                dotColor="bg-pink-500" 
                value={state.ejectionTime} 
                onChange={(v) => onUpdate({ ejectionTime: v })} 
              />
              <PhaseInput 
                label="Insert Loading" 
                dotColor="bg-amber-500" 
                value={state.loadingTime} 
                onChange={(v) => onUpdate({ loadingTime: v })} 
                optional 
              />
            </div>
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 h-full">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Cycle Composition Timeline</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Visual breakdown of total cycle time phases.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded">Scale: Seconds</span>
              </div>
            </div>

            <div className="w-full mb-10">
              <div className="relative h-14 w-full rounded-lg overflow-hidden flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <TimelineSegment color="bg-primary" width={getWidth(state.injectionTime)} label={`${state.injectionTime}s`} />
                <TimelineSegment color="bg-[#0891b2]" width={getWidth(state.coolingTimeManual)} label={`Cooling: ${state.coolingTimeManual}s`} />
                <TimelineSegment color="bg-[#d97706]" width={getWidth(state.loadingTime)} label={`${state.loadingTime}s`} />
                <TimelineSegment color="bg-[#7c3aed]" width={getWidth(state.actuationTime)} label="" />
                <TimelineSegment color="bg-[#db2777]" width={getWidth(state.ejectionTime)} label="" />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                <span>0s</span>
                <span>{(totalTime * 0.3).toFixed(0)}s</span>
                <span>{(totalTime * 0.6).toFixed(0)}s</span>
                <span>{(totalTime * 0.9).toFixed(0)}s</span>
                <span>{totalTime.toFixed(1)}s</span>
              </div>
            </div>

            <div className="grid gap-6 mb-8">
              <ProgressBarRow label="Cooling" color="bg-cyan-400" width={getWidth(state.coolingTimeManual)} value={`${state.coolingTimeManual.toFixed(1)}s`} />
              <ProgressBarRow label="Insert Load" color="bg-amber-500" width={getWidth(state.loadingTime)} value={`${state.loadingTime.toFixed(1)}s`} />
              <ProgressBarRow label="Injection" color="bg-primary" width={getWidth(state.injectionTime)} value={`${state.injectionTime.toFixed(1)}s`} />
              <ProgressBarRow label="Actuation" color="bg-violet-500" width={getWidth(state.actuationTime)} value={`${state.actuationTime.toFixed(1)}s`} />
              <ProgressBarRow label="Ejection" color="bg-pink-500" width={getWidth(state.ejectionTime)} value={`${state.ejectionTime.toFixed(1)}s`} />
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 p-5 flex gap-5 items-start shadow-sm">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[24px]">lightbulb</span>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-amber-800 dark:text-amber-200 mb-1">Cooling Time Dominance</h4>
              <p className="text-sm text-amber-700/80 dark:text-amber-300 leading-relaxed font-medium">
                Cooling time accounts for <strong className="text-amber-700 dark:text-amber-200">{((state.coolingTimeManual / totalTime) * 100).toFixed(0)}%</strong> of the total cycle. Consider checking coolant temperature or flow rate. Reducing wall thickness by 10% could save ~2.4s per cycle.
              </p>
            </div>
            <button className="text-sm font-bold text-amber-700 dark:text-amber-200 underline decoration-amber-300 hover:decoration-amber-700 transition-all shrink-0">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ icon: string, label: string, value: string, unit: string, badge?: string, color: string }> = ({ icon, label, value, unit, badge, color }) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
    <div className="flex items-center gap-2 mb-2">
      <div className={`flex items-center justify-center size-7 rounded-full ${color}`}>
        <span className="material-symbols-outlined text-[18px] font-bold">{icon}</span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
    </div>
    <div className="flex items-baseline gap-2">
      <h3 className="text-2xl font-black text-slate-900 dark:text-white">{value}<span className="text-xs ml-1 text-slate-400 font-medium uppercase tracking-tighter">{unit}</span></h3>
      {badge && (
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center">
          {badge}
        </span>
      )}
    </div>
  </div>
);

const TonnageCard: React.FC<{ value: number, utilization: number }> = ({ value, utilization }) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <div className="flex items-center justify-center size-7 rounded-full bg-orange-100 text-orange-600">
        <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tonnage Util.</p>
    </div>
    <div className="flex items-baseline justify-between w-full mb-2">
      <h3 className="text-2xl font-black text-slate-900 dark:text-white">{value}<span className="text-xs ml-1 text-slate-400 font-medium tracking-tighter">T</span></h3>
      <div className="text-right">
        <p className="text-xs font-bold text-slate-900 dark:text-white">{utilization}%</p>
      </div>
    </div>
    <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
      <div className="bg-orange-500 h-full rounded-full" style={{ width: `${utilization}%` }}></div>
    </div>
  </div>
);

const PhaseInput: React.FC<{ label: string, dotColor: string, value: number, onChange: (v: number) => void, sub?: string, optional?: boolean }> = ({ label, dotColor, value, onChange, sub, optional }) => (
  <div className="group">
    <div className="flex justify-between mb-2">
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <span className={`size-2 rounded-full ${dotColor} inline-block`}></span> {label}
      </label>
      {sub && <span className="text-[11px] text-slate-400">{sub}</span>}
      {optional && <span className="text-[11px] text-amber-500 font-medium">Optional</span>}
    </div>
    <div className="relative">
      <input 
        className="block w-full rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white px-4 py-3 sm:text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
        type="number" 
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <span className="text-slate-400 text-sm font-medium">s</span>
      </div>
    </div>
  </div>
);

const TimelineSegment: React.FC<{ color: string, width: string, label: string }> = ({ color, width, label }) => (
  <div 
    className={`h-full ${color} flex items-center justify-center text-white text-[10px] font-bold transition-all hover:brightness-110 cursor-pointer overflow-hidden whitespace-nowrap`} 
    style={{ width }}
  >
    {label}
  </div>
);

const ProgressBarRow: React.FC<{ label: string, color: string, width: string, value: string }> = ({ label, color, width, value }) => (
  <div className="grid grid-cols-[100px_1fr_60px] items-center gap-6">
    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
    <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width }}></div>
    </div>
    <span className="text-sm text-right text-slate-500 dark:text-slate-400">{value}</span>
  </div>
);

export default CycleTimeView;
