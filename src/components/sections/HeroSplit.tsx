import React from 'react';
import NetworkDiffusion from '@/components/visualizations/NetworkDiffusion';

/*
  HeroSplit: левый столбец — заголовок/подзаголовок и CTA, правый — анимация.
  Очистка: убраны градиентные фоны и все border.
*/
export const HeroSplit: React.FC = () => {
  return (
    <section className="relative isolate pt-28 md:pt-32 pb-24 overflow-hidden hero-vignette">
      <div className="hero-bg-gradient" />
      <div className="hero-bg-noise" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid gap-14 lg:gap-8 lg:grid-cols-2 items-center min-h-[60vh]">
          {/* Left: Content */}
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
              <span className="text-xs font-medium tracking-wide text-violet-200">Diffuzio</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-white mb-8">
              Распространение идей <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-300 to-violet-400">внутри сети</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-violet-100/80 leading-relaxed mb-10 max-w-lg">
              От одного инициатора к сотням сотрудников — визуализируйте, как знания диффундируют по вашей организации и усиливают вовлечённость.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="relative group px-8 py-3 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white shadow-[0_0_0_0_rgba(255,255,255,0.15)] hover:shadow-[0_0_0_4px_rgba(255,255,255,0.08)] transition-all">
                Запросить демо
              </button>
              <button className="px-8 py-3 rounded-xl border border-violet-400/30 hover:border-violet-300/60 text-violet-200 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-colors font-medium text-sm">Документация</button>
            </div>
          </div>

          {/* Right: Animation panel */}
          <div className="relative h-[480px] sm:h-[520px] md:h-[560px] lg:h-[640px]">
            <NetworkDiffusion variant='panel' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplit;
