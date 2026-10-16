import { motion } from "motion/react";
import { Compass, ArrowLeft, Home, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface NotFoundScreenProps {
  unmatchedScreen?: string;
  onNavigate: (screen: string) => void;
  onGoBack?: () => void;
}

export function NotFoundScreen({
  unmatchedScreen = "unknown",
  onNavigate,
  onGoBack,
}: NotFoundScreenProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center items-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center"
      >
        {/* Animated Icon Badge */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-tr from-[#1da6e0]/10 to-[#05638f]/20 rounded-full flex items-center justify-center relative">
          <Compass className="w-10 h-10 text-[#1da6e0] animate-pulse" />
          <div className="absolute -top-1 -right-1 bg-[#77d75b] text-white rounded-full p-1 shadow-sm">
            <Sparkles size={14} />
          </div>
        </div>

        <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full mb-3 border border-amber-200">
          Prototype Route Note
        </span>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h1>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          We didn&apos;t plan for you to hit this screen! Because this is an interactive prototype, not all secondary views or deep links are mapped yet.
        </p>

        {unmatchedScreen && (
          <div className="bg-gray-50 border border-gray-200/80 rounded-xl px-4 py-2.5 mb-6 text-left">
            <p className="text-xs text-gray-400 font-mono uppercase tracking-wider mb-0.5">
              Target Screen
            </p>
            <p className="text-sm font-mono text-gray-700 font-semibold break-all">
              &quot;{unmatchedScreen}&quot;
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => {
              if (onGoBack) {
                onGoBack();
              } else {
                onNavigate("home");
              }
            }}
            className="w-full bg-gradient-to-r from-[#1da6e0] to-[#05638f] text-white hover:opacity-95 rounded-xl py-5 font-medium shadow-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </Button>

          <Button
            variant="outline"
            onClick={() => onNavigate("home")}
            className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-5 font-medium flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Return to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
