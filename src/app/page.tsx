import NetworkDiffusion from '@/components/visualizations/NetworkDiffusion'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'
import { SiteFooter } from '@/components/sections/SiteFooter'

export default function LandingPage() {
	return (
		<main className='flex min-h-screen flex-col bg-gray-50 text-gray-800'>
			{/* Hero */}
			<NetworkDiffusion />
			{/* Features */}
			<FeaturesSection />
			{/* Testimonials */}
			<TestimonialsSection />
			{/* CTA */}
			<CTASection />
			{/* Footer */}
			<SiteFooter />
		</main>
	)
}
