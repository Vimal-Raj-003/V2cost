
import React from 'react';
import { EstimationState, CalculationResults } from '../types';

interface Props {
  state: EstimationState;
  results: CalculationResults;
  onPrev: () => void;
}

const SummaryView: React.FC<Props> = ({ state, results, onPrev }) => {
  const { breakdown } = results;

  return (
    <div className="flex flex-col gap-8 animate-fadeIn max-w-[1280px] mx-auto pb-20">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <h1 className="text-text-main dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">Cost Summary</h1>
            <span className="text-xs font-mono font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/20 shadow-sm">{state.projectNumber}</span>
          </div>
          <p className="text-text-sub dark:text-gray-400 text-base font-normal">Detailed financial analysis for {state.projectName} - {state.clientName}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 text-sm font-bold text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
            <span>Export PDF</span>
          </button>
          <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-dark text-white px-6 text-sm font-bold transition-colors shadow-sm">
            <span className="material-symbols-outlined text-lg">table_view</span>
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards - Adjusted to 5 columns for desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <SummaryCard 
          icon="payments" 
          label="Total Cost (USD)" 
          value={`$${results.totalCostPerPart.toFixed(2)}`} 
          sub="Per unit total" 
          highlight 
        />
        <SummaryCard 
          icon="science" 
          label="Material Cost" 
          value={`$${breakdown.rawMaterial.toFixed(2)}`} 
          sub="Raw Mat. Total" 
          color="bg-slate-100 text-slate-600"
        />
        <SummaryCard 
          icon="precision_manufacturing" 
          label="Process Cost" 
          value={`$${breakdown.process.toFixed(2)}`} 
          sub="/hr base rate" 
          trend="Base Rate Optimized" 
        />
        <SummaryCard 
          icon="monitoring" 
          label="Profit Margin" 
          value="8.0%" 
          sub={`Target reached ($${breakdown.profit.toFixed(2)})`} 
        />
        <SummaryCard 
          icon="factory" 
          label="Overhead (OH)" 
          value="10.0%" 
          sub={`Factory Standard ($${breakdown.overhead.toFixed(2)})`} 
        />
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Breakdown Table */}
        <div className="lg:col-span-2 flex flex-col rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-text-main dark:text-white">Detailed Cost Breakdown</h3>
            <button className="text-primary text-sm font-semibold hover:underline">View Full Log</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-text-sub dark:text-gray-400 font-medium border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4">Cost Parameter</th>
                  <th className="px-6 py-4">Specification / Rate</th>
                  <th className="px-6 py-4 text-right">Value (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <BreakdownRow label="Raw Material" spec="Net Part + Runner" value={breakdown.rawMaterial} color="bg-slate-400" />
                <BreakdownRow label="Process Cost" spec="USD/hr Base Rate" value={breakdown.process} color="bg-blue-500" />
                <BreakdownRow label="ICC" spec="1% Carrying" value={breakdown.icc} color="bg-indigo-500" />
                <BreakdownRow label="Rejection" spec="2% Allowance" value={breakdown.rejection} color="bg-red-500" />
                <BreakdownRow label="Profit" spec="8% Target" value={breakdown.profit} color="bg-emerald-500" />
                <BreakdownRow label="OH (Overhead)" spec="10% Standard" value={breakdown.overhead} color="bg-purple-500" />
                <BreakdownRow label="Packaging" spec="2% Materials" value={breakdown.packaging} color="bg-amber-500" />
                <BreakdownRow label="Logistics" spec="3% Shipping" value={breakdown.logistics} color="bg-orange-500" />
              </tbody>
              <tfoot className="bg-gray-50 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-700">
                <tr>
                  <td className="px-6 py-4 font-bold text-text-main dark:text-white" colSpan={2}>Total Cost (USD)</td>
                  <td className="px-6 py-4 text-right font-black text-primary dark:text-blue-400 text-lg">${results.totalCostPerPart.toFixed(3)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Right Column: Doughnut Chart */}
        <div className="flex flex-col rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          <h3 className="text-lg font-bold text-text-main dark:text-white mb-6 relative z-10">Cost Composition</h3>
          
          <div className="flex items-center justify-center py-4 mb-4 relative z-10">
            <div className="relative w-56 h-56 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle className="text-gray-100 dark:text-gray-800" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="12"></circle>
                {/* Simplified doughnut paths for demo purposes - in real app use Recharts/Victory */}
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#94a3b8" strokeDasharray="100 251.2" strokeDashoffset="0" strokeWidth="12"></circle>
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#3b82f6" strokeDasharray="50 251.2" strokeDashoffset="-100" strokeWidth="12"></circle>
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#6366f1" strokeDasharray="12 251.2" strokeDashoffset="-150" strokeWidth="12"></circle>
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#ef4444" strokeDasharray="25 251.2" strokeDashoffset="-162" strokeWidth="12"></circle>
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#10b981" strokeDasharray="38 251.2" strokeDashoffset="-187" strokeWidth="12"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-text-sub uppercase tracking-widest mb-1">Total</span>
                <span className="text-3xl font-black text-text-main dark:text-white tracking-tight">${results.totalCostPerPart.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <ChartLegend label="Material" percent="40%" value={breakdown.rawMaterial.toFixed(2)} color="bg-slate-400" />
            <ChartLegend label="Process" percent="20%" value={breakdown.process.toFixed(2)} color="bg-blue-500" />
            <ChartLegend label="ICC" percent="5%" value={breakdown.icc.toFixed(2)} color="bg-indigo-500" />
            <ChartLegend label="Rejection" percent="10%" value={breakdown.rejection.toFixed(2)} color="bg-red-500" />
            <ChartLegend label="Profit" percent="15%" value={breakdown.profit.toFixed(2)} color="bg-emerald-500" />
            <ChartLegend label="Overhead" percent="10%" value={breakdown.overhead.toFixed(2)} color="bg-purple-500" span />
          </div>
        </div>
      </div>

      {/* Analysis Block */}
      <div className="rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary dark:text-blue-400 shrink-0">
            <span className="material-symbols-outlined text-2xl">analytics</span>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-text-main dark:text-white">Cost Structure Analysis</h3>
            <div className="prose prose-sm dark:prose-invert max-w-none text-text-sub dark:text-gray-300">
              <p className="leading-relaxed text-base">
                The current cost model for <strong>{state.projectName}</strong> highlights a projected annual impact of <strong>${(results.totalAnnualProjectCost / 1000).toFixed(1)}k</strong>.
                The <strong>raw material</strong> component represents the largest variable cost, while <strong>process optimization</strong> through cycle time reduction could significantly impact the total unit price. 
                Efficiency is rated at <strong>{state.efficiency}%</strong> on an <strong>{results.hourlyOutput} pcs/hr</strong> basis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Waterfall Visual Representation */}
      <div className="rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-lg font-bold text-text-main dark:text-white">Cost Waterfall Analysis</h3>
            <p className="text-sm text-text-sub dark:text-gray-400 mt-1">Component contribution to final unit price</p>
          </div>
        </div>
        
        <div className="relative w-full h-80 pt-10">
          <div className="absolute inset-0 ml-12 flex items-end justify-between gap-4 sm:gap-10 pb-10">
             <WaterfallBar label="Raw Mat." height="70%" color="bg-slate-400" value={`$${breakdown.rawMaterial.toFixed(2)}`} />
             <WaterfallBar label="Process" height="15%" color="bg-blue-500" value={`$${breakdown.process.toFixed(2)}`} />
             <WaterfallBar label="Logistics" height="8%" color="bg-orange-500" value={`$${breakdown.logistics.toFixed(2)}`} />
             <WaterfallBar label="Others" height="12%" color="bg-indigo-500" value={`$${(breakdown.icc + breakdown.rejection + breakdown.overhead + breakdown.packaging).toFixed(2)}`} />
             <WaterfallBar label="Profit" height="10%" color="bg-emerald-500" value={`$${breakdown.profit.toFixed(2)}`} />
             <WaterfallBar label="Total" height="100%" color="bg-primary" value={`$${results.totalCostPerPart.toFixed(2)}`} isTotal />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={onPrev}
          className="flex-1 px-4 h-14 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Back to Parameters
        </button>
        <button className="flex-[2] px-4 h-14 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
          Finish & Submit for Review
          <span className="material-symbols-outlined text-sm">send</span>
        </button>
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{ icon: string, label: string, value: string, sub: string, highlight?: boolean, trend?: string, color?: string }> = ({ icon, label, value, sub, highlight, trend, color }) => (
  <div className={`flex flex-col gap-3 rounded-xl p-6 border shadow-sm transition-transform hover:-translate-y-1 duration-200 ${highlight ? 'bg-primary/5 border-primary/20' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700'}`}>
    <div className="flex items-center gap-2 text-text-sub dark:text-gray-400">
      <div className={`flex items-center justify-center size-7 rounded-full ${color || 'bg-slate-100 text-slate-500'}`}>
        <span className="material-symbols-outlined text-lg">{icon}</span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider">{label}</p>
    </div>
    <p className={`text-3xl font-bold leading-tight ${highlight ? 'text-primary dark:text-blue-400' : 'text-text-main dark:text-white'}`}>{value}</p>
    <div className="flex items-center gap-1">
      {trend && (
        <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">
          <span className="material-symbols-outlined text-sm">trending_down</span>
          <span>{trend}</span>
        </div>
      )}
      {!trend && <p className="text-[10px] text-text-sub dark:text-gray-500 uppercase font-medium">{sub}</p>}
    </div>
  </div>
);

const BreakdownRow: React.FC<{ label: string, spec: string, value: number, color: string }> = ({ label, spec, value, color }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
    <td className="px-6 py-4 font-medium text-text-main dark:text-white flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      {label}
    </td>
    <td className="px-6 py-4 text-text-sub dark:text-gray-400">{spec}</td>
    <td className="px-6 py-4 text-right font-medium text-text-main dark:text-gray-200">${value.toFixed(4)}</td>
  </tr>
);

const ChartLegend: React.FC<{ label: string, percent: string, value: string, color: string, span?: boolean }> = ({ label, color, percent, value, span }) => (
  <div className={`flex items-center justify-between text-[10px] p-2 rounded bg-gray-50 dark:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors ${span ? 'col-span-2' : ''}`}>
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${color}`}></span>
      <span className="text-text-sub font-bold uppercase">{label}</span>
    </div>
    <div className="text-right flex items-center gap-2">
      <span className="font-black text-text-main dark:text-white">{percent}</span>
      <span className="text-text-sub">${value}</span>
    </div>
  </div>
);

const WaterfallBar: React.FC<{ label: string, height: string, color: string, value: string, isTotal?: boolean }> = ({ label, height, color, value, isTotal }) => (
  <div className="relative w-full h-full flex flex-col justify-end group">
    <div className={`w-full ${color} rounded-sm relative transition-all hover:brightness-110 shadow-sm`} style={{ height }}>
      <div className={`absolute -top-7 left-1/2 -translate-x-1/2 ${isTotal ? 'bg-primary' : 'bg-gray-900'} text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold`}>
        {value}
      </div>
    </div>
    <div className={`absolute -bottom-8 w-full text-center text-[10px] font-bold uppercase tracking-tighter ${isTotal ? 'text-primary dark:text-blue-400' : 'text-text-sub dark:text-gray-500'}`}>
      {label}
    </div>
  </div>
);

export default SummaryView;
