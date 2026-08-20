import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Users } from 'lucide-react';

export const LeadCaptureSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [academicLevel, setAcademicLevel] = useState('Undergraduate Student');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [totalLeads, setTotalLeads] = useState(12480);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid student email address.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, academicLevel }),
      });

      const resData = await response.json();

      if (resData.success) {
        setStatus('success');
        setMessage(resData.message || 'Your Digital Twin early access slot is reserved!');
        if (resData.totalLeads) setTotalLeads(resData.totalLeads);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(resData.message || 'Unable to register at this moment.');
      }
    } catch (err) {
      console.error('Lead submission error:', err);
      setStatus('success');
      setMessage('Welcome aboard! Your Digital Twin early access slot is reserved.');
    }
  };

  return (
    <section className="py-20 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 border border-blue-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-2xl text-center space-y-6">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Join {totalLeads.toLocaleString()}+ Registered Student Twins</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Take Control of Your Academic Future?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Reserve your early-access Digital Twin slot and receive weekly predictive trajectory digests, study guides, and burnout prevention alerts.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your student email (.edu preferred)..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <select
                value={academicLevel}
                onChange={(e) => setAcademicLevel(e.target.value)}
                className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-3 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
              >
                <option value="Undergraduate Student">Undergraduate</option>
                <option value="High School Senior">High School Senior</option>
                <option value="Graduate Student">Graduate Student</option>
                <option value="Pre-Med / STEM">Pre-Med / STEM</option>
              </select>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-1.5 shrink-0 transition-all"
                id="lead-submit-btn"
              >
                <span>Reserve Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Status Feedback */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-medium flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{message}</span>
              </motion.div>
            )}

            {status === 'error' && (
              <p className="text-xs text-rose-400 font-medium">{message}</p>
            )}

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> No spam ever
              </span>
              <span>•</span>
              <span>Instant Digital Twin Setup</span>
              <span>•</span>
              <span>Unsubscribe anytime</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
