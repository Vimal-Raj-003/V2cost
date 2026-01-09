import React from 'react';

const ProfileView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Summary Card */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary to-blue-400"></div>
            <div className="px-6 pb-8 flex flex-col items-center text-center -mt-16">
              <div className="size-32 rounded-full border-4 border-white dark:border-surface-dark bg-slate-200 dark:bg-slate-700 shadow-xl overflow-hidden mb-4">
                <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfyxXUam9mKf4Kfu77UrPP9efqogagj7HCx2HG5HbQ1uo52ntLJgFl2e9Qjrn_A-dox1x8X2bJ8NLSRIoMy1JHaHKBkiIDpSSqKThXz2dSgqgVhi2i0kChg8N9sI1v-83CbnBpgnuOqCLJaTFc2MGnMSWiFbOXIeMbeqjXnqV18Hj9wZ5r1JrGTTs-O9LBTzd0GtYSWA6AuXKu8Kxv3VPM34NZsjebRWphH3z7CxtgDgRAPAcBdilk24lSSKvq8Kj5JzROUOGRD9k" 
                    alt="Profile Avatar" 
                    className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Alex Morgan</h3>
              <p className="text-sm font-semibold text-primary mb-2">Senior Manufacturing Engineer</p>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] font-bold border border-slate-200 dark:border-slate-700">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                Grand Rapids, MI, USA
              </div>

              <div className="w-full grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-border-dark">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">128</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Projects</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">98%</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Accuracy</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">12y</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Exp.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm p-6">
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4">Contact Details</h4>
            <div className="flex flex-col gap-4">
              <ContactItem icon="mail" label="Email" value="alex@company.com" />
              <ContactItem icon="phone" label="Phone" value="+1 (616) 555-0192" />
              <ContactItem icon="business" label="Company" value="Global Precision Plastics" />
            </div>
          </div>
        </div>

        {/* Right Column - Tabs/Settings */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-100 dark:border-border-dark">
              <Tab active label="Profile Information" />
              <Tab label="Security" />
              <Tab label="Preferences" />
            </div>
            <div className="p-8">
              <form className="flex flex-col gap-8">
                <div>
                  <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-6">General Information</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField label="First Name" value="Alex" />
                    <ProfileField label="Last Name" value="Morgan" />
                    <ProfileField label="Job Title" value="Senior Manufacturing Engineer" />
                    <ProfileField label="Department" value="Product Realization" />
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-border-dark">
                  <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Expertise & Certifications</h5>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <SkillBadge label="Injection Molding Expert" />
                    <SkillBadge label="Moldflow Specialist" />
                    <SkillBadge label="Six Sigma Black Belt" />
                    <SkillBadge label="Costing Optimization" />
                  </div>
                  <textarea 
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[120px]" 
                    placeholder="Brief bio or professional summary..."
                    defaultValue="Specializing in large-scale automotive plastics and high-precision consumer electronics. Expert in cost estimation modeling and supply chain optimization for multi-cavity tooling."
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button type="button" className="px-6 h-11 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-border-dark flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Recent Activity</h3>
              <button className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Clear History</button>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <ActivityItem 
                title="Completed Estimate: Housing X5" 
                time="2 hours ago" 
                icon="check_circle" 
                iconColor="text-green-500" 
              />
              <ActivityItem 
                title="Added Gear Box Housing to Library" 
                time="Yesterday at 4:12 PM" 
                icon="bookmark" 
                iconColor="text-blue-500" 
              />
              <ActivityItem 
                title="Updated Material Matrix: ABS Grades" 
                time="Oct 24, 2023" 
                icon="update" 
                iconColor="text-amber-500" 
              />
              <ActivityItem 
                title="Exported PDF Report: Project Delta" 
                time="Oct 22, 2023" 
                icon="picture_as_pdf" 
                iconColor="text-red-500" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItem: React.FC<{ icon: string, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span className="material-symbols-outlined text-slate-400 text-[20px] mt-0.5">{icon}</span>
    <div className="flex flex-col">
      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</span>
      <span className="text-sm text-slate-900 dark:text-white font-medium">{value}</span>
    </div>
  </div>
);

const Tab: React.FC<{ label: string, active?: boolean }> = ({ label, active }) => (
  <button className={`px-6 py-4 text-sm font-bold border-b-2 transition-all ${active ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
    {label}
  </button>
);

const ProfileField: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
    <input 
      type="text" 
      defaultValue={value}
      className="h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
    />
  </div>
);

const SkillBadge: React.FC<{ label: string }> = ({ label }) => (
  <span className="px-3 py-1 rounded-lg bg-primary/5 dark:bg-primary/20 text-primary dark:text-blue-400 text-xs font-bold border border-primary/10">
    {label}
  </span>
);

const ActivityItem: React.FC<{ title: string, time: string, icon: string, iconColor: string }> = ({ title, time, icon, iconColor }) => (
  <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer group">
    <div className="flex items-center gap-3">
      <span className={`material-symbols-outlined ${iconColor} text-[22px]`}>{icon}</span>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{title}</span>
        <span className="text-xs text-slate-500">{time}</span>
      </div>
    </div>
    <span className="material-symbols-outlined text-slate-300 text-[18px]">chevron_right</span>
  </div>
);

export default ProfileView;