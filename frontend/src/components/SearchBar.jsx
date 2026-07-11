import { motion } from 'motion/react';
import { Search, SlidersHorizontal, X, LayoutGrid, List } from 'lucide-react';
import { ALL_LANGUAGES } from '../data';

export default function SearchBar({ 
  searchQuery, 
  setSearchQuery, 
  selectedLanguage, 
  setSelectedLanguage, 
  autoSync, 
  onToggleAutoSync,
  theme,
  viewLayout,
  setViewLayout
}) {
  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center py-4 mb-6 border-b gap-4 p-4 rounded-none transition-colors duration-200 ${
      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-[#f6f8fa] border-[#d0d7de]'
    }`}>
      
      {/* Left: Search query input */}
      <div className="relative w-full lg:max-w-md">
        <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-zinc-500' : 'text-[#57606a]'}`} />
        <input 
          type="text" 
          placeholder="Search synced repositories by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full border rounded-none py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] outline-none transition-all font-mono ${
            isDark 
              ? 'bg-zinc-850 border-zinc-800 text-zinc-100 placeholder-zinc-550' 
              : 'bg-[#ffffff] border-[#d0d7de] text-[#24292f] placeholder-[#57606a]'
          }`}
          id="search-input"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-0.5 cursor-pointer ${
              isDark ? 'text-zinc-400 hover:text-white' : 'text-[#57606a] hover:text-[#24292f]'
            }`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Right Controls: Filters & AutoSync Switch & View Mode Layout Switcher */}
      <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
        
        {/* Pill Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none max-w-full">
          <div className={`flex items-center pr-2 text-[10px] font-mono tracking-wider uppercase ${
            isDark ? 'text-zinc-400' : 'text-[#57606a]'
          }`}>
            <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
            Pills:
          </div>
          {ALL_LANGUAGES.slice(0, 5).map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded-none text-xs font-mono border transition-all duration-150 cursor-pointer ${
                selectedLanguage === lang
                  ? isDark
                    ? 'bg-zinc-100 border-zinc-100 text-zinc-950 font-semibold'
                    : 'bg-[#24292f] border-[#24292f] text-white font-medium'
                  : isDark
                    ? 'bg-zinc-850 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                    : 'bg-white border-[#d0d7de] text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Sharp Auto Sync toggle */}
        <div className={`flex items-center gap-3 border py-1 px-3 rounded-none ${
          isDark ? 'bg-zinc-850 border-zinc-800' : 'bg-[#ffffff] border-[#d0d7de]'
        }`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${
            isDark ? 'text-zinc-400' : 'text-[#57606a]'
          }`}>Auto-Sync</span>
          <button
            onClick={onToggleAutoSync}
            className={`relative w-10 h-5 rounded-none transition-colors duration-200 outline-none border cursor-pointer ${
              autoSync ? 'bg-[#2da44e] border-[#1f883d]' : (isDark ? 'bg-zinc-800 border-zinc-750' : 'bg-[#e9ecf0] border-[#d0d7de]')
            }`}
            id="toggle-auto-sync"
            title="Toggle Daily Automated Sync"
          >
            <motion.div 
              className="w-3.5 h-3.5 rounded-none bg-white absolute top-[2px] left-[2px] border border-zinc-350"
              animate={{ x: autoSync ? 20 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        {/* Layout View Switcher */}
        <div className={`flex items-center border p-0.5 rounded-none ${
          isDark ? 'bg-zinc-850 border-zinc-800' : 'bg-white border-[#d0d7de]'
        }`}>
          <button
            onClick={() => setViewLayout('grid')}
            className={`p-1.5 transition-all cursor-pointer rounded-none ${
              viewLayout === 'grid'
                ? isDark ? 'bg-zinc-700 text-white font-bold' : 'bg-[#24292f] text-white font-medium'
                : isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-[#57606a] hover:text-[#24292f]'
            }`}
            title="Grid View"
            id="view-grid-toggle"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewLayout('list')}
            className={`p-1.5 transition-all cursor-pointer rounded-none ${
              viewLayout === 'list'
                ? isDark ? 'bg-zinc-700 text-white font-bold' : 'bg-[#24292f] text-white font-medium'
                : isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-[#57606a] hover:text-[#24292f]'
            }`}
            title="List View"
            id="view-list-toggle"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
