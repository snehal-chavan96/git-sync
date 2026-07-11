import { ExternalLink, Clock, Star, GitFork } from 'lucide-react';

export default function RepositoryCard({ repo, onSelectLanguage, theme, viewLayout }) {
  const isDark = theme === 'dark';

  if (viewLayout === 'list') {
    return (
      <div className={`border p-4 sm:p-5 rounded-none flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all group relative hover:shadow-[0_4px_12px_rgba(27,31,35,0.08)] w-full ${
        isDark 
          ? 'bg-zinc-900 border-zinc-800 hover:border-[#0969da] text-zinc-100' 
          : 'bg-[#ffffff] border-[#d0d7de] hover:border-[#0969da] text-[#24292f]'
      }`}>
        {/* Accent Left Bar indicating safe state */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2da44e]" />

        {/* Left block: Owner, Name, and Description */}
        <div className="flex-1 min-w-0 pl-3">
          <div className="flex items-center space-x-1.5 font-mono text-[11px] mb-1">
            <span className={`font-medium transition-colors ${
              isDark ? 'text-zinc-400 hover:text-[#0969da]' : 'text-[#57606a] hover:text-[#0969da]'
            }`}>
              {repo.owner}
            </span>
            <span className={isDark ? 'text-zinc-700' : 'text-[#afb8c1]'}>/</span>
            <span className="w-1.5 h-1.5 rounded-none bg-[#2da44e]" title="Synced State Healthy" />
          </div>
          
          <h4 className={`font-display font-bold text-base group-hover:text-[#0969da] transition-colors duration-150 ${
            isDark ? 'text-zinc-100' : 'text-[#24292f]'
          }`}>
            {repo.name}
          </h4>

          <p className={`text-xs mt-1.5 font-light leading-relaxed max-w-2xl ${
            isDark ? 'text-zinc-400' : 'text-[#57606a]'
          }`}>
            {repo.description}
          </p>
        </div>

        {/* Center block: Languages */}
        <div className="flex flex-wrap items-center gap-1.5 md:px-4">
          {repo.languages.map(lang => (
            <span 
              key={lang}
              onClick={() => onSelectLanguage(lang)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded-none border cursor-pointer transition-all ${
                isDark 
                  ? 'bg-zinc-800 text-zinc-300 border-zinc-750 hover:border-zinc-500 hover:bg-zinc-700 hover:text-white' 
                  : 'bg-[#f6f8fa] text-[#57606a] border-[#d0d7de] hover:border-[#57606a] hover:text-[#24292f]'
              }`}
            >
              {lang}
            </span>
          ))}
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-none border ${
            isDark ? 'bg-zinc-850 text-zinc-500 border-zinc-800' : 'bg-white text-[#57606a] border-[#d0d7de]'
          }`}>
            v2.4.0
          </span>
        </div>

        {/* Right block: Stats & External Link */}
        <div className={`flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 min-w-[220px] ${
          isDark ? 'border-zinc-800/80' : 'border-[#d0d7de]/60'
        }`}>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className={`flex items-center gap-1 ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`} title="Stars count">
              <Star className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-500' : 'text-[#afb8c1]'}`} />
              <span>{repo.stars}</span>
            </span>
            <span className={`flex items-center gap-1 ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`} title="Forks count">
              <GitFork className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-500' : 'text-[#afb8c1]'}`} />
              <span>{repo.forks}</span>
            </span>
          </div>

          <div className={`flex items-center gap-1.5 text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`}>
            <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-500' : 'text-[#afb8c1]'}`} />
            <span>{repo.detectedAt.includes('UTC') ? 'Recent' : '4h ago'}</span>
          </div>

          <div className="flex items-center">
            <a 
              href={repo.url} 
              target="_blank" 
              rel="noreferrer" 
              className={`transition-colors p-1 ${
                isDark ? 'text-zinc-400 hover:text-[#0969da]' : 'text-[#57606a] hover:text-[#0969da]'
              }`}
              title="View on GitHub"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Standard)
  return (
    <div className={`border p-6 rounded-none flex flex-col justify-between hover:border-[#0969da] transition-all group relative hover:shadow-[0_4px_12px_rgba(27,31,35,0.08)] h-full ${
      isDark 
        ? 'bg-zinc-900 border-zinc-800 text-zinc-100 hover:border-[#0969da]' 
        : 'bg-[#ffffff] border-[#d0d7de] hover:border-[#0969da] text-[#24292f]'
    }`}>
      {/* Accent Top Bar indicating safe state */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#2da44e]" />

      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-1 font-mono text-xs">
            <span className={`transition-colors font-medium ${
              isDark ? 'text-zinc-400 hover:text-[#0969da]' : 'text-[#57606a] hover:text-[#0969da]'
            }`}>
              {repo.owner}
            </span>
            <span className={isDark ? 'text-zinc-700' : 'text-[#afb8c1]'}>/</span>
          </div>
          
          <div className="flex items-center gap-2">
            <a 
              href={repo.url} 
              target="_blank" 
              rel="noreferrer" 
              className={`transition-colors ${
                isDark ? 'text-zinc-400 hover:text-[#0969da]' : 'text-[#57606a] hover:text-[#0969da]'
              }`}
              title="View on GitHub"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="w-2.5 h-2.5 rounded-none bg-[#2da44e]" title="Synced State Healthy" />
          </div>
        </div>

        <h4 className={`font-display font-bold text-base group-hover:text-[#0969da] transition-colors duration-150 mb-2 ${
          isDark ? 'text-zinc-100' : 'text-[#24292f]'
        }`}>
          {repo.name}
        </h4>

        <p className={`text-xs leading-relaxed mb-6 font-light min-h-[48px] ${
          isDark ? 'text-zinc-400' : 'text-[#57606a]'
        }`}>
          {repo.description}
        </p>

        {/* Language Pills with 0 rounded shape */}
        <div className={`flex items-center flex-wrap gap-1.5 mb-4 pt-2 border-t ${
          isDark ? 'border-zinc-800' : 'border-[#f6f8fa]'
        }`}>
          {repo.languages.map(lang => (
            <span 
              key={lang}
              onClick={() => onSelectLanguage(lang)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded-none border cursor-pointer transition-all ${
                isDark 
                  ? 'bg-zinc-800 text-zinc-300 border-zinc-750 hover:border-zinc-500 hover:bg-zinc-700 hover:text-white' 
                  : 'bg-[#f6f8fa] text-[#57606a] border-[#d0d7de] hover:border-[#57606a] hover:text-[#24292f]'
              }`}
            >
              {lang}
            </span>
          ))}
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-none border ${
            isDark ? 'bg-zinc-850 text-zinc-500 border-zinc-800' : 'bg-[#ffffff] text-[#57606a] border-[#d0d7de]'
          }`}>
            v2.4.0
          </span>
        </div>
      </div>

      {/* Metadata and Stats */}
      <div className={`flex items-center justify-between pt-3 border-t mt-auto ${
        isDark ? 'border-zinc-800/80' : 'border-[#d0d7de]/60'
      }`}>
        <div className={`flex items-center gap-1.5 text-xs font-mono ${
          isDark ? 'text-zinc-400' : 'text-[#57606a]'
        }`}>
          <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-500' : 'text-[#afb8c1]'}`} />
          <span>{repo.detectedAt.includes('UTC') ? 'Recent' : '4h ago'}</span>
        </div>

        <div className={`flex items-center gap-3 text-[11px] font-mono ${
          isDark ? 'text-zinc-400' : 'text-[#57606a]'
        }`}>
          <span className="flex items-center gap-1" title="Stars count">
            <Star className={`w-3 h-3 ${isDark ? 'text-zinc-500' : 'text-[#afb8c1]'}`} />
            <span>{repo.stars}</span>
          </span>
          <span className="flex items-center gap-1" title="Forks count">
            <GitFork className={`w-3 h-3 ${isDark ? 'text-zinc-500' : 'text-[#afb8c1]'}`} />
            <span>{repo.forks}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
