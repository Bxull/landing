"use client"

import { FeaturesSection } from '@/components/sections/FeaturesSection'
import HeroSplit from '@/components/sections/HeroSplit'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import SocialTicker from '@/components/sections/MediaScroll'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import SocialNetworkGraph from '@/components/sections/SocialNetworkGraph'
import CTASection from '@/components/sections/CTASection'
import Footer from '@/components/sections/SiteFooter'

export default function LandingPage() {
	return (
		<main className='relative flex flex-col bg-[#07050b] text-white overflow-hidden'>
			{/* Split Hero: текст слева, анимация справа */}
			<HeroSplit />
			<FeaturesSection />
			<SocialTicker />
			<TestimonialsSection />
			<HowItWorksSection />
			<SocialNetworkGraph />
			<CTASection />
			<Footer />
		</main>
	)
}
