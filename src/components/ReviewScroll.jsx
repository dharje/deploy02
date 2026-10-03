import React from 'react';
import { Star, StarHalf, Quotes } from "@phosphor-icons/react";
import reviewsData from '../data/reviews.json';

// Helper function to render stars based on rating (e.g. 4.5)
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} weight="fill" className="text-yellow-400" size={16} />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<StarHalf key={i} weight="fill" className="text-yellow-400" size={16} />);
    } else {
      stars.push(<Star key={i} weight="regular" className="text-gray-300" size={16} />);
    }
  }
  return stars;
};

export default function ReviewScroll() {
  // Filter for valid reviews with text and good ratings to show in the marquee.
  const validReviews = reviewsData
    .filter(r => r.rating >= 4 && r.description && r.description.en)
    .slice(0, 20); // Keep it to top 20 for performance

  if (validReviews.length === 0) return null;

  // Duplicate for seamless infinite scroll
  const scrollItems = [...validReviews, ...validReviews];

  return (
    <div className="bg-[#fff7e7] py-20 overflow-hidden w-full relative border-t border-brand-gold/20 shadow-[inset_0_10px_20px_-10px_rgba(0,0,0,0.02)]">
      {/* Decorative Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#886200 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center sm:text-left relative z-10">
        <div className="relative inline-block">
          <Quotes weight="fill" className="absolute -top-8 -left-6 sm:-left-10 text-brand-gold/10 w-20 h-20 sm:w-24 sm:h-24 -scale-x-100 pointer-events-none" />
          <h2 className="relative text-3xl font-bold text-brand-gold mb-2 font-serif tracking-wide z-10">Customer Stories</h2>
        </div>
        <p className="text-[#4e423e]/80 font-light text-sm relative z-10">Real reviews, experiences & references for our jewellery.</p>
      </div>
      
      {/* Marquee container using the global animate-ticker class */}
      <div className="relative w-full flex overflow-hidden">
        <div className="animate-ticker group hover:[animation-play-state:paused] flex gap-6 px-3">
          {scrollItems.map((review, i) => (
            <div 
              key={`${review.review_id}-${i}`} 
              className="w-[320px] sm:w-[350px] bg-white rounded-lg p-6 shrink-0 shadow-lg border border-brand-gold/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={review.profile_picture || "https://ui-avatars.com/api/?name=" + encodeURIComponent(review.author)} 
                    alt={review.author} 
                    className="w-10 h-10 rounded-full object-cover bg-gray-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-black font-bold text-[13px]">{review.author}</h4>
                    <p className="text-gray-500 text-[11px]">Customer</p>
                  </div>
                </div>
                
                <div className="flex gap-0.5 mb-3">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-gray-700 text-[13px] leading-relaxed line-clamp-4 text-wrap whitespace-normal">
                  {review.description.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
