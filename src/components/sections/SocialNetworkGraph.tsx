"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2, Linkedin, Twitter, Instagram, Facebook, Send, Repeat2, Bookmark } from "lucide-react";
import { useLocale } from "@/components/LocaleContext";

interface Post {
    id: string;
    platform: "linkedin" | "twitter" | "instagram" | "facebook";
    content: string;
    likes: number;
    comments: number;
    shares: number;
    avatar: string;
    name: string;
    role: string;
    time: string;
    image?: string;
}

export default function DiffuzioScrollPosts() {
    const [scrollY, setScrollY] = useState(0);
    const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
    const containerRef = useRef<HTMLDivElement>(null);
    const { locale, setLocale, t } = useLocale();

    const posts: Post[] = [
        { id: "1", platform: "linkedin", content: "We all know how important it is to come together as a team to shape the future of our work. Today, we held a strategic session with everyone involved — developers, sales, marketing, and founders. It's truly amazing to see how different perspectives merge during brainstorming, sparking new ideas and questions. Our developers presented updated functionality. The innovations are truly impressive — fresh solutions that no one else has yet. I can't reveal all the details, but it's definitely something special. Beyond the product discussion, we outlined our next strategic direction, set ambitious goals, and celebrated our birthday stars — Assem and Saltanat. Moments like these remind us how important it is to combine achievements with team spirit. The takeaway? Success is a shared journey built on creativity, collaboration, and clear goals. I'm excited for what lies ahead and confident that together, we'll achieve great things! Let's keep moving forward and creating! .", likes: 234, comments: 45, shares: 67, avatar: "АП", name: "diffoz.io", role: "", time: "2ч", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
        { id: "2", platform: "twitter", content: "Запустили новую фичу за 2 недели вместо месяца 🔥 Agile работает!", likes: 189, comments: 23, shares: 41, avatar: "ДК", name: "Дмитрий Ковалев", role: "Tech Lead", time: "4ч", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop" },
        { id: "3", platform: "instagram", content: "За кулисами нашего офиса ✨ #officelife #team", likes: 512, comments: 78, shares: 34, avatar: "МС", name: "Мария Смирнова", role: "Lead Designer", time: "1ч", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" },
        { id: "4", platform: "linkedin", content: "Наш продукт вошёл в топ-10 лучших решений года 💪 Спасибо команде!", likes: 678, comments: 134, shares: 201, avatar: "ЕС", name: "Елена Соколова", role: "Product Manager", time: "5ч", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop" },
        { id: "5", platform: "twitter", content: "Employee advocacy — это будущее 🌐 Ваши сотрудники — лучшие амбассадоры бренда", likes: 345, comments: 56, shares: 89, avatar: "ИВ", name: "Игорь Волков", role: "CEO", time: "3ч", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop" },
        { id: "6", platform: "facebook", content: "Сегодня провели воркшоп по личному бренду 🎯 Делимся инсайтами", likes: 423, comments: 67, shares: 112, avatar: "НК", name: "Наталья Кузнецова", role: "HR Director", time: "6ч", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" },
        { id: "7", platform: "instagram", content: "Teambuilding в горах! 🏔️ #teamwork #mountains", likes: 891, comments: 145, shares: 67, avatar: "АР", name: "Андрей Романов", role: "Sales Director", time: "8ч", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
        { id: "8", platform: "linkedin", content: "Инсайты с Web Summit — главный тренд 2025: аутентичность 🎤", likes: 567, comments: 89, shares: 134, avatar: "ОЛ", name: "Ольга Лебедева", role: "CMO", time: "12ч", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop" },
    ];

    const mobilePosts = posts.slice(0, 5);

    const column1Posts = [...posts.slice(0, 3), ...posts.slice(0, 3), ...posts.slice(0, 3)];
    const column2Posts = [...posts.slice(3, 6), ...posts.slice(3, 6), ...posts.slice(3, 6)];
    const column3Posts = [...posts.slice(6, 8), ...posts.slice(6, 8), ...posts.slice(6, 8), ...posts.slice(0, 1)];

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const scrollProgress = -rect.top / (rect.height - window.innerHeight);
                setScrollY(scrollProgress);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + "...";
    };

    const toggleExpanded = (postId: string, idx: number) => {
        const uniqueId = `${postId}-${idx}`;
        setExpandedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(uniqueId)) {
                newSet.delete(uniqueId);
            } else {
                newSet.add(uniqueId);
            }
            return newSet;
        });
    };

    const renderLinkedInCard = (post: Post, idx: number) => {
        const uniqueId = `${post.id}-${idx}`;
        const isExpanded = expandedPosts.has(uniqueId);
        const shouldTruncate = post.content.length > 200;
        const displayContent = shouldTruncate && !isExpanded
            ? truncateText(post.content, 200)
            : post.content;

        return (
            <div className="w-full rounded-xl bg-white text-black shadow-2xl overflow-hidden border border-gray-200 hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300">
                <div className="p-4 flex items-start gap-3">
                    <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg"
                        style={{ backgroundColor: "#0A66C2" }}
                    >
                        {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-base">{post.name}</div>
                        {post.role && <div className="text-sm text-gray-600 leading-tight">{post.role}</div>}
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            {post.time} • <Linkedin className="w-3 h-3" fill="currentColor" />
                        </div>
                    </div>
                </div>
                <div className="px-4 pb-3">
                    <p className="text-base text-gray-900 leading-relaxed">
                        {displayContent}
                        {shouldTruncate && (
                            <button
                                onClick={() => toggleExpanded(post.id, idx)}
                                className="text-blue-600 hover:text-blue-700 font-medium ml-2 transition-colors"
                            >
                                {isExpanded ? `${t("SociallinkedinHide")}` : `${t("SociallinkedinMore")}`}
                            </button>
                        )}
                    </p>
                </div>
                {post.image && (
                    <img src={post.image} alt="Post" className="w-full h-56 object-cover" />
                )}
                <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-600 border-b border-gray-200">
                    <span className="font-medium">{post.likes} {t("SociallinkedinReactions")}</span>
                    <span>{post.comments} {t("SociallinkedinComments")}</span>
                </div>
                <div className="px-4 py-3 flex items-center justify-around">
                    <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <Heart className="w-5 h-5" /> {t("SociallinkedinLike")}
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <MessageCircle className="w-5 h-5" /> {t("SociallinkedinComment")}
                    </button>
                </div>
            </div>
        );
    };

    const renderTwitterCard = (post: Post, idx: number) => {
        const uniqueId = `${post.id}-${idx}`;
        const isExpanded = expandedPosts.has(uniqueId);
        const shouldTruncate = post.content.length > 280;
        const displayContent = shouldTruncate && !isExpanded
            ? truncateText(post.content, 280)
            : post.content;

        return (
            <div className="w-full rounded-2xl bg-white text-black shadow-2xl overflow-hidden border border-gray-200 hover:shadow-blue-400/20 hover:scale-105 transition-all duration-300">
                <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg"
                            style={{ backgroundColor: "#1DA1F2" }}
                        >
                            {post.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-base">{post.name}</span>
                                <span className="text-gray-500 text-sm">• {post.time}</span>
                            </div>
                            {post.role && <div className="text-sm text-gray-600">{post.role}</div>}
                        </div>
                    </div>
                    <p className="text-base text-gray-900 mb-3 leading-relaxed">
                        {displayContent}
                        {shouldTruncate && (
                            <button
                                onClick={() => toggleExpanded(post.id, idx)}
                                className="text-blue-500 hover:text-blue-600 font-medium ml-2 transition-colors"
                            >
                                {isExpanded ? `${t("SocialtwitterShowLess")}` : `${t("SocialtwitterShowMore")}`}
                            </button>
                        )}
                    </p>
                    {post.image && (
                        <img src={post.image} alt="Post" className="w-full h-56 object-cover rounded-2xl border border-gray-200" />
                    )}
                </div>
                <div className="px-4 pb-4 flex items-center justify-between text-gray-600">
                    <button className="flex items-center gap-2 hover:text-pink-600 group transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-pink-100 transition-colors">
                            <Heart className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-600 group transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-blue-100 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-600 group transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-green-100 transition-colors">
                            <Repeat2 className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">{post.shares}</span>
                    </button>
                </div>
            </div>
        );
    };

    const renderInstagramCard = (post: Post, idx: number) => {
        const uniqueId = `${post.id}-${idx}`;
        const isExpanded = expandedPosts.has(uniqueId);
        const shouldTruncate = post.content.length > 125;
        const displayContent = shouldTruncate && !isExpanded
            ? truncateText(post.content, 125)
            : post.content;

        return (
            <div className="w-full rounded-xl bg-white text-black shadow-2xl overflow-hidden border border-gray-200 hover:shadow-pink-500/20 hover:scale-105 transition-all duration-300">
                <div className="p-4 flex items-center gap-3 border-b border-gray-100">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-lg"
                    >
                        {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-base">{post.name.toLowerCase().replace(' ', '_')}</div>
                        {post.role && <div className="text-xs text-gray-500">{post.role}</div>}
                    </div>
                </div>
                {post.image && (
                    <img src={post.image} alt="Post" className="w-full h-72 object-cover" />
                )}
                <div className="p-4">
                    <div className="flex items-center gap-5 mb-3">
                        <Heart className="w-7 h-7 cursor-pointer hover:text-red-500 transition-colors" />
                        <MessageCircle className="w-7 h-7 cursor-pointer hover:text-gray-500 transition-colors" />
                        <Send className="w-7 h-7 cursor-pointer hover:text-gray-500 transition-colors" />
                        <Bookmark className="w-7 h-7 cursor-pointer hover:text-gray-500 transition-colors ml-auto" />
                    </div>
                    <div className="font-bold text-base mb-2">{post.likes.toLocaleString()} {t("SocialinstagramLikes")}</div>
                    <p className="text-base">
                        <span className="font-bold mr-2">{post.name.toLowerCase().replace(' ', '_')}</span>
                        {displayContent}
                        {shouldTruncate && (
                            <button
                                onClick={() => toggleExpanded(post.id, idx)}
                                className="text-gray-500 hover:text-gray-700 font-medium ml-1 transition-colors"
                            >
                                {isExpanded ? `${t("SocialinstagramLess")}` : `${t("SocialinstagramMore")}`}
                            </button>
                        )}
                    </p>
                    <div className="text-gray-500 text-sm mt-2">{t("SocialinstagramViewComments")} ({post.comments})</div>
                    <div className="text-gray-400 text-xs mt-1 uppercase">{post.time} {t("SocialinstagramAgo")}</div>
                </div>
            </div>
        );
    };

    const renderFacebookCard = (post: Post, idx: number) => {
        const uniqueId = `${post.id}-${idx}`;
        const isExpanded = expandedPosts.has(uniqueId);
        const shouldTruncate = post.content.length > 200;
        const displayContent = shouldTruncate && !isExpanded
            ? truncateText(post.content, 200)
            : post.content;

        return (
            <div className="w-full rounded-xl bg-white text-black shadow-2xl overflow-hidden border border-gray-200 hover:shadow-blue-600/20 hover:scale-105 transition-all duration-300">
                <div className="p-4 flex items-start gap-3">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg"
                        style={{ backgroundColor: "#0866FF" }}
                    >
                        {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-base">{post.name}</div>
                        {post.role && <div className="text-sm text-gray-600">{post.role}</div>}
                        <div className="text-xs text-gray-500 mt-1">{post.time} • 🌐</div>
                    </div>
                </div>
                <div className="px-4 pb-3">
                    <p className="text-base text-gray-900 leading-relaxed">
                        {displayContent}
                        {shouldTruncate && (
                            <button
                                onClick={() => toggleExpanded(post.id, idx)}
                                className="text-blue-600 hover:text-blue-700 font-medium ml-2 transition-colors"
                            >
                                {isExpanded ? `${t("SocialfacebookHide")}` : `${t("SocialfacebookMore")}`}
                            </button>
                        )}
                    </p>
                </div>
                {post.image && (
                    <img src={post.image} alt="Post" className="w-full h-56 object-cover" />
                )}
                <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-600 border-y border-gray-200">
                    <span className="font-medium">👍❤️ {post.likes}</span>
                    <span>{post.comments} {t("SocialfacebookComments")}</span>
                </div>
                <div className="px-4 py-3 flex items-center justify-around">
                    <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <Heart className="w-5 h-5" /> {t("SocialfacebookLike")}
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <MessageCircle className="w-5 h-5" /> {t("SocialfacebookComment")}
                    </button>
                </div>
            </div>
        );
    };

    const renderCard = (post: Post, idx: number) => {
        switch (post.platform) {
            case "linkedin": return renderLinkedInCard(post, idx);
            case "twitter": return renderTwitterCard(post, idx);
            case "instagram": return renderInstagramCard(post, idx);
            case "facebook": return renderFacebookCard(post, idx);
            default: return null;
        }
    };

    return (
        <section ref={containerRef} className="relative w-full bg-gradient-to-br from-black via-indigo-950 to-black text-white overflow-hidden">
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 py-20 pb-32">
                <div className="sticky top-20 left-0 right-0 z-20 text-center mb-20 pointer-events-none">
                    <h1 className="text-4xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight px-4">
                        {t("SocialfacebookComment")}
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
                         {t("SocialsectionSubtitle")}
                    </p>
                </div>

                <div className="container mx-auto px-6 pb-20">
                    {/* Мобильная версия - простой список */}
                    <div className="block md:hidden space-y-6 max-w-lg mx-auto">
                        {mobilePosts.map((post, idx) => (
                            <div key={`mobile-${post.id}-${idx}`} className="animate-fade-in">
                                {renderCard(post, idx)}
                            </div>
                        ))}
                    </div>

                    {/* Десктопная версия - 3 колонки с параллаксом */}
                    <div className="hidden md:grid grid-cols-3 gap-8 max-w-7xl mx-auto">
                        <div
                            className="space-y-8"
                            style={{
                                transform: `translateY(${scrollY * 600}px)`,
                                transition: 'transform 0.05s linear'
                            }}
                        >
                            {column1Posts.map((post, idx) => (
                                <div key={`col1-${post.id}-${idx}`} className="animate-fade-in">
                                    {renderCard(post, idx)}
                                </div>
                            ))}
                        </div>

                        <div
                            className="space-y-8"
                            style={{
                                transform: `translateY(${-scrollY * 600}px)`,
                                transition: 'transform 0.05s linear'
                            }}
                        >
                            {column2Posts.map((post, idx) => (
                                <div key={`col2-${post.id}-${idx}`} className="animate-fade-in">
                                    {renderCard(post, idx)}
                                </div>
                            ))}
                        </div>

                        <div
                            className="space-y-8"
                            style={{
                                transform: `translateY(${scrollY * 600}px)`,
                                transition: 'transform 0.05s linear'
                            }}
                        >
                            {column3Posts.map((post, idx) => (
                                <div key={`col3-${post.id}-${idx}`} className="animate-fade-in">
                                    {renderCard(post, idx)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden md:block h-screen"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent pointer-events-none z-20"></div>
        </section>
    );
}