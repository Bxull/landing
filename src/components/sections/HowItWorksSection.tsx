"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface Node {
    id: string;
    x: number;
    y: number;
    radius: number;
    type: "brand" | "employee" | "post";
}

interface Link {
    source: string;
    target: string;
}

export function HowItWorksSection() {
    const steps = [
        {
            title: "создаём штаб амбассадоров",
            description:
                "сотрудники подключаются к платформе — начинается внутренняя сеть бренда",
        },
        {
            title: "бренд публикует идеи и посты",
            description:
                "контент формируется и адаптируется под стиль и голоса участников",
        },
        {
            title: "сотрудники делятся ими",
            description:
                "социальные сети заполняются подлинными сообщениями, энергия бренда растёт",
        },
    ];

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [nodes] = useState<Node[]>(() => {
        // Создаём статичный граф: 1 центральный бренд + 8 сотрудников + 12 постов
        const brandNode: Node = {
            id: "brand",
            x: 0,
            y: 0,
            radius: 25,
            type: "brand",
        };

        const employeeNodes: Node[] = Array.from({ length: 8 }).map((_, i) => ({
            id: `employee-${i}`,
            x: Math.cos((i / 8) * Math.PI * 2) * 150,
            y: Math.sin((i / 8) * Math.PI * 2) * 150,
            radius: 12,
            type: "employee" as const,
        }));

        const postNodes: Node[] = Array.from({ length: 12 }).map((_, i) => ({
            id: `post-${i}`,
            x: Math.cos((i / 12) * Math.PI * 2) * 280,
            y: Math.sin((i / 12) * Math.PI * 2) * 280,
            radius: 6,
            type: "post" as const,
        }));

        return [brandNode, ...employeeNodes, ...postNodes];
    });

    const [links] = useState<Link[]>(() => {
        const employeeNodes = nodes.filter(n => n.type === "employee");
        const postNodes = nodes.filter(n => n.type === "post");

        // Связи: бренд -> сотрудники -> посты
        const brandLinks: Link[] = employeeNodes.map((n) => ({
            source: "brand",
            target: n.id,
        }));

        const postLinks: Link[] = postNodes.map((n, i) => ({
            source: employeeNodes[i % employeeNodes.length].id,
            target: n.id,
        }));

        return [...brandLinks, ...postLinks];
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateSize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        const draw = () => {
            const centerX = canvas.width / window.devicePixelRatio / 2;
            const centerY = canvas.height / window.devicePixelRatio / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Рисуем связи
            links.forEach((link) => {
                const source = nodes.find((n) => n.id === link.source);
                const target = nodes.find((n) => n.id === link.target);
                if (source && target) {
                    ctx.beginPath();
                    ctx.moveTo(source.x + centerX, source.y + centerY);
                    ctx.lineTo(target.x + centerX, target.y + centerY);
                    ctx.strokeStyle = "rgba(168, 85, 247, 0.2)";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });

            // Рисуем узлы
            nodes.forEach((node) => {
                ctx.beginPath();
                ctx.arc(node.x + centerX, node.y + centerY, node.radius, 0, Math.PI * 2);

                if (node.type === "brand") {
                    const gradient = ctx.createRadialGradient(
                        node.x + centerX,
                        node.y + centerY,
                        0,
                        node.x + centerX,
                        node.y + centerY,
                        node.radius
                    );
                    gradient.addColorStop(0, "rgba(168, 85, 247, 1)");
                    gradient.addColorStop(1, "rgba(236, 72, 153, 0.8)");
                    ctx.fillStyle = gradient;
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = "rgba(168, 85, 247, 0.8)";
                } else if (node.type === "employee") {
                    ctx.fillStyle = "rgba(96, 165, 250, 0.9)";
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = "rgba(96, 165, 250, 0.5)";
                } else {
                    ctx.fillStyle = "rgba(251, 191, 36, 0.8)";
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = "rgba(251, 191, 36, 0.3)";
                }

                ctx.fill();
                ctx.shadowBlur = 0;
            });
        };

        draw();

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, [nodes, links]);

    return (
        <section className="relative py-40 bg-gradient-to-b from-black via-violet-950/30 to-black overflow-hidden">
            {/* Force Graph Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
            />

            {/* центральная подсветка */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(150,60,255,0.15),transparent_70%)]" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white mb-28"
                >
                    как мы работаем
                </motion.h2>

                <div className="relative flex flex-col md:flex-row md:justify-between items-center gap-20 md:gap-16">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="relative flex-1 max-w-sm"
                        >
                            <motion.div
                                className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-fuchsia-500/20 to-transparent blur-2xl"
                                animate={{
                                    opacity: [0.3, 0.6, 0.2],
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    delay: index * 1.2,
                                }}
                            />

                            <div className="relative bg-black/70 backdrop-blur-xl border border-white/10 rounded-[2rem] px-10 py-14 text-center">
                                <motion.div
                                    className="mb-6 text-[clamp(2rem,3vw,2.75rem)] font-black text-white/80 relative"
                                    animate={{
                                        textShadow: [
                                            "0 0 10px rgba(180,70,255,0.6)",
                                            "0 0 25px rgba(180,70,255,0.3)",
                                            "0 0 10px rgba(180,70,255,0.6)",
                                        ],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    0{index + 1}
                                </motion.div>
                                <h3 className="text-2xl font-semibold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-white/60 text-lg leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* соединительные линии */}
                            {index < steps.length - 1 && (
                                <motion.div
                                    className="hidden md:block absolute top-1/2 right-[-10%] w-[25%] h-[3px] bg-gradient-to-r from-violet-500/60 to-transparent rounded-full"
                                    animate={{
                                        opacity: [0.4, 0.8, 0.4],
                                        width: ["20%", "25%", "20%"],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.5,
                                    }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-32 text-center text-2xl md:text-3xl text-white/70"
                >
                    всё просто: бренд говорит — команда усиливает — сеть слышит.
                </motion.p>
            </div>

        </section>
    );
}