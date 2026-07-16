import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';

export default function Story() {
  return (
    <div className="bg-[#fffcf6] min-h-screen pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-rust transition-colors mb-8 text-sm font-bold uppercase tracking-wider">
          <ArrowLeft size={16} weight="bold" /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-brand-dark-red uppercase tracking-wide mb-6">
          Our Legacy
        </h1>
        <div className="w-24 h-1 bg-brand-gold mb-10"></div>
        
        <div className="space-y-6 text-text-body/90 leading-relaxed font-light text-lg">
          <p className="font-medium text-xl text-brand-rust">
            Crafting purity and trust since 1978. Dhar Jewellery House has curated timeless traditional gold, contemporary diamonds, and elegant silver jewelry for over four decades.
          </p>
          
          <p>
            What started as a small artisan workshop has blossomed into a trusted name for generations of families who return to us for their most precious celebrations. Every piece we create is a testament to the exquisite craftsmanship of Bengal's finest artisans, blending age-old traditional techniques with contemporary aesthetics.
          </p>

          <p>
            Our commitment to purity is unwavering. From 100% BIS Hallmarked gold to certified diamonds and 925 silver, we ensure that the trust placed in us by our patrons is always honored. We believe that jewelry is not just an ornament, but a legacy passed down through generations—and we are proud to be part of your family's story.
          </p>
          
          <div className="pt-8 mt-8 border-t border-[#e9e3e0]">
            <h3 className="font-serif text-2xl font-bold text-brand-dark-red mb-4">The Promise of Purity</h3>
            <p>
              When you purchase a piece from Dhar Jewellery House, you aren't just buying gold; you are investing in a promise. Our lifetime exchange policy, transparent pricing, and government-approved HUID hallmarking ensure that every purchase is secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
