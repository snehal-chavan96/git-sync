import { X, Sparkles } from 'lucide-react';

export default function InsightsPanel({ onClose, totalRepos, totalContributors, averageStars, topLanguages, theme }) {
  const isDark = theme === 'dark';

  return (
    <div className={`border p-6 rounded-none mb-8 relative overflow-hidden transition-colors duration-200 ${
      isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-[#ffffff] border-[#d0d7de] github-shadow'
    }`}>
      <div className="absolute top-0 right-0 p-3">
        <button 
          onClick={onClose}
          className={`p-1 cursor-pointer transition-colors ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-[#57606a] hover:text-[#24292f]'
          }`}
          title="Close Insights Panel"
          id="close-insights"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <h3 className={`text-xs font-mono uppercase tracking-widest mb-4 flex items-center space-x-2 font-bold ${
        isDark ? 'text-[#54aeff]' : 'text-[#0969da]'
      }`}>
        <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
        <span>INTELLIGENT SYNC TELEMETRY</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {/* Synced Repos */}
        <div className={`p-4 rounded-none border ${isDark ? 'bg-zinc-850/50 border-zinc-850' : 'bg-[#f6f8fa] border-[#d0d7de]'}`}>
          <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`}>Tracked Repositories</div>
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl font-bold ${isDark ? 'text-zinc-100' : 'text-[#24292f]'}`}>{totalRepos}</span>
            <span className="text-xs text-[#2da44e] font-semibold">Active</span>
          </div>
          <div className={`h-[2px] w-full mt-3 ${isDark ? 'bg-zinc-800' : 'bg-[#d0d7de]'}`}>
            <div className="h-full bg-[#0969da] w-full" />
          </div>
        </div>

        {/* Contributors */}
        <div className={`p-4 rounded-none border ${isDark ? 'bg-zinc-850/50 border-zinc-855' : 'bg-[#f6f8fa] border-[#d0d7de]'}`}>
          <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`}>Active Developers</div>
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl font-bold ${isDark ? 'text-zinc-100' : 'text-[#24292f]'}`}>{totalContributors}</span>
            <span className="text-xs text-[#0969da] font-semibold">Synced</span>
          </div>
          <div className={`h-[2px] w-full mt-3 ${isDark ? 'bg-zinc-800' : 'bg-[#d0d7de]'}`}>
            <div className="h-full bg-[#0969da] w-[78%]" />
          </div>
        </div>

        {/* Stars metrics */}
        <div className={`p-4 rounded-none border ${isDark ? 'bg-zinc-850/50 border-zinc-855' : 'bg-[#f6f8fa] border-[#d0d7de]'}`}>
          <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`}>Average Star Weight</div>
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl font-bold ${isDark ? 'text-zinc-100' : 'text-[#24292f]'}`}>{averageStars}</span>
            <span className={`text-xs ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`}>stars/repo</span>
          </div>
          <div className={`h-[2px] w-full mt-3 ${isDark ? 'bg-zinc-800' : 'bg-[#d0d7de]'}`}>
            <div className={`h-full w-3/5 ${isDark ? 'bg-zinc-500' : 'bg-[#57606a]'}`} />
          </div>
        </div>

        {/* Language Share split */}
        <div className={`p-4 rounded-none border ${isDark ? 'bg-zinc-850/50 border-zinc-855' : 'bg-[#f6f8fa] border-[#d0d7de]'}`}>
          <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`}>Dominant Languages</div>
          <div className="space-y-1.5 mt-2">
            {topLanguages.map(([lang, count]) => {
              const pct = totalRepos > 0 ? Math.round((count / totalRepos) * 100) : 0;
              return (
                <div key={lang} className="flex items-center justify-between text-[10px] font-mono">
                  <span className={`font-medium ${isDark ? 'text-zinc-200' : 'text-[#24292f]'}`}>{lang}</span>
                  <span className={isDark ? 'text-zinc-400' : 'text-[#57606a]'}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
