import { Github, RefreshCw, Sun, Moon } from 'lucide-react';

export default function Navbar({ isPremium, isSyncing, onSync, theme, onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <nav className={`h-16 flex items-center justify-between px-6 sm:px-12 border-b transition-colors duration-200 z-20 ${
      isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f]'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-none flex items-center justify-center ${isDark ? 'bg-zinc-800 border border-zinc-700' : 'bg-[#24292f]'}`}>
          <Github className={`w-5 h-5 ${isDark ? 'text-zinc-100' : 'text-white'}`} />
        </div>
        <span className={`text-lg font-bold tracking-tight uppercase font-display ${isDark ? 'text-zinc-100' : 'text-[#24292f]'}`}>SYNC.</span>
        {isPremium && (
          <span className={`text-[10px] border px-2 py-0.5 rounded-none font-mono font-medium tracking-widest uppercase animate-fade-in ${
            isDark 
              ? 'bg-zinc-800 text-[#54aeff] border-zinc-700' 
              : 'bg-[#ddf4ff] text-[#0969da] border-[#54aeff]/30'
          }`}>
            PRO
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className={`p-2 border transition-all cursor-pointer rounded-none flex items-center justify-center ${
            isDark
              ? 'bg-zinc-800 hover:bg-zinc-750 border-zinc-700 text-yellow-400'
              : 'bg-white hover:bg-zinc-100 border-[#d0d7de] text-[#57606a]'
          }`}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          id="btn-theme-toggle"
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-none border ${
          isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-[#ffffff] border-[#d0d7de] text-[#57606a]'
        }`}>
          <div className="w-2 h-2 rounded-none bg-[#2da44e] animate-pulse"></div>
          <span className="text-[10px] font-mono font-medium uppercase tracking-wider">SYSTEMS_HEALTHY</span>
        </div>

        <button
          onClick={onSync}
          disabled={isSyncing}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-none text-xs font-semibold tracking-wide transition-all border ${
            isSyncing 
              ? isDark 
                ? 'bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed'
                : 'bg-[#f6f8fa] border-[#d0d7de] text-[#afb8c1] cursor-not-allowed'
              : 'bg-[#2da44e] hover:bg-[#2c974b] active:bg-[#298e46] text-white border-[#1f883d] cursor-pointer shadow-sm'
          }`}
          id="btn-sync-github"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? "Syncing..." : "Sync with GitHub"}</span>
        </button>

        <div className={`flex items-center space-x-2 border py-0.5 px-2 rounded-none ${
          isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-[#ffffff] border-[#d0d7de]'
        }`}>
          <div className={`w-5 h-5 rounded-none flex items-center justify-center text-[10px] font-bold ${
            isDark ? 'bg-zinc-700 text-zinc-100' : 'bg-[#afb8c1] text-white'
          }`}>
            JD
          </div>
          <span className={`text-xs font-mono hidden md:inline ${isDark ? 'text-zinc-300' : 'text-[#57606a]'}`}>snehal.chavan</span>
        </div>
      </div>
    </nav>
  );
}
