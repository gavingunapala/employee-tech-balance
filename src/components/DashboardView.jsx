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
    if (status === 'RED') return 'bg-red-500/20 border-red-500 text-red-400';
    if (status === 'AMBER') return 'bg-amber-500/20 border-amber-500 text-amber-400';
    return 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 flex flex-col justify-between">
      
      {/* Universal Sticky Header */}
      <header className="mb-8 max-w-4xl w-full mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-5 gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Work-From-Home Balance Scorecard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Individual Digital Health and Telepressure Assessment Tool</p>
        </div>
        <div className="flex items-center self-start sm:self-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-mono text-cyan-400">
          <Activity className="w-3.5 h-3.5 animate-pulse" /> {formSubmitted ? 'DIAGNOSTIC COMPLETE' : 'AWAITING RESPONSE INPUT'}
        </div>
      </header>

      {/* Primary Layout Engine */}
      <main className="max-w-4xl w-full mx-auto flex-grow flex items-center justify-center">
        
        {!formSubmitted ? (
          /* STEP 1: Assessment Survey View Container */
          <div className="bg-slate-800/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-slate-800 w-full shadow-2xl">
            <div className="flex items-center gap-2 border-b border-slate-700 pb-4 mb-6">
              <ClipboardList className="w-5 h-5 text-cyan-400" />
              <div>
                <h2 className="text-lg font-bold">Rapid Balance Diagnostic Questionnaire</h2>
                <p className="text-xs text-slate-400">Evaluate your current workplace technology interactions across individual baseline dimensions.</p>
              </div>
            </div>

            <form onSubmit={processAssessment} className="space-y-6 text-xs">
              {/* Productivity Blocks */}
              <div className="space-y-4">
                <h3 className="text-cyan-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-700 pb-1">Dimension 1: Task Productivity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-slate-300 block font-medium leading-relaxed">Remote work tools (Zoom, Slack, Teams) help me complete my work faster.</label>
                    <div className="flex items-center gap-3">
                      <input type="range" min="1" max="5" value={formData.prodQ1} onChange={(e) => handleSliderChange('prodQ1', e.target.value)} className="w-full accent-cyan-500 h-1 bg-slate-700 rounded-lg cursor-pointer" />
                      <span className="font-mono text-cyan-400 bg-slate-900 px-2 py-1 rounded text-xs font-bold w-6 text-center">{formData.prodQ1}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-300 block font-medium leading-relaxed">I feel productive and effective in my current hybrid/remote arrangement.</label>
                    <div className="flex items-center gap-3">
                      <input type="range" min="1" max="5" value={formData.prodQ2} onChange={(e) => handleSliderChange('prodQ2', e.target.value)} className="w-full accent-cyan-500 h-1 bg-slate-700 rounded-lg cursor-pointer" />
                      <span className="font-mono text-cyan-400 bg-slate-900 px-2 py-1 rounded text-xs font-bold w-6 text-center">{formData.prodQ2}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Burnout Strain Blocks */}
              <div className="space-y-4 pt-4 border-t border-slate-700/50">
                <h3 className="text-rose-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-700 pb-1">Dimension 2: Occupational Burnout Strain</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-slate-300 block font-medium leading-relaxed">I feel mentally exhausted and depleted after my daily remote work hours.</label>
                    <div className="flex items-center gap-3">
                      <input type="range" min="1" max="5" value={formData.burnQ1} onChange={(e) => handleSliderChange('burnQ1', e.target.value)} className="w-full accent-cyan-500 h-1 bg-slate-700 rounded-lg cursor-pointer" />
                      <span className="font-mono text-rose-400 bg-slate-900 px-2 py-1 rounded text-xs font-bold w-6 text-center">{formData.burnQ1}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-300 block font-medium leading-relaxed">Back-to-back virtual updates and communication notifications drain my energy.</label>
                    <div className="flex items-center gap-3">
                      <input type="range" min="1" max="5" value={formData.burnQ2} onChange={(e) => handleSliderChange('burnQ2', e.target.value)} className="w-full accent-cyan-500 h-1 bg-slate-700 rounded-lg cursor-pointer" />
                      <span className="font-mono text-rose-400 bg-slate-900 px-2 py-1 rounded text-xs font-bold w-6 text-center">{formData.burnQ2}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work-Life Balance Blocks */}
              <div className="space-y-4 pt-4 border-t border-slate-700/50">
                <h3 className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-700 pb-1">Dimension 3: Work-Life Balance Strength</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-slate-300 block font-medium leading-relaxed">I can consistently maintain healthy boundaries between work and my personal life.</label>
                    <div className="flex items-center gap-3">
                      <input type="range" min="1" max="5" value={formData.wlbQ1} onChange={(e) => handleSliderChange('wlbQ1', e.target.value)} className="w-full accent-cyan-500 h-1 bg-slate-700 rounded-lg cursor-pointer" />
                      <span className="font-mono text-emerald-400 bg-slate-900 px-2 py-1 rounded text-xs font-bold w-6 text-center">{formData.wlbQ1}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-300 block font-medium leading-relaxed">Remote work structures increase my personal flexibility and time management.</label>
                    <div className="flex items-center gap-3">
                      <input type="range" min="1" max="5" value={formData.wlbQ2} onChange={(e) => handleSliderChange('wlbQ2', e.target.value)} className="w-full accent-cyan-500 h-1 bg-slate-700 rounded-lg cursor-pointer" />
                      <span className="font-mono text-emerald-400 bg-slate-900 px-2 py-1 rounded text-xs font-bold w-6 text-center">{formData.wlbQ2}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prescriptive Preferences */}
              <div className="space-y-2 pt-4 border-t border-slate-700/50 max-w-md">
                <label className="text-slate-300 block font-bold">Which organizational support policy would improve your daily work experience?</label>
                <select value={formData.userPreference} onChange={(e) => handleSelectChange(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-slate-300 focus:outline-none focus:border-cyan-500 transition-all">
                  <option value="Fewer meetings">Fewer meetings (Reduced meeting density)</option>
                  <option value="No-meeting blocks">No-meeting blocks (Guaranteed deep work windows)</option>
                  <option value="Reduced after-hours messages">Reduced after-hours messages (Strict digital separation)</option>
                  <option value="Better communication guidelines">Better communication guidelines (Clear async protocol)</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg text-sm tracking-wide mt-4">
                Analyze My Digital Scorecard
              </button>
            </form>
          </div>
        ) : (
          /* STEP 2: Render Personalized Analytics Dashboard Scorecard View */
          <div className="w-full space-y-6">
            
            {/* Top Return Utility Navigation */}
            <div className="flex items-center justify-between">
              <button onClick={resetAssessment} className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-all font-medium">
                <ArrowLeft className="w-4 h-4" /> Retake Personal Assessment
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <UserCheck className="w-4 h-4 text-emerald-400" /> Participant ID: Subject_01
              </div>
            </div>

            {/* Main Calculated 3-Dimension Score Matrix */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-800 shadow-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Productivity Score</span>
                <div className="text-4xl font-black mt-2 mb-3">{evaluation.productivityScore} <span className="text-xs font-normal text-slate-500">/ 5.0</span></div>
                <div className={`text-center py-1 rounded-lg text-xs font-mono font-bold border ${getStatusColor(evaluation.productivityStatus)}`}>
                  STATUS: {evaluation.productivityStatus}
                </div>
              </div>

              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-800 shadow-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Burnout Strain</span>
                <div className="text-4xl font-black mt-2 mb-3">{evaluation.burnoutScore} <span className="text-xs font-normal text-slate-500">/ 5.0</span></div>
                <div className={`text-center py-1 rounded-lg text-xs font-mono font-bold border ${getStatusColor(evaluation.burnoutStatus)}`}>
                  STATUS: {evaluation.burnoutStatus}
                </div>
              </div>

              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-800 shadow-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Boundary Strength</span>
                <div className="text-4xl font-black mt-2 mb-3">{evaluation.wlbScore} <span className="text-xs font-normal text-slate-500">/ 5.0</span></div>
                <div className={`text-center py-1 rounded-lg text-xs font-mono font-bold border ${getStatusColor(evaluation.wlbStatus)}`}>
                  STATUS: {evaluation.wlbStatus}
                </div>
              </div>
            </section>

            {/* Prescriptive Remedial Interventions Output Panel */}
            <section className="bg-slate-800 p-6 rounded-2xl border border-slate-800 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-slate-700 pb-4 mb-4">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <h3 className="text-md font-bold">Your Customized Prescriptive Recommendations</h3>
              </div>

              <div className="space-y-4">
                {recommendations.length > 0 ? (
                  recommendations.map((rec) => (
                    <div key={rec.id} className="p-4 bg-slate-900/40 border border-slate-700/60 rounded-xl flex gap-3.5 items-start transition-all hover:border-slate-600">
                      <ShieldAlert className={`w-5 h-5 mt-0.5 shrink-0 ${rec.priority === 'CRITICAL' ? 'text-red-400' : rec.priority === 'HIGH' ? 'text-amber-400' : 'text-cyan-400'}`} />
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="font-bold text-sm text-slate-200">{rec.title}</h4>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-bold tracking-wider uppercase">
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mb-1.5">{rec.type}</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{rec.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center gap-2">
                    <CheckCircle className="w-8 h-8 text-emerald-500 animate-bounce" />
                    <p className="text-sm font-bold text-slate-300">Optimal Technical Balance Attained</p>
                    <p className="text-xs max-w-sm">Your interactive values sit fully within healthy parameters. No indicators of severe technology over-saturation or burnout strain were captured.</p>
                  </div>
                )}
              </div>
            </section>
            
            <div className="text-center pt-2">
              <button onClick={resetAssessment} className="inline-flex items-center gap-2 text-xs bg-slate-800 border border-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-all font-bold shadow-md">
                <RefreshCw className="w-3.5 h-3.5" /> Start New Session
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Academic Attribution Footer */}
      <footer className="mt-8 text-center text-[10px] font-mono text-slate-600 border-t border-slate-800/60 pt-4 w-full max-w-4xl mx-auto">
        SLIIT Computing Faculty — M.Sc. IS Research Project Artifact (IT6010)
      </footer>
    </div>
  );
}
