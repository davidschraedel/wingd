import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { HeartHandshakeIcon } from "./HeartHandshakeIcon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SignupScreenProps {
  onNavigate: (screen: string) => void;
}

export function SignupScreen({
  onNavigate,
}: SignupScreenProps) {
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate("home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F5FF] via-[#F0F9FF] to-[#FFF4F0] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <button
          onClick={() => onNavigate("login")}
          className="mb-4 text-[#3A3A45] flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-[#1da6e0]/10">
          {/* Logo and Title */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-center mb-8"
          >
            <div className="w-64 h-40 lg:w-96 lg:h-48 p-1 lg:p-4 rounded-2xl flex items-center justify-center mx-auto mb-[16px] mt-[0px]">
              <HeartHandshakeIcon
                className="h-auto"
                size={68}
              />
            </div>
            <h1 className="text-[#3A3A45] mb-2 text-[20px] font-bold not-italic">
              Join Wingd
            </h1>
            <p className="text-[rgb(98,98,106)] text-sm">
              Create your account and start connecting
            </p>
          </motion.div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-[#1da6e0]/10">
              <Input
                type="text"
                placeholder="Full Name"
                className="bg-transparent border-0 text-[#3A3A45] placeholder:text-[#71717A] focus-visible:ring-0"
              />
            </div>

            <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-[#1da6e0]/10">
              <Input
                type="email"
                placeholder="Email"
                className="bg-transparent border-0 text-[#3A3A45] placeholder:text-[#71717A] focus-visible:ring-0"
              />
            </div>

            <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-[#1da6e0]/10">
              <Input
                type="password"
                placeholder="Password"
                className="bg-transparent border-0 text-[#3A3A45] placeholder:text-[#71717A] focus-visible:ring-0"
              />
            </div>

            <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-[#1da6e0]/10">
              <Input
                type="password"
                placeholder="Confirm Password"
                className="bg-transparent border-0 text-[#3A3A45] placeholder:text-[#71717A] focus-visible:ring-0"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1da6e0] to-[#05638f] text-white hover:from-[#05638f] hover:to-[#1da6e0] rounded-2xl py-6 shadow-md mt-6 border-0"
            >
              Create Account
            </Button>
          </form>

          {/* Terms */}
          <div className="mt-4 text-center">
            <p className="text-[#71717A] text-xs">
              By signing up, you agree to our{" "}
              <button className="underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button className="underline">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}