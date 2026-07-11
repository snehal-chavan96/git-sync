import { motion } from 'motion/react';
import { Plus, X } from 'lucide-react';

export default function AddRepositoryForm({
  isAddingRepo,
  setIsAddingRepo,
  newRepoName,
  setNewRepoName,
  newRepoOwner,
  setNewRepoOwner,
  newRepoLanguage,
  setNewRepoLanguage,
  newRepoDesc,
  setNewRepoDesc,
  onSubmit,
  theme
}) {
  const isDark = theme === 'dark';

  if (!isAddingRepo) {
    return (
      <div
        onClick={() => setIsAddingRepo(true)}
        className={`border-2 border-dashed rounded-none flex flex-col items-center justify-center gap-3 p-8 cursor-pointer transition-all min-h-[240px] h-full ${
          isDark 
            ? 'border-zinc-800 hover:border-[#0969da] bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-[#0969da]' 
            : 'border-[#d0d7de] hover:border-[#0969da] bg-[#f6f8fa]/50 hover:bg-[#ffffff] text-[#57606a] hover:text-[#0969da]'
        }`}
      >
        <div className={`w-10 h-10 border rounded-none flex items-center justify-center transition-colors ${
          isDark ? 'bg-zinc-850 border-zinc-750 text-zinc-300' : 'bg-white border-[#d0d7de] text-[#57606a]'
        }`}>
          <Plus className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold font-mono uppercase tracking-wider">Add Repository</span>
      </div>
    );
  }

  return (
    <div className={`border-2 p-6 rounded-none flex flex-col justify-between shadow-md relative h-full transition-colors duration-200 ${
      isDark ? 'bg-zinc-900 border-[#0969da] text-zinc-100' : 'bg-[#ffffff] border-[#0969da]'
    }`}>
      <button 
        onClick={() => setIsAddingRepo(false)}
        className={`absolute top-3 right-3 p-1 cursor-pointer transition-colors ${
          isDark ? 'text-zinc-400 hover:text-white' : 'text-[#57606a] hover:text-[#24292f]'
        }`}
        title="Cancel form"
      >
        <X className="w-4 h-4" />
      </button>

      <form onSubmit={onSubmit} className="space-y-3.5">
        <h4 className={`text-xs font-mono uppercase tracking-wider font-bold ${
          isDark ? 'text-[#54aeff]' : 'text-[#0969da]'
        }`}>Track Collaboration</h4>
        
        <div>
          <label className={`block text-[10px] font-mono uppercase mb-1 ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`}>Repository Name</label>
          <input 
            type="text" 
            placeholder="e.g. edge-worker-proxy"
            value={newRepoName}
            onChange={(e) => setNewRepoName(e.target.value)}
            className={`w-full border rounded-none p-2 text-xs outline-none focus:border-[#0969da] font-mono transition-all ${
              isDark ? 'bg-zinc-850 border-zinc-750 text-zinc-100 placeholder-zinc-550' : 'bg-white border-[#d0d7de] text-[#24292f] placeholder-[#57606a]'
            }`}
            required
          />
        </div>

        <div>
          <label className={`block text-[10px] font-mono uppercase mb-1 ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`}>Owner / Org</label>
          <input 
            type="text" 
            placeholder="e.g. cloudflare-labs"
            value={newRepoOwner}
            onChange={(e) => setNewRepoOwner(e.target.value)}
            className={`w-full border rounded-none p-2 text-xs outline-none focus:border-[#0969da] font-mono transition-all ${
              isDark ? 'bg-zinc-850 border-zinc-750 text-zinc-100 placeholder-zinc-550' : 'bg-white border-[#d0d7de] text-[#24292f] placeholder-[#57606a]'
            }`}
            required
          />
        </div>

        <div>
          <label className={`block text-[10px] font-mono uppercase mb-1 ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`}>Short Description</label>
          <input 
            type="text" 
            placeholder="e.g. Edge runtime API router"
            value={newRepoDesc}
            onChange={(e) => setNewRepoDesc(e.target.value)}
            className={`w-full border rounded-none p-2 text-xs outline-none focus:border-[#0969da] font-mono transition-all ${
              isDark ? 'bg-zinc-850 border-zinc-750 text-zinc-100 placeholder-zinc-550' : 'bg-white border-[#d0d7de] text-[#24292f] placeholder-[#57606a]'
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={`block text-[10px] font-mono uppercase mb-1 ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`}>Language</label>
            <select 
              value={newRepoLanguage}
              onChange={(e) => setNewRepoLanguage(e.target.value)}
              className={`w-full border rounded-none p-2 text-xs outline-none focus:border-[#0969da] font-mono cursor-pointer transition-all ${
                isDark ? 'bg-zinc-850 border-zinc-750 text-zinc-100' : 'bg-white border-[#d0d7de] text-[#24292f]'
              }`}
            >
              <option value="TypeScript">TypeScript</option>
              <option value="React">React</option>
              <option value="Rust">Rust</option>
              <option value="Python">Python</option>
              <option value="Go">Go</option>
              <option value="JavaScript">JavaScript</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              type="submit"
              className="w-full py-2 bg-[#2da44e] hover:bg-[#2c974b] text-white text-xs font-bold rounded-none border border-[#1f883d] shadow-sm cursor-pointer"
            >
              Track Repo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
