export default function Footer({ onReset, theme }) {
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t px-6 sm:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 mt-auto transition-colors duration-200 ${
      isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-[#f6f8fa] border-[#d0d7de]'
    }`}>
      <p className={`text-[10px] uppercase tracking-widest font-medium text-center md:text-left ${
        isDark ? 'text-zinc-500' : 'text-[#57606a]'
      }`}>
        © 2026 Sync Collaboration Tools • Active nodes operational (42ms latency)
      </p>
      <div className="flex gap-6 items-center flex-wrap justify-center">
        <a href="#" className={`text-[10px] uppercase tracking-widest font-medium transition-colors ${
          isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-[#57606a] hover:text-[#24292f]'
        }`}>Documentation</a>
        <a href="#" className={`text-[10px] uppercase tracking-widest font-medium transition-colors ${
          isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-[#57606a] hover:text-[#24292f]'
        }`}>Support</a>
        <button
          onClick={onReset}
          className="text-[10px] text-red-600 hover:text-red-500 uppercase tracking-widest font-bold transition-colors cursor-pointer"
          title="Reset state to original repositories list"
        >
          Reset State
        </button>
      </div>
    </footer>
  );
}
