import { MotionConfig } from 'motion/react';
import { PurchaseConfirmation } from './components/PurchaseConfirmation';
import { HeroSection } from './components/HeroSection';
import { ProductPresentation } from './components/ProductPresentation';
import { IncludedMaterials } from './components/IncludedMaterials';
import { UpsellOfferSection } from './components/UpsellOfferSection';
import { FaqAccordion } from './components/FaqAccordion';
import { DisclaimerFooter } from './components/DisclaimerFooter';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-[#080F1E] text-[#080F1E]">
        <PurchaseConfirmation />

        <main>
          <HeroSection />
          <ProductPresentation />
          <IncludedMaterials />
          <UpsellOfferSection />
          <FaqAccordion />
        </main>

        <DisclaimerFooter />
      </div>
    </MotionConfig>
  );
}
