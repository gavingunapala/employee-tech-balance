import React, { useState } from 'react';
import { evaluateIndividualStatus, generatePersonalRecommendations } from '../utils/individualEngine';
import { Activity, ShieldAlert, Sparkles, ClipboardList, CheckCircle, ArrowLeft, RefreshCw, UserCheck } from 'lucide-react';

export default function DashboardView() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    prodQ1: 3, prodQ2: 3,
    burnQ1: 3, burnQ2: 3,
    wlbQ1: 3, wlbQ2: 3,
    userPreference: "Fewer meetings"
  });

  const [evaluation, setEvaluation] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const handleSliderChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: parseInt(val) }));
  };

  const handleSelectChange = (val) => {
    setFormData(prev => ({ ...prev, userPreference: val }));
  };

  const processAssessment = (e) => {
    e.preventDefault();
    const evaluatedData = evaluateIndividualStatus(formData);
    const generatedRecs = generatePersonalRecommendations(evaluatedData, formData.userPreference);
    
    setEvaluation(evaluatedData);
    setRecommendations(generatedRecs);
    setFormSubmitted(true);
  };

  const resetAssessment = () => {
    setFormData({ prodQ1: 3, prodQ2: 3, burnQ1: 3, burnQ2: 3, wlbQ1: 3, wlbQ2: 3, userPreference: "Fewer meetings" });
    setEvaluation(null);
    setRecommendations([]);
    setFormSubmitted(false);
  };

  const getStatusColor = (status) => {
    if (status === 'RED') return 'bg-red-50 border-red-200 text-red-700';
    if (status === 'AMBER') return 'bg-amber-50 border-amber-200 text-amber-700';
    return 'bg-emerald-50 border-emerald-200 text-emerald-700';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 flex flex-col justify-between font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-500">
      
      {/* Universal Sticky Header */}
      <header className="mb-10 max-w-4xl w-full mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 gap-3">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
            Work-From-Home Balance Scorecard
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Individual Digital Health and Telepressure Assessment Tool</p>
        </div>
        <div className="flex items-center self-start sm:self-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-mono text-indigo-600 font-semibold transition-all hover:shadow-md">
          <Activity className="w-4 h-4 animate-pulse text-indigo-500" /> {formSubmitted ? 'DIAGNOSTIC COMPLETE' : 'AWAITING RESPONSE INPUT'}
        </div>
      </header>

      {/* Primary Layout Engine */}
      <main className="max-w-4xl w-full mx-auto flex-grow flex items-center justify-center">
        
        {!formSubmitted ? (
          /* STEP 1: Assessment Survey View Container */
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 w-full shadow-2xl shadow-slate-200/50 transform transition-all duration-500">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-8">
              <div className="p-2.5 bg-indigo-50 rounded-xl">
                <ClipboardList className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Rapid Balance Diagnostic Questionnaire</h2>
                <p className="text-sm text-slate-500 mt-0.5">Evaluate your current workplace technology interactions across individual baseline dimensions.</p>
              </div>
            </div>

            <form onSubmit={processAssessment} className="space-y-8">
              {/* Productivity Blocks */}
              <div className="space-y-5">
                <h3 className="text-indigo-600 font-bold uppercase tracking-widest text-[11px] pb-2 border-b border-indigo-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Dimension 1: Task Productivity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <label className="text-slate-600 block text-sm font-medium leading-relaxed group-hover:text-slate-800 transition-colors">Remote work tools (Zoom, Slack, Teams) help me complete my work faster.</label>
                    <div className="flex items-center gap-4">
                      <input type="range" min="1" max="5" value={formData.prodQ1} onChange={(e) => handleSliderChange('prodQ1', e.target.value)} className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer hover:bg-slate-300 transition-colors" />
                      <span className="font-mono text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-bold w-10 text-center border border-indigo-100 shadow-sm">{formData.prodQ1}</span>
                    </div>
                  </div>
                  <div className="space-y-3 group">
                    <label className="text-slate-600 block text-sm font-medium leading-relaxed group-hover:text-slate-800 transition-colors">I feel productive and effective in my current hybrid/remote arrangement.</label>
                    <div className="flex items-center gap-4">
                      <input type="range" min="1" max="5" value={formData.prodQ2} onChange={(e) => handleSliderChange('prodQ2', e.target.value)} className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer hover:bg-slate-300 transition-colors" />
                      <span className="font-mono text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-bold w-10 text-center border border-indigo-100 shadow-sm">{formData.prodQ2}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Burnout Strain Blocks */}
              <div className="space-y-5">
                <h3 className="text-rose-500 font-bold uppercase tracking-widest text-[11px] pb-2 border-b border-rose-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span> Dimension 2: Occupational Burnout Strain
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <label className="text-slate-600 block text-sm font-medium leading-relaxed group-hover:text-slate-800 transition-colors">I feel mentally exhausted and depleted after my daily remote work hours.</label>
                    <div className="flex items-center gap-4">
                      <input type="range" min="1" max="5" value={formData.burnQ1} onChange={(e) => handleSliderChange('burnQ1', e.target.value)} className="w-full accent-rose-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer hover:bg-slate-300 transition-colors" />
                      <span className="font-mono text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg text-sm font-bold w-10 text-center border border-rose-100 shadow-sm">{formData.burnQ1}</span>
                    </div>
                  </div>
                  <div className="space-y-3 group">
                    <label className="text-slate-600 block text-sm font-medium leading-relaxed group-hover:text-slate-800 transition-colors">Back-to-back virtual updates and communication notifications drain my energy.</label>
                    <div className="flex items-center gap-4">
                      <input type="range" min="1" max="5" value={formData.burnQ2} onChange={(e) => handleSliderChange('burnQ2', e.target.value)} className="w-full accent-rose-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer hover:bg-slate-300 transition-colors" />
                      <span className="font-mono text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg text-sm font-bold w-10 text-center border border-rose-100 shadow-sm">{formData.burnQ2}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work-Life Balance Blocks */}
              <div className="space-y-5">
                <h3 className="text-emerald-500 font-bold uppercase tracking-widest text-[11px] pb-2 border-b border-emerald-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Dimension 3: Work-Life Balance Strength
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <label className="text-slate-600 block text-sm font-medium leading-relaxed group-hover:text-slate-800 transition-colors">I can consistently maintain healthy boundaries between work and my personal life.</label>
                    <div className="flex items-center gap-4">
                      <input type="range" min="1" max="5" value={formData.wlbQ1} onChange={(e) => handleSliderChange('wlbQ1', e.target.value)} className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer hover:bg-slate-300 transition-colors" />
                      <span className="font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg text-sm font-bold w-10 text-center border border-emerald-100 shadow-sm">{formData.wlbQ1}</span>
                    </div>
                  </div>
                  <div className="space-y-3 group">
                    <label className="text-slate-600 block text-sm font-medium leading-relaxed group-hover:text-slate-800 transition-colors">Remote work structures increase my personal flexibility and time management.</label>
                    <div className="flex items-center gap-4">
                      <input type="range" min="1" max="5" value={formData.wlbQ2} onChange={(e) => handleSliderChange('wlbQ2', e.target.value)} className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer hover:bg-slate-300 transition-colors" />
                      <span className="font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg text-sm font-bold w-10 text-center border border-emerald-100 shadow-sm">{formData.wlbQ2}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prescriptive Preferences */}
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <label className="text-slate-700 block font-bold text-sm">Which organizational support policy would improve your daily work experience?</label>
                <select value={formData.userPreference} onChange={(e) => handleSelectChange(e.target.value)} className="w-full max-w-lg bg-white border border-slate-300 px-4 py-3 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:border-slate-400 cursor-pointer">
                  <option value="Fewer meetings">Fewer meetings (Reduced meeting density)</option>
                  <option value="No-meeting blocks">No-meeting blocks (Guaranteed deep work windows)</option>
                  <option value="Reduced after-hours messages">Reduced after-hours messages (Strict digital separation)</option>
                  <option value="Better communication guidelines">Better communication guidelines (Clear async protocol)</option>
                </select>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full md:w-auto md:min-w-[280px] flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 text-sm tracking-wide transform hover:-translate-y-0.5">
                  Analyze My Digital Scorecard <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* STEP 2: Render Personalized Analytics Dashboard Scorecard View */
          <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Top Return Utility Navigation */}
            <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
              <button onClick={resetAssessment} className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors font-semibold group">
                <div className="p-1.5 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors"><ArrowLeft className="w-4 h-4" /></div> Retake Assessment
              </button>
              <div className="flex items-center gap-2 text-sm text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <UserCheck className="w-4 h-4 text-emerald-500" /> Participant_01
              </div>
            </div>

            {/* Main Calculated 3-Dimension Score Matrix */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Activity className="w-24 h-24" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Productivity Score</span>
                <div className="text-5xl font-black mt-3 mb-4 text-slate-800 relative z-10">{evaluation.productivityScore} <span className="text-sm font-semibold text-slate-400">/ 5.0</span></div>
                <div className={`inline-flex px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold border ${getStatusColor(evaluation.productivityStatus)} relative z-10 shadow-sm`}>
                  STATUS: {evaluation.productivityStatus}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <ShieldAlert className="w-24 h-24" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Burnout Strain</span>
                <div className="text-5xl font-black mt-3 mb-4 text-slate-800 relative z-10">{evaluation.burnoutScore} <span className="text-sm font-semibold text-slate-400">/ 5.0</span></div>
                <div className={`inline-flex px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold border ${getStatusColor(evaluation.burnoutStatus)} relative z-10 shadow-sm`}>
                  STATUS: {evaluation.burnoutStatus}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <ClipboardList className="w-24 h-24" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Boundary Strength</span>
                <div className="text-5xl font-black mt-3 mb-4 text-slate-800 relative z-10">{evaluation.wlbScore} <span className="text-sm font-semibold text-slate-400">/ 5.0</span></div>
                <div className={`inline-flex px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold border ${getStatusColor(evaluation.wlbStatus)} relative z-10 shadow-sm`}>
                  STATUS: {evaluation.wlbStatus}
                </div>
              </div>
            </section>

            {/* Prescriptive Remedial Interventions Output Panel */}
            <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
                <div className="p-2 bg-amber-50 rounded-xl">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Your Customized Prescriptive Recommendations</h3>
              </div>

              <div className="space-y-4">
                {recommendations.length > 0 ? (
                  recommendations.map((rec) => (
                    <div key={rec.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start transition-all hover:bg-white hover:shadow-md hover:border-slate-300 group">
                      <div className={`p-2 rounded-xl shrink-0 ${rec.priority === 'CRITICAL' ? 'bg-red-50 text-red-500' : rec.priority === 'HIGH' ? 'bg-amber-50 text-amber-500' : 'bg-indigo-50 text-indigo-500'}`}>
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-1.5">
                          <h4 className="font-bold text-base text-slate-800">{rec.title}</h4>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold tracking-widest uppercase border ${
                            rec.priority === 'CRITICAL' ? 'bg-red-50 text-red-600 border-red-100' :
                            rec.priority === 'HIGH' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                            'bg-indigo-50 text-indigo-600 border-indigo-100'
                          }`}>
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-semibold mb-2 tracking-wide uppercase">{rec.type}</p>
                        <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">{rec.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 px-6 text-center text-slate-500 border-2 border-dashed border-emerald-200 bg-emerald-50/30 rounded-3xl flex flex-col items-center gap-4">
                    <div className="p-4 bg-emerald-100 rounded-full">
                      <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-emerald-800 mb-1">Optimal Technical Balance Attained</h4>
                      <p className="text-sm text-emerald-600 max-w-md mx-auto leading-relaxed">Your interactive values sit fully within healthy parameters. No indicators of severe technology over-saturation or burnout strain were captured.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
            
            <div className="text-center pt-4 pb-10">
              <button onClick={resetAssessment} className="inline-flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 px-6 py-3 rounded-xl transition-all font-bold shadow-sm hover:shadow-md">
                <RefreshCw className="w-4 h-4" /> Start New Session
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Academic Attribution Footer */}
      <footer className="mt-auto text-center text-[11px] font-medium text-slate-400 pt-8 pb-4 w-full max-w-4xl mx-auto">
        SLIIT Computing Faculty — M.Sc. IS Research Project Artifact (IT6010)
      </footer>
    </div>
  );
}
