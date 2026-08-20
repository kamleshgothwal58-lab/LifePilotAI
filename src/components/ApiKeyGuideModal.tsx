import React from 'react';
import { motion } from 'motion/react';
import { X, Key, ShieldCheck, Copy, Check, Terminal, FileCode } from 'lucide-react';

interface ApiKeyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyGuideModal: React.FC<ApiKeyGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const envContent = `# .env file configuration
GEMINI_API_KEY="your_gemini_api_key_here"
APP_URL="http://localhost:3000"`;

  const copyEnv = () => {
    navigator.clipboard.writeText(envContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative space-y-5"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          id="close-api-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">API Key & Environment Setup</h3>
            <p className="text-xs text-slate-400">Gemini LLM Server-Side Integration</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            LifePilot AI uses server-side Gemini 3.6 Flash via <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">@google/genai</code> to compute Digital Twin simulations, GPA trajectories, and streaming mentor chat.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
              <span className="flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-blue-400" /> .env
              </span>
              <button
                onClick={copyEnv}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-cyan-300 font-mono text-[11px] overflow-x-auto whitespace-pre p-2 bg-slate-900 rounded border border-slate-800/80">
              {envContent}
            </pre>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> How It Works in AI Studio:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li>In AI Studio, <code className="text-slate-200 font-mono">GEMINI_API_KEY</code> is automatically injected via the Secrets menu.</li>
              <li>Calls are processed securely in <code className="text-slate-200 font-mono">server.ts</code> so API keys are never exposed to browser bundles.</li>
              <li>If no key is configured, an offline algorithmic twin engine acts as a fallback.</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl text-xs border border-slate-700 transition-colors"
        >
          Got It, Return to App
        </button>
      </motion.div>
    </div>
  );
};
