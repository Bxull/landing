export function CTASection() {
  return (
    <section className='w-full py-20 md:py-28'>
      <div className='container mx-auto px-4 text-center max-w-3xl'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6'>Готовы начать?</h2>
        <p className='text-lg text-gray-600 mb-8'>Подключите визуализацию диффузии идей и повысьте вовлеченность команды.</p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button className='bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors'>Запросить демо</button>
          <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold px-8 py-3 rounded-lg border border-gray-300 transition-colors'>Документация</button>
        </div>
      </div>
    </section>
  );
}

