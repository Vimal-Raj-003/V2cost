import React, { useState, useMemo } from 'react';

const MHRAnalysisView: React.FC = () => {
  // Local state for MHR calculation
  const [acquisitionValue, setAcquisitionValue] = useState(431600);
  const [installExp, setInstallExp] = useState(5);
  const [depreciationYears, setDepreciationYears] = useState(10);
  const [interestRate, setInterestRate] = useState(6.0);
  const [leasingRate, setLeasingRate] = useState(4.50);
  const [ratedPower, setRatedPower] = useState(90);
  const [energyCost, setEnergyCost] = useState(0.07);
  const [maintenancePercent, setMaintenancePercent] = useState(5.0);
  const [prodDays, setProdDays] = useState(240);
  const [shiftsPerDay, setShiftsPerDay] = useState(3);
  const [hrsPerShift, setHrsPerShift] = useState(7.5);
  const [utilization, setUtilization] = useState(93);

  // Computed Values
  const totalInvestment = useMemo(() => acquisitionValue * (1 + installExp / 100), [acquisitionValue, installExp]);
  const capacityYear = useMemo(() => prodDays * shiftsPerDay * hrsPerShift * (utilization / 100), [prodDays, shiftsPerDay, hrsPerShift, utilization]);
  
  const imputedDepreciation = useMemo(() => (totalInvestment / depreciationYears) / capacityYear, [totalInvestment, depreciationYears, capacityYear]);
  const imputedInterest = useMemo(() => (totalInvestment * (interestRate / 100)) / capacityYear, [totalInvestment, interestRate, capacityYear]);
  const spaceCosts = useMemo(() => (leasingRate * 12) / 200, [leasingRate]); // Simplified logic for demo
  const energyConsumption = useMemo(() => ratedPower * energyCost, [ratedPower, energyCost]);
  
  const fixedRate = imputedDepreciation + imputedInterest + spaceCosts;
  const variableRate = energyConsumption + (totalInvestment * (maintenancePercent / 100) / capacityYear);
  const totalMHR = fixedRate + variableRate;

  return (
    <div className="animate-fadeIn pb-20 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Machine-Hour Rate Calculation</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Industrial asset cost estimation and operational efficiency analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Basic Data */}
          <section className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">precision_manufacturing</span>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Machine Basic Data</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Designation" value="Duo5550/900" readOnly />
              <InputGroup label="Clamping Force (kN)" value="9000" readOnly />
              <InputGroup label="Make" value="Premium Manufacturer" readOnly />
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Costing Region</label>
                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-border-dark rounded-xl h-11 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                  <option>USA</option>
                  <option>India</option>
                  <option>Germany</option>
                </select>
              </div>
            </div>
          </section>

          {/* Capacity Factor */}
          <section className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Capacity Factor</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <InputGroup label="Days/Yr" value={prodDays} onChange={(v) => setProdDays(Number(v))} type="number" />
              <InputGroup label="Shifts/Day" value={shiftsPerDay} onChange={(v) => setShiftsPerDay(Number(v))} type="number" />
              <InputGroup label="Hrs/Shift" value={hrsPerShift} onChange={(v) => setHrsPerShift(Number(v))} type="number" />
              <InputGroup label="Util (%)" value={utilization} onChange={(v) => setUtilization(Number(v))} type="number" />
            </div>
            <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Total Capacity Year</span>
              <span className="text-lg font-black text-primary">{capacityYear.toLocaleString(undefined, { minimumFractionDigits: 2 })} hrs</span>
            </div>
          </section>

          {/* Investment */}
          <section className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">account_balance</span>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Investment</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Acquisition Value (USD)" value={acquisitionValue} onChange={(v) => setAcquisitionValue(Number(v))} type="number" />
              <InputGroup label="Installation Exp (%)" value={installExp} onChange={(v) => setInstallExp(Number(v))} type="number" />
            </div>
            <div className="mt-6 bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl flex justify-between items-center border border-primary/20">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Total Investment</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">${totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
              <span className="material-symbols-outlined text-primary text-5xl opacity-40">payments</span>
            </div>
          </section>

          {/* Costs Detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500">lock</span>
                  <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Fixed Costs</h2>
                </div>
                <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-2 py-1 rounded">VARIABLE BASE</span>
              </div>
              <div className="space-y-4">
                <InputGroup label="Deprec. (Years)" value={depreciationYears} onChange={(v) => setDepreciationYears(Number(v))} type="number" compact />
                <InputGroup label="Interest Rate (%)" value={interestRate} onChange={(v) => setInterestRate(Number(v))} type="number" compact />
                <InputGroup label="Leasing ($/sqft/mo)" value={leasingRate} onChange={(v) => setLeasingRate(Number(v))} type="number" compact />
              </div>
            </section>

            <section className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500">bolt</span>
                  <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Variable Costs</h2>
                </div>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">CONSUMPTION</span>
              </div>
              <div className="space-y-4">
                <InputGroup label="Rated Power (kW)" value={ratedPower} onChange={(v) => setRatedPower(Number(v))} type="number" compact />
                <InputGroup label="Energy Cost ($/kWh)" value={energyCost} onChange={(v) => setEnergyCost(Number(v))} type="number" compact />
                <InputGroup label="Maintenance (%)" value={maintenancePercent} onChange={(v) => setMaintenancePercent(Number(v))} type="number" compact />
              </div>
            </section>
          </div>
        </div>

        {/* Right Column - Results & Flow */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-primary to-blue-700 p-8 rounded-[2rem] text-white shadow-2xl shadow-primary/30 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-blue-100 uppercase tracking-[0.2em] text-[10px] font-black mb-1">Estimated Machine-Hour Rate</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black tabular-nums tracking-tighter">{totalMHR.toFixed(2)}</span>
                <span className="text-xl font-medium opacity-80 uppercase tracking-widest">USD/h</span>
              </div>
              <div className="mt-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Live calculation</span>
                <span className="opacity-40">|</span>
                <span>Region: USA</span>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
              <span className="material-symbols-outlined text-[200px] leading-none">monitoring</span>
            </div>
          </div>

          {/* Logic Architecture Flow */}
          <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm relative">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">hub</span>
                Cost Logic Architecture
              </h3>
              <span className="text-[9px] font-mono bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-slate-400">LINEAR FLOW V5.0</span>
            </div>

            <div className="relative flex items-center justify-between gap-0 w-full mb-12 h-24">
              {/* Principal Node */}
              <div className="relative z-10 flex flex-col items-center group w-20">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-primary shadow-[0_0_20px_rgba(19,91,236,0.3)] flex items-center justify-center relative transition-transform hover:-translate-y-1">
                  <span className="material-symbols-outlined text-primary text-2xl">account_balance</span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping"></div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Principal</p>
                  <p className="text-xs font-black text-slate-900 dark:text-white">${(totalInvestment/1000).toFixed(0)}K</p>
                </div>
              </div>

              {/* Path 1 */}
              <div className="flex-grow h-px border-t-2 border-dashed border-primary/30 mx-2 mb-8"></div>

              {/* Mid Nodes */}
              <div className="flex gap-4 relative z-10 mb-8">
                <div className="flex flex-col items-center group w-20">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-500/30 flex flex-col items-center justify-center shadow-sm hover:border-amber-500 transition-colors">
                    <span className="material-symbols-outlined text-amber-500 text-lg">lock</span>
                    <span className="text-[9px] font-black text-amber-600">${fixedRate.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 text-[9px] font-black uppercase text-amber-600/70 tracking-widest">Fixed</div>
                </div>
                <div className="flex flex-col items-center group w-20">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500/30 flex flex-col items-center justify-center shadow-sm hover:border-emerald-500 transition-colors">
                    <span className="material-symbols-outlined text-emerald-500 text-lg">bolt</span>
                    <span className="text-[9px] font-black text-emerald-600">${variableRate.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 text-[9px] font-black uppercase text-emerald-600/70 tracking-widest">Variable</div>
                </div>
              </div>

              {/* Path 2 */}
              <div className="flex-grow h-px border-t-2 border-dashed border-primary/30 mx-2 mb-8"></div>

              {/* Final Node */}
              <div className="relative z-10 flex flex-col items-center group w-24 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary text-white border-4 border-white dark:border-slate-800 shadow-xl flex flex-col items-center justify-center relative transform hover:scale-110 transition-transform">
                  <span className="text-sm font-black leading-none">${totalMHR.toFixed(2)}</span>
                  <span className="text-[8px] font-bold uppercase opacity-80 mt-1">USD/H</span>
                </div>
                <div className="mt-3 text-center">
                  <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <p className="text-[8px] font-black uppercase text-primary tracking-widest">Final MHR</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary text-xl">info</span>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Operational nodes are recalculated in real-time. The <span className="font-black text-slate-900 dark:text-slate-200">Linear Architecture</span> ensures all investment parameters propagate through fixed and variable cost components to the final output.
              </p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Metric Breakdown</h3>
            <div className="space-y-4">
              <BreakdownRow label="Imputed Depreciation" value={imputedDepreciation} />
              <BreakdownRow label="Imputed Interest" value={imputedInterest} />
              <BreakdownRow label="Space Costs (Leasing)" value={spaceCosts} />
              <BreakdownRow label="Energy Consumption" value={energyConsumption} />
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Total Machine Rate</span>
                <span className="text-lg font-black text-primary">${totalMHR.toFixed(2)} USD/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputGroup: React.FC<{ label: string, value: any, onChange?: (v: string) => void, type?: string, readOnly?: boolean, compact?: boolean }> = ({ label, value, onChange, type = 'text', readOnly, compact }) => (
  <div className="flex flex-col gap-1.5">
    <label className={`${compact ? 'text-[10px]' : 'text-[10px]'} font-black text-slate-400 uppercase tracking-wider`}>{label}</label>
    <div className="relative group">
      <input 
        className={`w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl ${compact ? 'h-9 px-3 text-xs' : 'h-11 px-4 text-sm'} focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${readOnly ? 'opacity-60 cursor-not-allowed' : ''}`} 
        type={type} 
        value={value} 
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  </div>
);

const BreakdownRow: React.FC<{ label: string, value: number }> = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-500 dark:text-slate-400">{label}</span>
    <span className="font-mono font-bold text-slate-900 dark:text-white">{value.toFixed(2)} <span className="text-[10px] text-slate-400 font-sans">USD/h</span></span>
  </div>
);

export default MHRAnalysisView;