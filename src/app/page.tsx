import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'
import { SiteFooter } from '@/components/sections/SiteFooter'
import HeroSplit from '@/components/sections/HeroSplit'

export default function LandingPage() {
	return (
		<main className='relative flex flex-col bg-[#07050b] text-white overflow-hidden'>
			{/* Split Hero: текст слева, анимация справа */}
			<HeroSplit />
			<FeaturesSection />
			<TestimonialsSection />
			<CTASection />
			<SiteFooter />
		</main>
	)
}
