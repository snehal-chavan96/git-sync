import { motion } from 'motion/react';

export default function SyncProgressBar({ syncProgress, theme }) {
  const isDark = theme === 'dark';

  return (
    <div className={`py-3 px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors ${
      isDark ? 'bg-zinc-900/60' : 'bg-[#ddf4ff]/50'
    }`}>
      <span className={`text-xs font-mono flex items-center gap-2 ${isDark ? 'text-[#54aeff]' : 'text-[#0969da]'}`}>
        <span className={`w-2 h-2 animate-ping rounded-none ${isDark ? 'bg-[#54aeff]' : 'bg-[#0969da]'}`} />
        <span>Synchronizing repository collaborations metadata...</span>
      </span>
      <div className="flex items-center gap-3 w-full sm:w-64">
        <div className={`h-2 w-full rounded-none overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-[#d0d7de]'}`}>
          <motion.div 
            className={`h-full ${isDark ? 'bg-[#54aeff]' : 'bg-[#0969da]'}`}
            initial={{ width: '0%' }}
            animate={{ width: `${syncProgress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
        <span className={`text-xs font-mono font-semibold ${isDark ? 'text-zinc-300' : 'text-[#24292f]'}`}>{syncProgress}%</span>
      </div>
    </div>
  );
}
