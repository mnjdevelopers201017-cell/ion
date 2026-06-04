"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816]">

      {/* Background Glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Floating Orb */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 h-40 w-40 rounded-full bg-cyan-400 shadow-[0_0_80px_20px_rgba(34,211,238,0.8)]"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="z-10 flex max-w-xl flex-col items-center px-6 text-center"
      >

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-5 text-5xl font-bold tracking-tight text-white md:text-7xl"
          style={{
            textShadow: "0 0 30px rgba(34,211,238,0.9)",
          }}
        >
          Welcome to Ion
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-10 text-lg leading-8 text-gray-300 md:text-xl"
        >
          Your emotional AI companion that listens,
          comforts, evolves, and stays connected with you.
        </motion.p>

        {/* Enter Button */}
        <a href="/sign-in">
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="rounded-full bg-cyan-400 px-10 py-4 text-lg font-semibold text-black shadow-[0_0_40px_rgba(34,211,238,0.9)] transition-all duration-300"
          >
            Enter
          </motion.button>
        </a>

      </motion.div>

      {/* Floating Particles */}
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute bottom-20 left-20 h-4 w-4 rounded-full bg-cyan-300 blur-sm"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute right-20 top-20 h-6 w-6 rounded-full bg-purple-400 blur-sm"
      />

    </main>
  );
}

