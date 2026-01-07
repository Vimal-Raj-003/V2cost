
import React, { useState } from 'react';

interface Props {
  onLogin: () => void;
  onBack: () => void;
}

const LoginView: React.FC<Props> = ({ onLogin, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-white">
      {/* Left Panel: Quote & Visuals (Desktop only) */}
      <div className="relative hidden lg:flex w-1/2 bg-[#101622] items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_nYkdHDRJtUcmSP2dO9MKkmSrpAO1o7tcZlEyODo1MxSPafLgOT-pWoPHqIGtOMMfJiOHQb28bpJ1yHpWxCjlMT3MLd28CvLMkoQLswWGKRHwOJnZyKtmybQ6d_uM5NyXmr0n231S6an3S7XP_4grjgSztTddX5TB4M-wmvVif113GiatcER8scRjhj8utkcykGkH8T7W1b6XB-tiK4FYatriQaNfhzQPkwTe_T64y3Mq9rwnk9JM6MqrnboEBxHNkZbYWP_DI9g')" }}
        ></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#101622] via-[#101622]/80 to-transparent"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#101622]/50 to-primary/20"></div>
        
        <div className="relative z-20 flex flex-col justify-end h-full w-full p-16 max-w-2xl pb-24">
          <div className="mb-8 p-3 bg-white/10 backdrop-blur-md w-fit rounded-lg border border-white/10 shadow-sm text-blue-400">
            <span className="material-symbols-outlined text-3xl">query_stats</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight leading-tight mb-4 text-white drop-shadow-sm">
            Predict costs with AI precision.
          </h1>
          <p className="text-lg text-slate-300 font-medium leading-relaxed mb-8">
            "V2Cost. has revolutionized how we forecast project budgets. The dynamic visualization tools are simply ahead of their time."
          </p>
          <div className="flex items-center gap-4">
            <div 
              className="h-12 w-12 rounded-full bg-cover bg-center border-2 border-primary" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTbj_s3zupqUKeNGsyp3OWboOK8x4keYG09dbIEhg7YPh2-WpXUoLmioB7n1S4hD62BUXbu6Vig_JBIV8oje_N8r-WiEz2RM4H-vz07CwgmKihH7LaFSoK3s2gaIfF-1JyXIg-2uV5g5Yhz9Lnb1Utq1M2I8QMrH_k0YuOTSmprpEPQ39Dt3AhL9RJK6IYMtH3qy9AJKFlac11_p6us4AA4ygQTZHxEIeUoHDKQk8KE7lVysMIgnLvjTzORiMXq1USob68yPGBKWk')" }}
            ></div>
            <div>
              <p className="font-bold text-white">Alex Chen</p>
              <p className="text-sm text-slate-400">CTO, FutureScale Inc.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-4 py-12 bg-[#f6f6f8] relative">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold text-sm"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Site
        </button>

        <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-[100px]"></div>
          <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[100px]"></div>
        </div>

        <div className="w-full max-w-[480px] z-10">
          <div className="mb-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="size-8 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-slate-900 text-xl font-bold tracking-tight">V2Cost.</h2>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500">Enter your credentials to access your dashboard.</p>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <button 
              onClick={onLogin}
              className="flex items-center justify-center w-full h-12 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700 gap-3"
            >
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
              Sign in with Google
            </button>
            <div className="flex gap-3">
              <button onClick={onLogin} className="flex-1 flex items-center justify-center h-12 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700 gap-2">
                <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
                GitHub
              </button>
              <button onClick={onLogin} className="flex-1 flex items-center justify-center h-12 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700 gap-2">
                <span className="material-symbols-outlined text-xl">mail</span>
                Mail
              </button>
            </div>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#f6f6f8] text-slate-500">Or continue with</span>
            </div>
          </div>

          <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">Email Address</span>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                </div>
                <input className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200" placeholder="name@company.com" type="email" required />
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <a className="text-sm font-medium text-primary hover:text-primary-hover transition-colors" href="#">Forgot Password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input 
                  className="w-full h-12 pl-11 pr-11 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200" 
                  placeholder="Enter your password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                />
                <button 
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
            </label>
            <div className="flex flex-col gap-4 mt-2">
              <button type="submit" className="w-full h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(19,91,236,0.3)] hover:shadow-[0_0_20px_rgba(19,91,236,0.5)] transition-all duration-300 flex items-center justify-center gap-2">
                <span>Sign In</span>
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </button>
              <div className="text-center">
                <span className="text-slate-500 text-sm">Don't have an account? </span>
                <a className="text-primary hover:text-primary-hover font-bold text-sm" href="#">Sign Up</a>
              </div>
            </div>
          </form>

          <div className="mt-12 flex justify-between items-center text-xs text-slate-500">
            <p>© 2024 V2Cost.</p>
            <div className="flex gap-4">
              <a className="hover:text-slate-400 transition-colors" href="#">Privacy</a>
              <a className="hover:text-slate-400 transition-colors" href="#">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
