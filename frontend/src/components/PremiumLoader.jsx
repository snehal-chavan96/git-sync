import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export default function PremiumLoader({ theme, viewLayout }) {
  const isDark = theme === 'dark';
  const skeletons = Array.from({ length: 3 });

  // Container motion stagger configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Premium Minimal Loading Status Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`border p-4 flex items-center gap-4 rounded-none overflow-hidden relative ${
          isDark 
            ? 'bg-zinc-900/40 border-zinc-800 text-zinc-100' 
            : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f]'
        }`}
      >
        {/* Glow accent element */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] ${
          isDark ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500' : 'bg-gradient-to-r from-[#0969da] via-indigo-500 to-[#2da44e]'
        }`} />

        <div className="flex items-center gap-3.5">
          <div className={`w-10 h-10 flex items-center justify-center rounded-none border shrink-0 ${
            isDark ? 'bg-zinc-850 border-zinc-750' : 'bg-white border-[#d0d7de]'
          }`}>
            <Loader2 className={`w-5 h-5 animate-spin ${isDark ? 'text-blue-400' : 'text-[#0969da]'}`} />
          </div>

          <div>
            <h4 className="text-sm font-semibold font-sans">
              Fetching repositories...
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-[#57606a]'}`}>
              Synchronizing with GitHub...
            </p>
          </div>
        </div>
      </motion.div>

      {/* Skeletons rendering matched to the current ViewLayout */}
      {viewLayout === 'list' ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 w-full"
        >
          {skeletons.map((_, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`border p-4 sm:p-5 rounded-none flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden ${
                isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-[#d0d7de]'
              }`}
            >
              {/* Shimmer element overlays */}
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-zinc-500/5 md:via-zinc-500/10 to-transparent" />
              
              {/* Accent Left Bar indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-zinc-400/30" />

              {/* Left block info */}
              <div className="flex-1 min-w-0 pl-3">
                <div className="flex items-center space-x-1.5 mb-2">
                  <div className={`h-3 w-16 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                  <span className={isDark ? 'text-zinc-800' : 'text-zinc-250'}>/</span>
                  <div className={`w-1.5 h-1.5 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
                </div>
                
                <div className={`h-4.5 w-48 mb-2.5 rounded-none ${isDark ? 'bg-zinc-800/80' : 'bg-zinc-200'}`} />

                <div className="space-y-1.5">
                  <div className={`h-3 w-full max-w-[580px] rounded-none ${isDark ? 'bg-zinc-850' : 'bg-zinc-100'}`} />
                  <div className={`h-3 w-2/3 max-w-[340px] rounded-none ${isDark ? 'bg-zinc-850' : 'bg-zinc-100'}`} />
                </div>
              </div>

              {/* Center Languages */}
              <div className="flex flex-wrap items-center gap-1.5 md:px-4">
                <div className={`h-5 w-12 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                <div className={`h-5 w-14 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                <div className={`h-5 w-10 rounded-none ${isDark ? 'bg-zinc-850' : 'bg-zinc-100'}`} />
              </div>

              {/* Right Stats block */}
              <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-0 border-dashed border-zinc-850">
                <div className="flex gap-4">
                  <div className={`h-4.5 w-10 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                  <div className={`h-4.5 w-10 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                </div>
                <div className={`h-4.5 w-16 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                <div className={`h-5 w-5 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {skeletons.map((_, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`border p-6 rounded-none flex flex-col justify-between relative overflow-hidden h-[240px] ${
                isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-[#d0d7de]'
              }`}
            >
              {/* Shimmer overlay effect */}
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-zinc-500/5 md:via-zinc-500/10 to-transparent" />

              {/* Top Accent line skeleton */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-zinc-400/20" />

              <div>
                {/* Header row */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-1.5">
                    <div className={`h-3 w-16 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                    <span className={isDark ? 'text-zinc-800' : 'text-zinc-200'}>/</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-4 w-4 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                    <div className={`w-2.5 h-2.5 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
                  </div>
                </div>

                {/* Title */}
                <div className={`h-5 w-3/4 mb-3.5 rounded-none ${isDark ? 'bg-zinc-800/80' : 'bg-zinc-200'}`} />

                {/* Description sentences */}
                <div className="space-y-2 mb-6">
                  <div className={`h-3 w-full rounded-none ${isDark ? 'bg-zinc-850' : 'bg-zinc-100'}`} />
                  <div className={`h-3 w-5/6 rounded-none ${isDark ? 'bg-zinc-850' : 'bg-zinc-100'}`} />
                </div>
              </div>

              {/* Card Footer */}
              <div>
                <div className="flex gap-1.5 mb-4">
                  <div className={`h-5 w-12 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                  <div className={`h-5 w-14 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                </div>

                <div className={`h-[1.5px] w-full mb-3 ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />

                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <div className={`h-4 w-8 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                    <div className={`h-4 w-8 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                  </div>
                  <div className={`h-4 w-16 rounded-none ${isDark ? 'bg-zinc-800' : 'bg-zinc-150'}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
