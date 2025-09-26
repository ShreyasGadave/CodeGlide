import React from 'react'
import HeroSection from '../Components/Home/HeroSection'
import PrepSimplifier from '../Components/Home/PrepSimplifier'
import CTASection from '@/Components/Rocket/CTASection'
import FeaturesOverview from '@/Components/Icon/FeaturesOverview'
import ValueProposition from '@/Components/Icon/ValueProposition'



function LandingPage() {
    return (
        <div className='  w-full overflow-x-hidden'>
            <HeroSection />
            {/* <PrepSimplifier /> */}
         <FeaturesOverview/>
         <ValueProposition/>
           <CTASection/>
            {/* <CodingPortfolio /> */}
            {/* <FAQ />      */}
        </div>
    )
}

export default LandingPage
