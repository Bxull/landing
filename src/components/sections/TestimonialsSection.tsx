export function TestimonialsSection() {
  return (
    <section className='w-full py-16 md:py-24 bg-white'>
      <div className='container mx-auto px-4 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-12'>Что говорят наши клиенты</h2>
        <div className='grid gap-8 md:grid-cols-3 max-w-5xl mx-auto'>
          <div className='p-6 rounded-xl border border-gray-200 bg-white shadow-sm'>
            <p className='text-sm text-gray-600 mb-4'>Инструмент помог ускорить обмен знаниями в компании.</p>
            <p className='text-xs font-semibold text-gray-500'>Анна • HR Lead</p>
          </div>
          <div className='p-6 rounded-xl border border-gray-200 bg-white shadow-sm'>
            <p className='text-sm text-gray-600 mb-4'>Отличная визуализация вовлеченности сотрудников.</p>
            <p className='text-xs font-semibold text-gray-500'>Игорь • CTO</p>
          </div>
          <div className='p-6 rounded-xl border border-gray-200 bg-white shadow-sm'>
            <p className='text-sm text-gray-600 mb-4'>Легкая интеграция и понятный интерфейс.</p>
            <p className='text-xs font-semibold text-gray-500'>Мария • PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}

