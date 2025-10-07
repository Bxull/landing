export function FeaturesSection() {
  return (
    <section className='w-full py-16 md:py-24'>
      <div className='container mx-auto px-4 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-12'>Ключевые преимущества</h2>
        <div className='grid gap-8 md:grid-cols-3 max-w-5xl mx-auto'>
          <div className='p-6 rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm'>
            <h3 className='font-semibold text-lg mb-2'>Масштабируемость</h3>
            <p className='text-sm text-gray-400'>Инфраструктура готова к росту без переработок.</p>
          </div>
          <div className='p-6 rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm'>
            <h3 className='font-semibold text-lg mb-2'>Интерактивность</h3>
            <p className='text-sm text-gray-400'>Визуальная диффузия помогает вовлечению сотрудников.</p>
          </div>
          <div className='p-6 rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm'>
            <h3 className='font-semibold text-lg mb-2'>Простая интеграция</h3>
            <p className='text-sm text-gray-400'>Легко встраивается в существующие процессы.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

