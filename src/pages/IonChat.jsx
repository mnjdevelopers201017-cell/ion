import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export default function IonChat({ setPage }) {
    const [messages, setMessages] = useState([
        {
            sender: "ion",
            text: "Hey... I'm Ion. How are you feeling today?"
        }
    ]);
    const [input, setInput] = useState("");
    const [emotion, setEmotion] = useState("neutral");
    const [blink, setBlink] = useState(false);

    // BLINK SYSTEM
    useEffect(() => {
        const blinkLoop = setInterval(() => {
            setBlink(true);
            setTimeout(() => {
                setBlink(false);
            }, 140);
        }, 3500);
        return () => clearInterval(blinkLoop);
    }, []);

    // SEND MESSAGE
    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = {
            sender: "user",
            text: input
        };
        setMessages((prev) => [
            ...prev,
            userMessage
        ]);
        const currentInput = input;
        setInput("");
        try {
            const { chat } = await import('../api/chat.js');
            const data = await chat(currentInput);
            const emotionMatch = data.reply.match(/\*(.*?)\*/);
            let detectedEmotion = "neutral";
            if (emotionMatch) {
                detectedEmotion = emotionMatch[1].toLowerCase();
            }
            setEmotion(detectedEmotion);
            const cleanedReply = data.reply.replace(/\*.*?\*/g, "").trim();
            const ionReply = {
                sender: "ion",
                text: cleanedReply
            };
            setMessages((prev) => [
                ...prev,
                ionReply
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "ion",
                    text: "Ion lost connection to its thoughts..."
                }
            ]);
        }
    };

    // COLORS
    const auraColor = emotion === "happy" ? "#22c55e" : emotion === "sad" ? "#3b82f6" : emotion === "angry" ? "#ef4444" : emotion === "suspicious" ? "#f59e0b" : "#22d3ee";

    return (
        <main className="relative flex h-screen flex-col overflow-hidden bg-[#030712] text-white">
            <motion.div
                animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.12, 1],
                    backgroundColor: auraColor
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity
                }}
                className="absolute left-1/2 top-24 h-[400px] w-[400px] -translate-x-1/2 rounded-full blur-3xl"
            />

            <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-5 backdrop-blur-xl">
                <button 
                    onClick={() => setPage('dashboard')}
                    className="text-cyan-300 transition hover:text-cyan-100"
                >
                    ← Back
                </button>
                <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,1)]" />
                    <p className="text-sm text-gray-300">Ion is online</p>
                </div>
            </div>

            <div className="relative z-10 mt-14 flex flex-col items-center justify-center">
                <motion.div
                    animate={{
                        rotate: 360,
                        borderColor: auraColor
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute h-72 w-72 rounded-full border opacity-10"
                />
                <motion.div
                    animate={{
                        rotate: -360,
                        borderColor: auraColor
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute h-56 w-56 rounded-full border opacity-10"
                />
                <motion.div
                    animate={{
                        boxShadow: [
                            `0 0 40px ${auraColor}`,
                            `0 0 90px ${auraColor}`,
                            `0 0 40px ${auraColor}`
                        ]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity
                    }}
                    className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/10 backdrop-blur-2xl"
                    style={{
                        background: `radial-gradient(circle, ${auraColor}55 0%, #000000 75%)`
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={emotion}
                            initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.08, filter: "blur(6px)" }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="mb-3 flex gap-10">
                                <motion.div
                                    animate={{
                                        rotate: emotion === "angry" ? 20 : emotion === "sad" ? -18 : emotion === "happy" ? -8 : emotion === "suspicious" ? -12 : -6,
                                        y: emotion === "sad" ? 5 : emotion === "suspicious" ? -5 : 0
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="h-5 w-10 rounded-t-full border-t-[4px] border-white/90"
                                />
                                <motion.div
                                    animate={{
                                        rotate: emotion === "angry" ? -20 : emotion === "sad" ? 18 : emotion === "happy" ? 8 : emotion === "suspicious" ? 22 : 6,
                                        y: emotion === "sad" ? 5 : emotion === "suspicious" ? -12 : 0
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="h-5 w-10 rounded-t-full border-t-[4px] border-white/90"
                                />
                            </div>
                            <div className="mb-7 flex gap-12">
                                <motion.div
                                    animate={{
                                        scaleY: blink ? 0.1 : 1,
                                        height: emotion === "suspicious" ? blink ? "2px" : "12px" : blink ? "2px" : "16px"
                                    }}
                                    transition={{ duration: 0.12 }}
                                    className={`rounded-full bg-white ${emotion === "angry" ? "w-5 rotate-12" : emotion === "suspicious" ? "w-5 rotate-[8deg]" : emotion === "sad" ? "w-4 rotate-[-6deg]" : emotion === "happy" ? "w-5" : "w-4"}`}
                                />
                                <motion.div
                                    animate={{
                                        scaleY: blink ? 0.1 : 1,
                                        height: emotion === "suspicious" ? blink ? "2px" : "22px" : blink ? "2px" : "16px"
                                    }}
                                    transition={{ duration: 0.12 }}
                                    className={`rounded-full bg-white ${emotion === "angry" ? "w-5 -rotate-12" : emotion === "suspicious" ? "w-5" : emotion === "sad" ? "w-4 rotate-[6deg]" : emotion === "happy" ? "w-5" : "w-4"}`}
                                />
                            </div>
                            {emotion === "happy" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0, scaleX: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="h-5 w-16 rounded-b-full border-b-4 border-white"
                                />
                            )}
                            {emotion === "sad" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 h-5 w-16 rounded-t-full border-t-4 border-white opacity-80"
                                />
                            )}
                            {emotion === "angry" && (
                                <motion.div
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    animate={{ opacity: 1, scaleX: 1 }}
                                    className="h-[4px] w-14 rounded-full bg-red-400"
                                />
                            )}
                            {emotion === "suspicious" && (
                                <motion.div
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-[4px] w-12 rounded-full bg-amber-300 rotate-[-4deg]"
                                />
                            )}
                            {emotion === "neutral" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-[3px] w-12 rounded-full bg-white/80"
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: [0.5, 1, 0.5], y: 0, color: auraColor }}
                    transition={{ duration: 1 }}
                    className="mt-8 text-sm uppercase tracking-[0.4em]"
                >
                    {emotion}
                </motion.p>
            </div>

            <div className="relative z-10 mt-10 h-[220px] space-y-4 overflow-y-auto px-6 pb-40">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-[80%] rounded-3xl px-5 py-4 transition-all duration-500 ${
                            msg.sender === "user"
                                ? "ml-auto bg-cyan-400 text-black"
                                : "bg-white/10 text-white backdrop-blur-xl"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-24 left-0 right-0 z-20 px-4">
                <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-black/50 p-4 backdrop-blur-2xl">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Message Ion..."
                        className="flex-1 rounded-full border border-cyan-400/20 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-gray-400"
                    />
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={sendMessage}
                        className="rounded-full bg-cyan-400 px-6 py-4 font-semibold text-black shadow-[0_0_25px_rgba(34,211,238,0.8)]"
                    >
                        Send
                    </motion.button>
                </div>
            </div>
        </main>
    );
}
