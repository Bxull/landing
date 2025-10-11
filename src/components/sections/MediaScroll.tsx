"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SocialTicker() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -1000]);

    const socials = [
        "Instagram",
        "LinkedIn",
        "Facebook",
        "Threads",
        "TikTok",
        "X"
    ];

    return (
        <section ref={ref} className="py-20 overflow-hidden">
            <motion.div
                style={{ x }}
                className="flex gap-12 whitespace-nowrap"
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-12 items-center">
                        {socials.map((social, index) => (
                            <span
                                key={`${social}-${i}`}
                                className="text-8xl font-bold text-white opacity-50"
                                style={{
                                    transform: `translateY(${(index % socials.length) * 20 - 50}px)`,
                                    marginTop: `${(index % 3) * 15}px`,
                                    marginBottom: `${(index % 2) * 20}px`
                                }}
                            >
                                {social}
                            </span>
                        ))}
                    </div>
                ))}
            </motion.div>
        </section>
    );
}