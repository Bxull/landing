"use client";

import { motion, Variants } from "framer-motion";

interface CodeBlockProps {
    title: string;
    jsonContent: object;
    animationDelay?: number;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ title, jsonContent, animationDelay = 0 }) => {
    const codeString = JSON.stringify(jsonContent, null, 2);

    const highlightedCode = codeString
        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)/g, (match) => {
            if (/:$/.test(match)) {
                return `<span class="text-cyan-400">${match.slice(0, -1)}</span>:`;
            }
            return `<span class="text-fuchsia-400">${match}</span>`;
        })
        .replace(/(\[|\]|\{|\}|\,)/g, '<span class="text-white/50">$1</span>');

    const textChars = Array.from(highlightedCode.replace(/<[^>]*>/g, ''));

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut",
                delay: animationDelay
            },
        },
    };

    const codeContainerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.008, 
                delayChildren: animationDelay + 0.5,
            },
        },
    };


    return (
        <motion.div variants={containerVariants}>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white/95 mb-6 text-center lg:text-left">
                {title}
            </h2>
            <div className="rounded-2xl bg-black/20 border border-purple-500/30 backdrop-blur-md shadow-2xl shadow-purple-900/20 overflow-hidden">
                <div className="bg-gray-900/50 h-10 flex items-center px-4 gap-2 border-b border-purple-500/20">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>

                <motion.pre
                    className="p-6 text-sm md:text-base whitespace-pre-wrap"
                    variants={codeContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <code className="font-mono leading-relaxed">
                        <motion.span
                            dangerouslySetInnerHTML={{ __html: highlightedCode }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: animationDelay + 0.4, duration: 1.5 }}
                        />
                    </code>
                </motion.pre>
            </div>
        </motion.div>
    );
};


export const CodeExampleSection = () => {
    const inputData = {
        "author_id": "person_04",
        "social_network": "linkedin",
        "topic": "Мои первые шаги как руководителя",
        "sample_posts": [
            "Текст поста автора...",
            "Ещё один текст..."
        ]
    };

    const outputData = {
        "generated_post": "Новый текст в стиле автора..."
    };

    return (
        <section className="relative bg-black text-white py-24 sm:py-32 px-6 overflow-hidden">
            <div
                className="absolute -top-20 -right-40 w-[50vw] h-[80vh] bg-gradient-to-bl from-violet-900/80 via-fuchsia-900/30 to-transparent rounded-full blur-3xl opacity-25 rotate-45"
                aria-hidden="true"
            />

            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <CodeBlock
                    title="Пример входных данных"
                    jsonContent={inputData}
                />
                <CodeBlock
                    title="Пример результата"
                    jsonContent={outputData}
                    animationDelay={0.3} 
                />
            </motion.div>
        </section>
    );
};