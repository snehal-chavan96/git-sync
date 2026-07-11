import { motion } from 'motion/react';
import { CheckCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="fixed bottom-6 right-6 z-50 max-w-md w-full sm:w-auto p-[1px] bg-[#d0d7de]"
    >
      <div className="bg-white border-l-4 border-[#0969da] text-[#24292f] py-3.5 px-4 rounded-none shadow-md flex items-start space-x-3">
        <div className="mt-0.5">
          {toast.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-[#2da44e]" />
          ) : (
            <Info className="w-4 h-4 text-[#0969da]" />
          )}
        </div>
        <div className="flex-1 text-xs font-light leading-relaxed pr-6 text-[#24292f]">
          {toast.message}
        </div>
        <button 
          onClick={onClose}
          className="text-[#57606a] hover:text-[#24292f] absolute top-3 right-3 p-0.5 cursor-pointer"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
