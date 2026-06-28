import React from 'react';
import { motion } from "framer-motion";
import { UserButton } from "@clerk/clerk-react";

export default function Dashboard({ setPage }) {
    const cards = [
        {
            title: "Create Images with Caption",
            description: "Generate aesthetic AI images with emotional captions and cinematic vibes.",
            glow: "cyan"
        },
        {
            title: "Create Animations with Ion",
            description: "Bring ideas to life with futuristic AI animations and emotional scenes.",
            glow: "purple"
        },
        {
            title: "Quirks & Notifications from Ion",
            description: "Receive emotional updates, reminders, alerts, and futuristic AI notifications.",
            glow: "pink"
        }
    ];
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
            <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
            
            <div className="relative z-10 flex items-center justify-between px-6 py-6">
                <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold tracking-wide"
                    style={{ textShadow: "0 0 20px rgba(34,211,238,0.9)" }}
                >
                    ION
                </motion.h1>
                <div className="scale-125">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>

            <div className="relative z-10 mt-6 flex flex-col items-center">
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        scale: [1, 1.04, 1]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="h-40 w-40 rounded-full bg-cyan-400 shadow-[0_0_100px_20px_rgba(34,211,238,0.9)]"
                />
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-2xl font-semibold text-cyan-200"
                >
                    Ion feels curious today.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-3 max-w-md text-center text-gray-400"
                >
                    Your futuristic emotional AI companion is online and ready.
                </motion.p>
            </div>

            <div className="relative z-10 mt-16 grid gap-8 px-6 pb-20 md:grid-cols-3">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.04, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                        style={{
                            boxShadow: card.glow === "cyan" ? "0 0 30px rgba(34,211,238,0.2)" : card.glow === "purple" ? "0 0 30px rgba(168,85,247,0.2)" : "0 0 30px rgba(236,72,153,0.2)"
                        }}
                    >
                        <div className={`mb-5 h-3 w-3 rounded-full ${card.glow === "cyan" ? "bg-cyan-400" : card.glow === "purple" ? "bg-purple-400" : "bg-pink-400"}`} />
                        <h3 className="text-2xl font-bold leading-tight">{card.title}</h3>
                        <p className="mt-4 leading-7 text-gray-400">{card.description}</p>
                        <button
                            onClick={() => card.title === "Quirks & Notifications from Ion" ? setPage("ionchat") : null}
                            className="mt-8 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
                        >
                            Open
                        </button>
                    </motion.div>
                ))}
            </div>

            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-20 left-10 h-5 w-5 rounded-full bg-cyan-300 blur-sm"
            />
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute right-10 top-40 h-6 w-6 rounded-full bg-purple-400 blur-sm"
            />
        </main>
    );
}
