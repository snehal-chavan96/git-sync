import { Sparkle, ArrowUpRight } from 'lucide-react';

export default function ProPromoCard({ isPremium, onTogglePremium, theme }) {
  const isDark = theme === 'dark';

  return (
    <div
      className={`border rounded-none p-6 flex flex-col items-center justify-center text-center transition-all duration-300 h-full ${
        isPremium 
          ? isDark 
            ? 'border-[#2da44e] bg-[#2da44e]/10 text-zinc-100'
            : 'border-[#2da44e] bg-[#dafbe1]/40' 
          : isDark 
            ? 'border-zinc-800 hover:border-[#0969da] bg-zinc-900 text-zinc-100'
            : 'border-[#d0d7de] hover:border-[#0969da] bg-[#f6f8fa]'
      }`}
    >
      <div className={`w-12 h-12 rounded-none flex items-center justify-center mb-4 border ${
        isPremium 
          ? isDark 
            ? 'bg-[#2da44e]/20 text-[#2da44e] border-[#2da44e]'
            : 'bg-[#dafbe1] text-[#1f883d] border-[#2da44e]' 
          : isDark 
            ? 'bg-zinc-850 text-[#54aeff] border-zinc-750'
            : 'bg-white text-[#0969da] border-[#d0d7de]'
      }`}>
        <Sparkle className="w-5 h-5 animate-pulse" />
      </div>
      
      <h4 className={`text-sm font-bold uppercase tracking-wider mb-1 ${
        isPremium ? 'text-[#1f883d]' : 'text-[#0969da]'
      }`}>
        {isPremium ? "Pro Activated" : "Pro Integration"}
      </h4>
      
      <p className={`text-xs max-w-[200px] mb-4 font-light leading-relaxed ${
        isDark ? 'text-zinc-400' : 'text-[#57606a]'
      }`}>
        {isPremium 
          ? "Your high-velocity team-wide synchronized pipeline is fully unlocked." 
          : "Unlock multi-node repository sync, branch state security, and automated PR trackers."}
      </p>

      <button
        onClick={onTogglePremium}
        className={`text-xs px-4 py-1.5 rounded-none font-bold flex items-center gap-1.5 transition-all border cursor-pointer ${
          isPremium 
            ? isDark
              ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
              : 'bg-white border-[#d0d7de] text-[#57606a] hover:bg-[#f6f8fa]' 
            : 'bg-[#0969da] text-white border-[#0258b3] hover:bg-[#0c58c2] shadow-sm'
        }`}
      >
        <span>{isPremium ? "Disable Pro" : "Upgrade to Pro"}</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
