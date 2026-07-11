import { Search } from 'lucide-react';

export default function EmptyState({ searchQuery, selectedLanguage, onClearFilters, theme }) {
  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center border rounded-none my-6 w-full transition-colors duration-200 ${
      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-[#f6f8fa] border-[#d0d7de]'
    }`}>
      <div className={`w-12 h-12 flex items-center justify-center mb-4 border ${
        isDark ? 'bg-zinc-850 border-zinc-750 text-zinc-500' : 'bg-white border-[#d0d7de] text-[#afb8c1]'
      }`}>
        <Search className="w-5 h-5" />
      </div>
      <h5 className={`font-display font-bold text-sm ${isDark ? 'text-zinc-200' : 'text-[#24292f]'}`}>No matching repositories found</h5>
      <p className={`text-xs mt-1 max-w-sm font-light ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`}>
        No active synchronizations match query "{searchQuery}" or selected pill "{selectedLanguage}". Change filters to restore lists.
      </p>
      <button
        onClick={onClearFilters}
        className={`mt-4 px-4 py-1.5 rounded-none border text-xs transition-colors font-semibold cursor-pointer ${
          isDark 
            ? 'bg-zinc-850 hover:bg-zinc-800 text-zinc-100 border-zinc-750' 
            : 'bg-white border-[#d0d7de] text-[#24292f] hover:bg-[#f6f8fa]'
        }`}
      >
        Clear Filters
      </button>
    </div>
  );
}
