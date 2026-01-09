import React, { useState, useMemo, useEffect, useRef } from 'react';
import { EstimationState } from './types.ts';
import { MATERIALS, MACHINES } from './constants.ts';
import { performCalculations } from './utils/calculations.ts';
import DashboardView from './components/DashboardView.tsx';
import PartConfigView from './components/PartConfigView.tsx';
import MaterialConfigView from './components/MaterialConfigView.tsx';
import MachineConfigView from './components/MachineConfigView.tsx';
import CycleTimeView from './components/CycleTimeView.tsx';
import SummaryView from './components/SummaryView.tsx';
import LandingView from './components/LandingView.tsx';
import LoginView from './components/LoginView.tsx';
import PartLibraryView from './components/PartLibraryView.tsx';
import ProfileView from './components/ProfileView.tsx';
import MHRAnalysisView from './components/MHRAnalysisView.tsx';

type ViewState = 'landing' | 'login' | 'estimating';

const generateProjectNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `CE-${year}${month}${day}-${random}`;
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [step, setStep] = useState(0);
  const mainContentRef = useRef<HTMLElement>(null);

  const [state, setState] = useState<EstimationState>({
    projectName: 'Housing X5',
    projectNumber: generateProjectNumber(),
    annualVolume: 50000,
    region: 'na',
    commodity: 'Plastics - Injection',
    clientName: 'Acme Corp',
    costingResponsibility: '',
    baseMaterial: { family: 'ABS', grade: 'Lustran GP', dosage: 93.0, rmRate: 3.11, scrapRate: 0.62 },
    masterbatch1: { family: 'Color', grade: 'Avient 15RL312', dosage: 5.0, rmRate: 5.56, scrapRate: 0.00 },
    masterbatch2: { family: 'UV', grade: 'Avient UV2S', dosage: 2.0, rmRate: 10.00, scrapRate: 0.00 },
    recycle: { family: 'ABS', grade: 'Lustran GP', dosage: 20.0, rmRate: 0.00, scrapRate: 0.00 },
    runnerType: 'cold',
    runnerWeight: 12.5,
    partLength: 120.5,
    partWidth: 85.2,
    partHeight: 40.0,
    partVolume: 124.50,
    wallThickness: 2.1,
    maxWallThickness: 3.5,
    minWallThickness: 1.2,
    avgWallThickness: 2.1,
    surfaceArea: 450.20,
    projectedArea: 45.2,
    density: 1.04,
    materialId: MATERIALS[0].id,
    regrindPercentage: 15,
    machineId: MACHINES[1].id,
    manufacturer: 'Engel',
    machineModel: 'Duo5550/900',
    cavities: 2,
    efficiency: 95,
    injectionPressure: 800,
    demoldTemp: 76,
    injTemp: 237,
    moldTemp: 58,
    injectionTime: 4.2,
    coolingTimeManual: 18.0,
    actuationTime: 2.5,
    ejectionTime: 1.8,
    loadingTime: 8.0
  });

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.warn("Theme persistence unavailable", e);
    }
  }, []);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [step, currentView]);

  const results = useMemo(() => performCalculations(state), [state]);

  const updateState = (updates: Partial<EstimationState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleStartEstimation = () => {
    if (isLoggedIn) {
      setCurrentView('estimating');
      setStep(0);
    } else {
      setCurrentView('login');
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('estimating');
    setStep(0);
  };

  const handleToggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('theme', 'dark'); } catch(e) {}
    } else {
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem('theme', 'light'); } catch(e) {}
    }
  };

  const renderToolStep = () => {
    switch (step) {
      case 0: return <DashboardView state={state} onUpdate={updateState} onNext={() => setStep(1)} onCancel={() => setCurrentView('landing')} />;
      case 1: return <PartConfigView state={state} onUpdate={updateState} onNext={() => setStep(2)} onPrev={() => setStep(0)} />;
      case 2: return <MaterialConfigView state={state} onUpdate={updateState} onNext={() => setStep(3)} onPrev={() => setStep(1)} />;
      case 3: return <MachineConfigView state={state} onUpdate={updateState} onNext={() => setStep(8)} onPrev={() => setStep(2)} />;
      case 8: return <MHRAnalysisView />;
      case 4: return <CycleTimeView state={state} results={results} onUpdate={updateState} onNext={() => setStep(5)} onPrev={() => setStep(8)} />;
      case 5: return <SummaryView state={state} results={results} onPrev={() => setStep(4)} />;
      case 6: return <PartLibraryView />;
      case 7: return <ProfileView />;
      default: return null;
    }
  };

  const isProjectActive = (step >= 1 && step <= 5) || step === 8;

  if (currentView === 'landing') {
    return <LandingView onStart={handleStartEstimation} />;
  }

  if (currentView === 'login') {
    return <LoginView onLogin={handleLogin} onBack={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen flex flex-row font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark shadow-xl z-30">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 dark:border-border-dark flex flex-col gap-1">
             <div className="flex items-center gap-3">
               <div className="bg-primary size-8 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md">
                 <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
               </div>
               <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-normal tracking-tight">CostEst.ai</h1>
             </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            <div className="mb-4">
              <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-2">General</p>
              <NavItem label="Dashboard" icon="dashboard" active={step === 0} onClick={() => setStep(0)} />
            </div>

            <div className="mb-4">
              <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-2">Execution</p>
              <NavItem label="Projects" icon="folder" active={isProjectActive} onClick={() => { if(!isProjectActive) setStep(1); }} hasChildren={isProjectActive} />
              
              {isProjectActive && (
                <div className="ml-4 pl-3 border-l-2 border-slate-100 dark:border-border-dark space-y-1 mt-2 mb-4 animate-fadeIn">
                  <div className="flex items-center gap-2 px-3 py-2 text-primary dark:text-blue-400 font-bold text-xs bg-primary/5 dark:bg-primary/10 rounded mb-2">
                    <span className="material-symbols-outlined text-sm">inventory_2</span>
                    <div className="flex flex-col min-w-0">
                      <span className="truncate">{state.projectName}</span>
                      <span className="text-[9px] opacity-60 font-mono tracking-tighter truncate">{state.projectNumber}</span>
                    </div>
                  </div>
                  <TreeItem label="Part Parameters" icon="view_in_ar" active={step === 1} onClick={() => setStep(1)} />
                  <TreeItem label="Material Config" icon="science" active={step === 2} onClick={() => setStep(2)} />
                  <TreeItem label="Machine Config" icon="settings_applications" active={step === 3} onClick={() => setStep(3)} />
                  <TreeItem label="MHR Analysis" icon="settings_input_component" active={step === 8} onClick={() => setStep(8)} />
                  <TreeItem label="Cycle Analysis" icon="schedule" active={step === 4} onClick={() => setStep(4)} />
                  <TreeItem label="Cost Summary" icon="pie_chart" active={step === 5} onClick={() => setStep(5)} />
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-border-dark mt-4">
              <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-2">Resources</p>
              <NavItem label="Part Library" icon="list_alt" active={step === 6} onClick={() => setStep(6)} />
            </div>
          </nav>

          <div className="p-4 border-t border-slate-100 dark:border-border-dark space-y-1">
             <button 
                onClick={() => setStep(7)}
                className={`flex items-center gap-3 px-3 py-3 w-full text-left rounded-xl mb-2 transition-all group ${step === 7 ? 'bg-primary/10 ring-1 ring-primary/20' : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
             >
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-500 ring-2 ring-white dark:ring-slate-700 shadow-sm overflow-hidden group-hover:ring-primary/20 transition-all">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfyxXUam9mKf4Kfu77UrPP9efqogagj7HCx2HG5HbQ1uo52ntLJgFl2e9Qjrn_A-dox1x8X2bJ8NLSRIoMy1JHaHKBkiIDpSSqKThXz2dSgqgVhi2i0kChg8N9sI1v-83CbnBpgnuOqCLJaTFc2MGnMSWiFbOXIeMbeqjXnqV18Hj9wZ5r1JrGTTs-O9LBTzd0GtYSWA6AuXKu8Kxv3VPM34NZsjebRWphH3z7CxtgDgRAPAcBdilk24lSSKvq8Kj5JzROUOGRD9k" alt="Profile" />
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Alex Morgan</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">alex@company.com</p>
              </div>
            </button>
            
            <NavItem 
              label="Settings" 
              icon="settings" 
              active={step === 7} 
              onClick={() => setStep(7)} 
            />

            <button onClick={() => setCurrentView('landing')} className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-500 hover:text-red-600 transition-colors font-medium text-sm">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark px-8 py-3 shrink-0 z-20 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-slate-900 dark:text-white">
              <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 lg:hidden">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h2 className="text-lg font-bold leading-tight tracking-tight">
                {step === 6 ? 'Part Library' : step === 7 ? 'User Profile' : step === 8 ? 'MHR Analysis' : (isProjectActive ? `Estimating: ${state.projectName}` : 'CostEst.ai')}
              </h2>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-6 items-center">
            <div className="hidden lg:flex items-center gap-6">
              <a className="text-slate-600 dark:text-slate-300 hover:text-primary text-sm font-medium transition-colors cursor-pointer">Help Center</a>
              <a className="text-slate-600 dark:text-slate-300 hover:text-primary text-sm font-medium transition-colors cursor-pointer">Documentation</a>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-border-dark"></div>
            <button className="text-slate-500 hover:text-primary transition-colors flex items-center justify-center" onClick={handleToggleDarkMode}>
              <span className="material-symbols-outlined dark:hidden">light_mode</span>
              <span className="material-symbols-outlined hidden dark:block">dark_mode</span>
            </button>
            <button className="relative">
              <span className="material-symbols-outlined text-slate-500 hover:text-primary transition-colors">notifications</span>
              <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark"></span>
            </button>
          </div>
        </header>

        <main ref={mainContentRef} className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          <div className="page-transition h-full max-w-[1400px] mx-auto">
            {renderToolStep()}
          </div>
        </main>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ label: string, icon: string, active: boolean, onClick: () => void, hasChildren?: boolean }> = ({ label, icon, active, onClick, hasChildren }) => (
  <a onClick={onClick} className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all cursor-pointer group ${active ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
    <div className="flex items-center gap-3">
      <span className={`material-symbols-outlined text-[22px] ${active ? 'text-primary fill' : 'text-slate-400 group-hover:text-primary'}`}>{icon}</span>
      <p className={`text-sm font-semibold tracking-tight`}>{label}</p>
    </div>
    {hasChildren !== undefined && (
      <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${active ? 'rotate-180 text-primary' : 'opacity-50'}`}>expand_more</span>
    )}
  </a>
);

const TreeItem: React.FC<{ label: string, icon: string, active: boolean, onClick: () => void }> = ({ label, icon, active, onClick }) => (
  <a onClick={onClick} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all cursor-pointer group relative ${active ? 'bg-primary/10 text-primary font-bold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
    <span className={`material-symbols-outlined text-[18px] ${active ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}>{icon}</span>
    <p className={`text-[13px] font-medium leading-tight`}>{label}</p>
    {active && <div className="absolute left-[-15px] w-2 h-2 rounded-full bg-primary ring-4 ring-primary/20"></div>}
  </a>
);

export default App;