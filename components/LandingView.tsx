import React, { useRef, useEffect } from 'react';

interface Props {
  onStart: () => void;
}

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let particles: Particle[] = [];
    const particleCount = 100;
    const connectionDist = 180;
    const mouse = { x: -1000, y: -1000, radius: 200 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Interaction with mouse
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += dx * force * 0.02;
          this.y += dy * force * 0.02;
        }

        // Wrap edges
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = '#135bec';
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      if (w === 0) w = 1; // Prevent division by zero/NaN
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.strokeStyle = '#135bec';
            ctx.globalAlpha = (1 - dist / connectionDist) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawScanLine = (time: number) => {
      if (!ctx || w <= 0) return;
      
      const scanX = (time * 0.1) % w;
      if (!isFinite(scanX)) return;

      const gradient = ctx.createLinearGradient(scanX - 50, 0, scanX + 50, 0);
      gradient.addColorStop(0, 'rgba(19, 91, 236, 0)');
      gradient.addColorStop(0.5, 'rgba(19, 91, 236, 0.05)');
      gradient.addColorStop(1, 'rgba(19, 91, 236, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(scanX - 50, 0, 100, h);
      
      // Intense thin laser line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(19, 91, 236, 0.2)';
      ctx.lineWidth = 1;
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, h);
      ctx.stroke();
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      drawConnections();
      drawScanLine(time);

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

const LandingView: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none tech-grid-bg h-screen"></div>
      <NeuralBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen py-12 lg:py-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-[1280px] w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-6 flex-1 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1.5 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark shadow-xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">System Status: Optimization Engine Active</span>
              </div>
              <h1 className="text-slate-900 dark:text-white text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-[-0.04em]">
                V2Cost. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-800">Neural Precision</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Advanced AI-powered estimation for high-stakes manufacturing. Upload CAD for instantaneous BOM analysis, cycle time prediction, and financial modeling.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-6">
                <button 
                  onClick={onStart}
                  className="group flex items-center justify-center rounded-xl h-16 px-10 bg-primary text-white text-lg font-black tracking-tight transition-all shadow-[0_8px_20px_rgba(19,91,236,0.3)] hover:shadow-[0_12px_30px_rgba(19,91,236,0.5)] hover:-translate-y-1 active:scale-95"
                >
                  <span className="mr-3">Initialize Analysis</span>
                  <span className="material-symbols-outlined text-[24px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                </button>
                <button className="flex items-center justify-center rounded-xl h-16 px-10 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-lg font-black transition-all hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm border-b-4 active:border-b-0 active:translate-y-1">
                  <span className="mr-3 material-symbols-outlined text-[24px] text-primary">play_circle</span>
                  View Capability
                </button>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative">
              <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1115] shadow-[0_20px_60px_rgba(0,0,0,0.15)] group transition-all duration-700 hover:rotate-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-10"></div>
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-black/60 text-[10px] text-primary font-black font-mono border border-primary/30 backdrop-blur-xl uppercase tracking-widest">
                    Real-time CAD Processing: Active
                  </div>
                </div>
                <div 
                  className="absolute inset-0 bg-center bg-cover opacity-90 transition-transform duration-1000 group-hover:scale-110" 
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLWZyQfqYB-fopjSa7zq5JWMWJHV8eB2x98kc8z6xhTe8w3M0Q7C9UiuZpdef1Z4hP74JHpQyrWeVFrjG-wBvssulRtyPwRvsjqlX5xnvHC3F8pkzGd4oQ4tMV9eP6XpaP9esO27sMEJOFNSm8zF0b5FWO6Ur7qoFb282LGWNxBERHyxsM6gGxX3wiW_cBTxPokJ5vX4djaen_AWVCxtWm6zzp5hElQHZYBK980w0K5adxql_bEpPAJEADmekJLiQ8Bqbd343WyZA")'}}
                ></div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full h-full pointer-events-none">
                   <div className="absolute top-1/4 right-10 bg-white/90 dark:bg-black/80 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-2xl animate-bounce [animation-duration:3s]">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Projected Tonnage</p>
                      <p className="text-xl font-black text-slate-900 dark:text-white">920.5 <span className="text-sm font-medium">kN</span></p>
                   </div>
                   <div className="absolute bottom-1/4 left-10 bg-primary/90 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-2xl text-white">
                      <p className="text-[10px] font-black text-blue-200 uppercase mb-1">Optimization gain</p>
                      <p className="text-xl font-black">+14.2%</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-y border-slate-200 dark:border-border-dark relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <StatBox label="Cost Reduction" value="30%" sub="+15% material efficiency" icon="trending_down" progress={30} />
            <StatBox label="Estimation Speed" value="10x" sub="Instant neural analysis" icon="bolt" progress={90} />
            <StatBox label="Industry Accuracy" value="98%" sub="Certified vs. Manual" icon="verified" progress={98} />
          </div>
        </div>
      </section>

      {/* AI Intelligence Flow Infographic */}
      <section className="py-28 relative z-10 bg-white dark:bg-[#020617] transition-colors duration-300 overflow-hidden">
        {/* Background neural web decor */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M0,30 Q25,60 50,30 T100,30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="25" cy="40" r="1" fill="currentColor" />
            <circle cx="50" cy="50" r="1" fill="currentColor" />
            <circle cx="75" cy="40" r="1" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-20 text-center">
            <h2 className="text-primary font-black text-sm uppercase tracking-[0.3em] mb-4">Neural Architecture</h2>
            <h3 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              How V2Cost AI <br/> <span className="text-slate-400">Generates Precision.</span>
            </h3>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-0">
            {/* The Connecting Path (Desktop) */}
            <div className="hidden lg:block absolute top-[5.5rem] left-0 w-full h-1 overflow-visible z-0">
              <svg className="w-full" height="100" viewBox="0 0 1000 100" fill="none">
                <path 
                  d="M50,50 C200,50 300,50 450,50 C600,50 700,50 850,50" 
                  stroke="#135bec" 
                  strokeWidth="2" 
                  strokeDasharray="10 10"
                  className="animate-[dash_60s_linear_infinite]"
                />
                <circle cx="50" cy="50" r="4" fill="#135bec" />
                <circle cx="350" cy="50" r="4" fill="#135bec" />
                <circle cx="650" cy="50" r="4" fill="#135bec" />
                <circle cx="950" cy="50" r="4" fill="#135bec" />
              </svg>
            </div>

            <FlowStep 
              number="01" 
              title="Multi-Modal Input" 
              desc="Ingest CAD files (STEP/IGS) or legacy BOM data via our secure neural bridge." 
              icon="cloud_upload"
              metrics={['Native STEP', 'BOM Scraping']}
            />
            <FlowStep 
              number="02" 
              title="Geometric Synthesis" 
              desc="The engine extracts thickness gradients, volume, and draft angles in seconds." 
              icon="view_in_ar"
              metrics={['Wall Mapping', 'Area Extraction']}
            />
            <FlowStep 
              number="03" 
              title="Machine Matching" 
              desc="Simulation of tonnage, cooling curves, and injection pressures across 1000+ machines." 
              icon="settings_applications"
              metrics={['Tonnage Req.', 'Cycle Prediction']}
            />
            <FlowStep 
              number="04" 
              title="Financial Modeling" 
              desc="Real-time MHR synthesis including overheads, logistics, and material indexed pricing." 
              icon="analytics"
              metrics={['MHR Synthesis', 'Total Unit Cost']}
            />
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-24 relative z-10 bg-slate-50 dark:bg-background-dark transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-primary font-black text-sm uppercase tracking-[0.25em] mb-4">The Proof in Production</h2>
              <h3 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">Provable Outcomes. <br/><span className="text-slate-400">Real-World Case Studies.</span></h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg text-lg">
              We don't just estimate costs; we drive manufacturing excellence through data-backed architectural insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group bg-white dark:bg-surface-dark rounded-[2.5rem] p-10 border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6 w-fit">Automotive Tier 1</div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors tracking-tight">Transmission Housing Weight Optimization</h4>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8">
                  Using V2Cost's generative analysis, a leading OEM reduced die-casting material waste by identifying non-critical wall segments.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-wider">Before</p>
                    <p className="text-xl font-black text-slate-400">$45.20 <span className="text-xs">/unit</span></p>
                  </div>
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                    <p className="text-[10px] font-black text-primary uppercase mb-1 tracking-wider">After</p>
                    <p className="text-xl font-black text-primary">$38.80 <span className="text-xs">/unit</span></p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-48 flex flex-col justify-between items-center text-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="text-primary text-4xl font-black">14%</div>
                <div className="text-[11px] font-bold text-slate-500 uppercase leading-tight">Material <br/>Reduction</div>
                <div className="size-16 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">architecture</span>
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-surface-dark rounded-[2.5rem] p-10 border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6 w-fit">Consumer Electronics</div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors tracking-tight">Laptop Chassis Quoting Acceleration</h4>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8">
                  V2Cost enabled a contract manufacturer to automate complex multi-material quoting, cutting RFQ response time from days to minutes.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-wider">Manual</p>
                    <p className="text-xl font-black text-slate-400">72 <span className="text-xs font-medium uppercase tracking-tighter">Hours</span></p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/50">
                    <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase mb-1 tracking-wider">V2Cost.</p>
                    <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">4 <span className="text-xs font-medium uppercase tracking-tighter">Minutes</span></p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-48 flex flex-col justify-between items-center text-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="text-emerald-500 text-4xl font-black">70x</div>
                <div className="text-[11px] font-bold text-slate-500 uppercase leading-tight">Faster <br/>Market Entry</div>
                <div className="size-16 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-emerald-500">
                  <span className="material-symbols-outlined text-3xl">shuttle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer Section */}
      <footer className="relative z-10 pt-24 pb-12 bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark overflow-hidden transition-colors">
        {/* Subtle Decorative Gradient */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
            {/* Column 1: Brand & Desc */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-primary size-10 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <span className="material-symbols-outlined text-2xl font-black">precision_manufacturing</span>
                </div>
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">V2Cost.</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[280px]">
                Redefining manufacturing cost forecasting through neural geometric analysis and real-time financial synthesis.
              </p>
              <div className="flex items-center gap-4">
                <FooterSocial icon="public" />
                <FooterSocial icon="alternate_email" />
                <FooterSocial icon="hub" />
              </div>
            </div>

            {/* Column 2: Product */}
            <div className="flex flex-col gap-6">
              <h4 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">Platform</h4>
              <ul className="flex flex-col gap-3">
                <FooterLink label="AI Cost Estimation" />
                <FooterLink label="MHR Neural Analysis" />
                <FooterLink label="Geometric Extraction" />
                <FooterLink label="API Integration" />
                <FooterLink label="Enterprise Edition" />
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="flex flex-col gap-6">
              <h4 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">Resources</h4>
              <ul className="flex flex-col gap-3">
                <FooterLink label="Manufacturing Blog" />
                <FooterLink label="ROI Calculator" />
                <FooterLink label="Documentation" />
                <FooterLink label="Case Studies" />
                <FooterLink label="Technical Whitepapers" />
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="flex flex-col gap-6">
              <h4 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">Intelligence Pulse</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Get the latest manufacturing benchmarks and AI updates.</p>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Engineering email" 
                    className="w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                  />
                  <button className="absolute right-1 top-1 h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-400">Secure. Industrial standards compliant.</p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-xs font-medium tracking-wide">© 2024 V2Cost. Systems Inc. | Advanced Neural Manufacturing Intelligence</p>
            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Security Architecture</a>
              <a href="#" className="hover:text-primary transition-colors">GDPR</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
};

const FooterLink: React.FC<{ label: string }> = ({ label }) => (
  <li>
    <a href="#" className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-primary transition-colors"></span>
      {label}
    </a>
  </li>
);

const FooterSocial: React.FC<{ icon: string }> = ({ icon }) => (
  <a href="#" className="size-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all shadow-sm">
    <span className="material-symbols-outlined text-xl">{icon}</span>
  </a>
);

const FlowStep: React.FC<{ number: string, title: string, desc: string, icon: string, metrics: string[] }> = ({ number, title, desc, icon, metrics }) => (
  <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:max-w-[240px] relative z-10 group">
    <div className="size-20 rounded-[1.5rem] bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark flex items-center justify-center text-primary mb-6 shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity"></div>
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </div>
    <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">{number}</div>
    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-primary transition-colors">{title}</h4>
    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
      {desc}
    </p>
    <div className="flex flex-col gap-2 w-full max-w-[180px]">
      {metrics.map(m => (
        <div key={m} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <span className="size-1.5 rounded-full bg-primary/40"></span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">{m}</span>
        </div>
      ))}
    </div>
  </div>
);

const StatBox: React.FC<{ label: string, value: string, sub: string, icon: string, progress: number }> = ({ label, value, sub, icon, progress }) => (
  <div className="flex flex-col gap-4 p-10 rounded-[2.5rem] border border-slate-200 dark:border-border-dark bg-white dark:bg-background-dark shadow-sm hover:shadow-2xl transition-all group hover:-translate-y-2 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>
    <div className="flex justify-between items-start relative z-10">
      <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
      <div className="size-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-primary border border-slate-100 dark:border-border-dark group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
    </div>
    <div className="flex items-baseline gap-2 relative z-10">
      <p className="text-slate-900 dark:text-white text-5xl font-black tracking-tighter leading-none">{value}</p>
      <p className="text-primary dark:text-blue-400 text-xs font-black uppercase tracking-widest">
        {sub}
      </p>
    </div>
    <div className="w-full bg-slate-100 dark:bg-slate-900 h-2.5 mt-4 rounded-full overflow-hidden shadow-inner relative z-10">
      <div className="bg-primary h-full shadow-[0_0_20px_rgba(19, 91, 236, 0.6)] transition-all duration-[2000ms] ease-out rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

export default LandingView;