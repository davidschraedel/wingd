import { motion } from "motion/react";
import { HeartHandshakeIcon } from "./HeartHandshakeIcon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const handleLogin = (e: React.FormEvent) => {
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
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-[#1da6e0]/10">
          {/* Logo and Title */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-center mb-8"
          >
            <div className="w-64 h-40 lg:w-96 lg:h-48 p-1 lg:p-4 rounded-2xl flex items-center justify-center mx-auto mb-[16px] mt-[0px]">
              <HeartHandshakeIcon
                className="w-full h-auto max-h-40 object-contain"
              />
            </div>
            <h1 className="text-[#3A3A45] mb-2 text-[20px] lg:text-[24px] font-bold not-italic">
              Wingd
            </h1>
            <p className="text-[rgb(98,98,106)] text-sm">
              Discover love through
              <br />
              the people you trust
            </p>
          </motion.div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-[#1da6e0]/10">
              <Input
                type="email"
                placeholder="Email"
                className="bg-transparent border-0  text-[#3A3A45] placeholder:text-[#71717A] focus-visible:ring-0"
              />
            </div>

            <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-[#1da6e0]/10">
              <Input
                type="password"
                placeholder="Password"
                className="bg-transparent border-0 text-[#3A3A45] placeholder:text-[#71717A] focus-visible:ring-0"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1da6e0] to-[#05638f] text-white hover:from-[#05638f] hover:to-[#1da6e0] rounded-2xl py-6 shadow-md border-0"
            >
              Sign In
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-6 space-y-3">
            <Button
              type="button"
              className="w-full bg-white/95 hover:bg-white border-0 rounded-2xl py-6 shadow-md text-[rgb(98,98,106)]"
              onClick={() => onNavigate("home")}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              type="button"
              className="w-full bg-white/95 hover:bg-white border-0 rounded-2xl py-6 shadow-md text-[rgb(98,98,106)]"
              onClick={() => onNavigate("home")}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Continue with Apple
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate("signup")}
              className="text-[#71717A] text-sm hover:text-[#3A3A45] transition-colors"
            >
              Don't have an account?{" "}
              <span className="underline">Sign up</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}