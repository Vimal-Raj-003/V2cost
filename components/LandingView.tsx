
import React from 'react';

interface Props {
  onStart: () => void;
}

const LandingView: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0 pointer-events-none tech-grid-bg h-screen"></div>
      
      {/* Hero Section */}
      <section className="relative z-10 w-full flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-12 lg:py-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px]"></div>
        
        <div className="max-w-[1280px] w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-6 flex-1 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-white border border-surface-border shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-medium text-primary uppercase tracking-wide">V2.0 Engine Live</span>
              </div>
              <h1 className="text-text-main text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-[-0.03em] drop-shadow-sm">
                V2Cost. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-800">Precision Costing</span>
              </h1>
              <p className="text-text-muted text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                AI-driven estimates for Injection Molding, Machining, Die Casting, and more. Upload CAD, get instant BOM analysis and cost breakdowns.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <button 
                  onClick={onStart}
                  className="group flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold tracking-wide transition-all shadow-[0_4px_14px_rgba(19,91,236,0.4)] hover:shadow-[0_6px_20px_rgba(19,91,236,0.6)] hover:-translate-y-0.5"
                >
                  <span className="mr-2">Start Free Estimation</span>
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <button className="flex items-center justify-center rounded-lg h-12 px-6 bg-white border border-surface-border text-text-main text-base font-bold transition-all hover:bg-gray-50 hover:border-gray-300 shadow-sm">
                  <span className="mr-2 material-symbols-outlined text-[20px] text-primary">play_circle</span>
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px] text-green-600">check_circle</span> No credit card required
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px] text-green-600">check_circle</span> SOC2 Compliant
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative">
              <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-gray-800 bg-[#0f1115] shadow-2xl group">
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
                  </div>
                  <div className="px-2 py-1 rounded bg-black/40 text-[10px] text-primary font-mono border border-primary/20">
                    ANALYZING: GEAR_ASSEMBLY_V4.STEP
                  </div>
                </div>
                <div 
                  className="absolute inset-0 bg-center bg-cover opacity-80 mix-blend-lighten" 
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLWZyQfqYB-fopjSa7zq5JWMWJHV8eB2x98kc8z6xhTe8w3M0Q7C9UiuZpdef1Z4hP74JHpQyrWeVFrjG-wBvssulRtyPwRvsjqlX5xnvHC3F8pkzGd4oQ4tMV9eP6XpaP9esO27sMEJOFNSm8zF0b5FWO6Ur7qoFb282LGWNxBERHyxsM6gGxX3wiW_cBTxPokJ5vX4djaen_AWVCxtWm6zzp5hElQHZYBK980w0K5adxql_bEpPAJEADmekJLiQ8Bqbd343WyZA")'}}
                ></div>
                <div className="absolute bottom-10 left-6 bg-black/60 backdrop-blur-md border border-gray-700 p-4 rounded-lg w-48 animate-pulse shadow-lg">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xs text-gray-400">Material Cost</span>
                    <span className="text-sm font-bold text-white">$12.45</span>
                  </div>
                  <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[70%]"></div>
                  </div>
                </div>
                <div className="absolute top-20 right-6 bg-black/60 backdrop-blur-md border border-gray-700 p-3 rounded-lg flex gap-3 items-center shadow-lg transform translate-y-4 transition-transform group-hover:translate-y-0">
                  <div className="size-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">Manufacturability</div>
                    <div className="text-xs font-bold text-white">High (98%)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-gray-50 border-y border-surface-border relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2 p-6 rounded-xl border border-surface-border bg-white hover:shadow-md transition-all group">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 text-sm font-medium">Cost Reduction</p>
                <span className="material-symbols-outlined text-primary opacity-50 group-hover:opacity-100 transition-opacity">trending_down</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-text-main text-3xl font-bold tracking-tight">30%</p>
                <p className="text-green-600 text-sm font-medium flex items-center">
                  <span className="material-symbols-outlined text-[16px] mr-1">arrow_upward</span>
                  15% efficiency
                </p>
              </div>
              <div className="w-full bg-gray-100 h-1 mt-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[30%] shadow-[0_0_10px_rgba(19,91,236,0.4)]"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-6 rounded-xl border border-surface-border bg-white hover:shadow-md transition-all group">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 text-sm font-medium">Estimation Speed</p>
                <span className="material-symbols-outlined text-primary opacity-50 group-hover:opacity-100 transition-opacity">speed</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-text-main text-3xl font-bold tracking-tight">10x</p>
                <p className="text-gray-500 text-sm font-medium">Faster than manual</p>
              </div>
              <div className="w-full bg-gray-100 h-1 mt-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[90%] shadow-[0_0_10px_rgba(19,91,236,0.4)]"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-6 rounded-xl border border-surface-border bg-white hover:shadow-md transition-all group">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 text-sm font-medium">Accuracy Rate</p>
                <span className="material-symbols-outlined text-primary opacity-50 group-hover:opacity-100 transition-opacity">fact_check</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-text-main text-3xl font-bold tracking-tight">98%</p>
                <p className="text-green-600 text-sm font-medium">+2% vs engineers</p>
              </div>
              <div className="w-full bg-gray-100 h-1 mt-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[98%] shadow-[0_0_10px_rgba(19,91,236,0.4)]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-gray-50 border-t border-surface-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-text-main mb-4">One Tool, Every Material</h2>
              <p className="text-text-muted text-lg">From complex plastics to heavy metals, our engine handles the complexity of modern manufacturing processes with dedicated physics-based logic for each commodity.</p>
            </div>
            <button className="text-primary font-bold hover:text-blue-700 transition-colors flex items-center">
              View all capabilities <span className="material-symbols-outlined ml-1">arrow_forward</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CapabilityCard 
              title="Plastic Injection Molding" 
              desc="Instant mold cost analysis, cycle time prediction, and resin selection optimization."
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuDZQqRR07ywtRGqA8hW7rsLy34C8DXYXfNoVruEf5N_RWpnaeA5Exv_AIuhvwIl70_sJbYfi7tDEOCG0fhatCiQ6Nmc7Vj3ERI-Va2uJ_FPrqJEziyw92imwSyLpEmll6loKzrK0nEpPCYRWrr7Y4PGHy5fxI15TrHFemA-XHsvYOmiWF3dV3xqqSsXobioAxNXl6NuhC-ElBt0IEHwZD2aXthHZHjx-CLnm6H-YJqehT7fQZdPtI2PmNjUyi46ro_x8TkFyaJeQPY"
              icon="category"
            />
            <CapabilityCard 
              title="Sheet Metal Fabrication" 
              desc="Automatic flat pattern generation, bending unfolding rules, and laser nesting efficiency."
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuBCy9yrbLd4jf1hfGY2-m2qi3TE_61irFFkDc3sY2vlxwnIC1nVj15immv3yXGx2m3gx1RATIfpslxiQvx9ro9mB2y_ymAguo5_mubjoKA_dcdgCuc2mshZHUk-XyzZ0N9zrwooRvAxuxtksgcBDNFWHDLeL8PQ7FXAVGGk94c05HdVbqI3xm_1Ehv3AY1aw2aUqhKlCg7wdngwUHKstmIko74s-WqLYZk7SGfKAHnjJhAFZZLAYp8OAvBKQGBrbigxW0FRuVWmhY8"
              icon="layers"
            />
            <CapabilityCard 
              title="High-Pressure Die Casting" 
              desc="Thermal analysis, shot weight calculation, and material flow cost factors."
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuAf687itjnF-fu-3KVvTpIthDHU6zV5-6BVn7Rt8d-gw5SvHj2muHcVG0lG_y8VDnMjZjiYbLP-53qLDptMREBrC-6FoKtJMCfvRB0qPoT3G8sVFfR7tZpHzcP3YFejfv1sHxnt1KAD8uRiI59IWj5_3O3lFWJQ2rwVxGXKNMJC8h8O5_z6_7Uy9zQ500Di5n2sDQW4fuFpONiDrfqbo8dfAJa1Mhr9g1xr1nB6h9rPSzNZn0pcmLbXW7-TTRUf_4fEMlRpa5uBQZg"
              icon="whatshot"
            />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-primary/5 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-text-main mb-6 tracking-tight">Ready to optimize your supply chain?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Join 500+ manufacturing companies using V2Cost. to quote faster and win more business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStart}
              className="flex items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-lg font-bold tracking-wide transition-all shadow-[0_4px_14px_rgba(19,91,236,0.5)] hover:shadow-[0_6px_20px_rgba(19,91,236,0.7)] hover:-translate-y-1"
            >
              Start Free Trial
            </button>
            <button className="flex items-center justify-center rounded-lg h-14 px-8 bg-white border border-surface-border text-text-main text-lg font-bold transition-all hover:bg-gray-50 hover:border-gray-300 shadow-sm">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 border-t border-surface-border pt-16 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-8 border-t border-surface-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">© 2024 V2Cost. Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="text-gray-400 hover:text-gray-900" href="#"><span className="sr-only">Twitter</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a>
              <a className="text-gray-400 hover:text-gray-900" href="#"><span className="sr-only">GitHub</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill-rule="evenodd"></path></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const CapabilityCard: React.FC<{title: string, desc: string, img: string, icon: string}> = ({title, desc, img, icon}) => (
  <div className="group relative overflow-hidden rounded-xl bg-white border border-surface-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 shadow-sm">
    <div 
      className="h-48 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" 
      style={{backgroundImage: `url("${img}")`}}
    ></div>
    <div className="relative z-20 p-6 -mt-8 sm:-mt-12">
      <div className="size-12 rounded-lg bg-primary flex items-center justify-center text-white mb-4 shadow-lg border border-white">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-text-main mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  </div>
);

export default LandingView;
