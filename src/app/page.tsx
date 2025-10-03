const unusedVariable = 'hello'
export default function LandingPage() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-800'>
			{/* Секция 1: Главный экран (Hero Section) */}
			<section className='w-full text-center py-20 md:py-32 bg-white'>
				<div className='container mx-auto px-4'>
					<h1 className='text-4xl md:text-6xl font-bold tracking-tight mb-4'>
						Главный заголовок вашего сервиса
					</h1>
					<p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8'>
						Краткое, но емкое описание того, что делает ваш сервис и какую
						проблему решает.
					</p>
					<button className='bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors'>
						Призыв к действию (CTA)
					</button>
				</div>
			</section>

			{/* Секция 2: Преимущества (Features) */}
			<section className='w-full py-16 md:py-24'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl md:text-4xl font-bold mb-12'>
						Ключевые преимущества
					</h2>
					{/* Здесь будут карточки с преимуществами */}
					<p className='text-gray-500'>
						(Здесь будут карточки с иконками и описанием преимуществ)
					</p>
				</div>
			</section>

			{/* Секция 3: Отзывы (Testimonials) */}
			<section className='w-full py-16 md:py-24 bg-white'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl md:text-4xl font-bold mb-12'>
						Что говорят наши клиенты
					</h2>
					{/* Здесь будут карточки с отзывами */}
					<p className='text-gray-500'>
						(Здесь будут карточки с отзывами клиентов)
					</p>
				</div>
			</section>

			{/* Секция 4: Финальный призыв к действию (Final CTA) */}
			<section className='w-full py-16 md:py-24'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl md:text-4xl font-bold mb-6'>
						Готовы начать?
					</h2>
					<p className='text-lg text-gray-600 mb-8'>
						Присоединяйтесь к нам сегодня!
					</p>
					<button className='bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors'>
						Зарегистрироваться
					</button>
				</div>
			</section>

			{/* Подвал (Footer) */}
			<footer className='w-full py-8 border-t'>
				<div className='container mx-auto px-4 text-center text-gray-500'>
					<p>&copy; {new Date().getFullYear()} iMean. Все права защищены.</p>
				</div>
			</footer>
		</main>
	)
}
