import { Download, BarChart2 } from 'lucide-react';

export default function HeroHeader({ onExportCSV, showInsights, onToggleInsights, theme }) {
  const isDark = theme === 'dark';

  return (
    <header className={`border p-6 sm:p-10 rounded-none mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden transition-colors duration-200 ${
      isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-[#f6f8fa] border-[#d0d7de]'
    }`}>
      {/* Background High-Quality Light-Themed Unsplash Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none scale-105 opacity-85"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80")',
          backgroundPosition: 'center'
        }}
      />
      {/* Elegant Theme Tech Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r z-0 pointer-events-none ${
        isDark 
          ? 'from-zinc-950/98 via-zinc-950/90 to-zinc-900/40' 
          : 'from-[#ffffff]/98 via-[#ffffff]/85 to-[#ddf4ff]/40'
      }`} />
      
      {/* Accent decoration line */}
      <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#0969da] z-10" />
      
      <div className="max-w-3xl z-10 relative">
        <div className={`inline-flex items-center space-x-2 px-2.5 py-0.5 mb-4 rounded-none border text-[11px] font-mono tracking-wider ${
          isDark 
            ? 'border-zinc-800 bg-zinc-900 text-zinc-400' 
            : 'border-[#d0d7de] bg-white text-[#57606a]'
        }`}>
          <span className="w-1.5 h-1.5 bg-[#2da44e] animate-pulse" />
          <span>COLLABORATION INTEGRATION GATEWAY</span>
        </div>
        
        <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tighter mb-3 font-display ${
          isDark ? 'text-zinc-100' : 'text-[#24292f]'
        }`}>
          Command Your Collaborations.
        </h1>
        <p className={`text-sm sm:text-base font-light leading-relaxed max-w-2xl ${
          isDark ? 'text-zinc-400' : 'text-[#57606a]'
        }`}>
          A high-performance command center to map team alignment, register newly synchronized GitHub repositories, and track contribution healthy pathways instantly.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 w-full md:w-auto z-10 relative">
        <button 
          onClick={onExportCSV}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold border rounded-none transition-colors w-full sm:w-auto shadow-sm cursor-pointer ${
            isDark 
              ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border-zinc-800' 
              : 'bg-white hover:bg-[#f6f8fa] text-[#24292f] border-[#d0d7de]'
          }`}
          title="Export Current Repositories to CSV File"
          id="btn-export-csv"
        >
          <Download className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`} />
          <span>Export CSV</span>
        </button>

        <button 
          onClick={onToggleInsights}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold border rounded-none transition-all w-full sm:w-auto shadow-sm cursor-pointer ${
            showInsights 
              ? isDark 
                ? 'bg-[#0969da]/20 border-[#0969da]/40 text-[#54aeff]' 
                : 'bg-[#ddf4ff] border-[#54aeff]/40 text-[#0969da]' 
              : isDark 
                ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-100' 
                : 'bg-white hover:bg-[#f6f8fa] border-[#d0d7de] text-[#24292f]'
          }`}
          id="btn-view-insights"
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>{showInsights ? "Close Insights" : "View Insights"}</span>
        </button>
      </div>
    </header>
  );
}
