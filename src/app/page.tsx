"use client"

import { useRef } from 'react'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import HeroSplit from '@/components/sections/HeroSplit'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import SocialTicker from '@/components/sections/MediaScroll'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import SocialNetworkGraph from '@/components/sections/SocialNetworkGraph'
import CTASection from '@/components/sections/CTASection'
import Footer from '@/components/sections/SiteFooter'

export default function LandingPage() {
	const homeRef = useRef<HTMLDivElement>(null)
	const featuresRef = useRef<HTMLDivElement>(null)
	const socialRef = useRef<HTMLDivElement>(null)
	const testimonialsRef = useRef<HTMLDivElement>(null)
	const howItWorksRef = useRef<HTMLDivElement>(null)
	const networkRef = useRef<HTMLDivElement>(null)
	const contactRef = useRef<HTMLDivElement>(null)

	const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
		if (ref.current) {
			ref.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<main className='relative flex flex-col bg-[#07050b] text-white overflow-hidden'>
			<div id="home" ref={homeRef}>
				<HeroSplit />
			</div>
			<div id="features" ref={featuresRef}>
				<FeaturesSection />
			</div>
			<div id="social" ref={socialRef}>
				<SocialTicker />
			</div>
			<div id="contact" ref={testimonialsRef}>
				<TestimonialsSection />
			</div>
			<div id="how" ref={howItWorksRef}>
				<HowItWorksSection />
			</div>
			<div id="team" ref={networkRef}>
				<SocialNetworkGraph />
			</div>
			<div id="contact" ref={contactRef}>
				<CTASection />
			</div>
			<Footer scrollToSection={scrollToSection} refs={{
				home: homeRef,
				features: featuresRef,
				social: socialRef,
				testimonials: testimonialsRef,
				howItWorks: howItWorksRef,
				network: networkRef,
				contact: contactRef
			}} />
		</main>
	)
}
