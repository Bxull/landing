export function SiteFooter() {
  return (
    <footer className='w-full py-10 border-t bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40'>
      <div className='container mx-auto px-4 flex flex-col md:flex-row gap-6 md:items-center justify-between text-sm text-gray-500'>
        <p>&copy; {new Date().getFullYear()} Diffuzio. Все права защищены.</p>
        <nav className='flex gap-6'>
          <a href='#' className='hover:text-gray-700 transition-colors'>Конфиденциальность</a>
          <a href='#' className='hover:text-gray-700 transition-colors'>Условия</a>
          <a href='#' className='hover:text-gray-700 transition-colors'>Контакты</a>
        </nav>
      </div>
    </footer>
  );
}

