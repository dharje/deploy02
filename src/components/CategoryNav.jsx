import { useRef, useState, useEffect } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export default function CategoryNav() {
  const scrollContainerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (name) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredCategory(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 150);
  };

  // Expanded categories array matching the requested look and feel
  const categories = [
    // { 
    //   name: 'DIAMOND', 
    //   svg: (
    //     <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    //       <path d="M4.5 8.5L12 3l7.5 5.5L12 21 4.5 8.5z" stroke="#333" fill="rgba(173,216,230,0.4)" strokeLinejoin="round"/>
    //       <path d="M4.5 8.5h15M12 3v18" stroke="#333" strokeOpacity="0.5"/>
    //       <path d="M8 8.5l4-5.5 4 5.5-4 12-4-12z" stroke="#333" strokeOpacity="0.5"/>
    //     </svg>
    //   )
    // },
    { 
      name: 'NECKLACES', 
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4c-5 4-7 8-7 11 0 4 3.5 6 7 6s7-2 7-6c0-3-2-7-7-11z" fill="rgba(255,215,0,0.8)" stroke="#886200"/>
          <path d="M7 10L5 4h14l-2 6" stroke="#886200"/>
        </svg>
      )
    },
    { 
      name: 'RINGS', 
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="15" r="5" stroke="#886200" fill="transparent"/>
          <path d="M12 10l-2.5-3 2.5-3 2.5 3L12 10z" fill="#ffd700" stroke="#886200"/>
        </svg>
      )
    },
    { 
      name: 'EARRINGS', 
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4c-.6 0-1 .4-1 1v4h2V5c0-.6-.4-1-1-1z" fill="#886200"/>
          <path d="M7 10h10c.6 0 1 .4 1 1v6c0 2.2-1.8 4-4 4H10c-2.2 0-4-1.8-4-4v-6c0-.6.4-1 1-1z" fill="rgba(255,215,0,0.8)" stroke="#886200"/>
          <circle cx="12" cy="16" r="2" fill="#fff"/>
        </svg>
      )
    },
    { 
      name: 'BANGLES &\nBRACELETS', 
      svg: (
        <svg className="w-7 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="8" stroke="#886200" fill="transparent" strokeWidth="2.5" strokeDasharray="2 1"/>
          <circle cx="12" cy="12" r="6" stroke="#ffd700" strokeWidth="1"/>
        </svg>
      )
    },
    // { 
    //   name: 'PENDANTS', 
    //   svg: (
    //     <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    //       <circle cx="12" cy="14" r="5" fill="rgba(255,215,0,0.8)" stroke="#886200"/>
    //       <path d="M12 9V3M10 6h4" stroke="#886200"/>
    //       <circle cx="12" cy="14" r="2" fill="#d00"/>
    //     </svg>
    //   )
    // },
    // { 
    //   name: 'JEWELLERY\nSETS', 
    //   svg: (
    //     <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    //       <path d="M12 4c-4 3-5 6-5 9 0 3 2.5 4 5 4s5-1 5-4c0-3-1-6-5-9z" fill="rgba(255,215,0,0.8)" stroke="#886200"/>
    //       <path d="M8 20l-2 3M16 20l2 3M12 17v4M12 21h0" stroke="#886200" strokeWidth="2" strokeLinecap="round"/>
    //     </svg>
    //   )
    // },
    { 
      // name: 'CHAINS &\nACCESSORIES',
      name: 'CHAINS', 
      svg: (
        <svg className="w-5 h-5 sm:w-10 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 3v8c0 4 3 6 6 6s6-2 6-6V3" stroke="#886200" fill="none" strokeWidth="1.5"/>
          <circle cx="12" cy="19" r="2" fill="#ffd700" stroke="#886200"/>
        </svg>
      )
    },
    { 
      name: 'MANGALSUTRA', 
      svg: (
        <svg className="w-7 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 3v8c0 4 3 7 7 7s7-3 7-7V3" stroke="#333" strokeDasharray="1 2" strokeWidth="2"/>
          <path d="M10 18a2 2 0 104 0 2 2 0 10-4 0" fill="#ffd700" stroke="#886200"/>
        </svg>
      )
    },
    { 
      name: 'COINS', 
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="8" fill="#ffd700" stroke="#886200"/>
          <text x="12" y="15" textAnchor="middle" fill="#886200" fontSize="8" fontWeight="bold">₹</text>
        </svg>
      )
    },
    { 
      name: 'GIFTS', 
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 4v7c0 3.5 2.5 5 6 5s6-1.5 6-5V4" stroke="#888" strokeWidth="1.5"/>
          <circle cx="12" cy="18" r="2" fill="#ddd" stroke="#888"/>
        </svg>
      )
    },
    { 
      name: 'GEMSTONE', 
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="8" fill="rgba(255,255,255,0.8)" stroke="#886200"/>
          <circle cx="12" cy="12" r="3" fill="#800080"/>
          <circle cx="8" cy="12" r="2" fill="#0000ff"/>
          <circle cx="16" cy="12" r="2" fill="#008000"/>
          <circle cx="12" cy="8" r="2" fill="#ff0000"/>
          <circle cx="12" cy="16" r="2" fill="#ffa500"/>
        </svg>
      )
    }
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scrollByAmount = (amount) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#fffdfa] border-b border-[#e9e3e0] relative shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative flex items-center">
        
        {/* Left Arrow */}
        {showLeftArrow && (
          <button 
            onClick={() => scrollByAmount(-200)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-[#fffdfa] to-transparent w-10 sm:w-16 h-full flex items-center justify-start pl-2 text-brand-gold hover:text-brand-red transition-colors"
          >
            <div className="bg-white rounded-full shadow-md p-1 border border-[#e9e3e0]">
              <CaretLeft size={16} weight="bold" />
            </div>
          </button>
        )}

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex flex-nowrap items-center w-full overflow-x-auto scrollbar-none scroll-smooth"
        >
          {categories.map((cat, idx) => {
            const isExcluded = ['COINS', 'GIFTS'].includes(cat.name);

            return (
              <div 
                key={idx} 
                className="relative group flex-shrink-0 w-1/5 sm:w-auto sm:min-w-[140px] border-r border-[#f0ebe1] last:border-r-0"
                onMouseEnter={() => !isExcluded && handleMouseEnter(cat.name)}
                onMouseLeave={() => !isExcluded && handleMouseLeave()}
              >
                <Link 
                  to={`/collection/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 w-full h-full px-1 sm:px-4 py-2"
                >
                  <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {cat.svg}
                  </div>
                  <span className="text-[9px] sm:text-[11px] font-semibold text-text-body uppercase tracking-wider text-center sm:text-left whitespace-pre-line leading-tight group-hover:text-brand-red transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button 
            onClick={() => scrollByAmount(200)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-[#fffdfa] to-transparent w-10 sm:w-16 h-full flex items-center justify-end pr-2 text-brand-gold hover:text-brand-red transition-colors"
          >
            <div className="bg-white rounded-full shadow-md p-1 border border-[#e9e3e0]">
              <CaretRight size={16} weight="bold" />
            </div>
          </button>
        )}

      </div>

      {/* Mega Menus (Rendered outside the scroll container to avoid clipping) */}
      {categories.map((cat, idx) => {
        const isExcluded = ['COINS', 'GIFTS', 'GEMSTONE'].includes(cat.name);
        if (isExcluded) return null;

        const cleanName = cat.name.replace('\n', ' ');
        let singularName = cleanName;
        if (cleanName === 'BANGLES & BRACELETS') singularName = 'Bangle & Bracelet';
        else if (cleanName === 'EARRINGS') singularName = 'Earring';
        else if (cleanName === 'NECKLACES') singularName = 'Necklace';
        else if (cleanName === 'RINGS') singularName = 'Ring';
        else if (cleanName === 'CHAINS') singularName = 'Chain';
        
        const titleCaseName = singularName.charAt(0).toUpperCase() + singularName.slice(1).toLowerCase();

        const hasMensOptions = !['NECKLACES', 'EARRINGS', 'MANGALSUTRA'].includes(cleanName);
        const baseSlug = singularName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const mensTitleCaseName = cleanName === 'BANGLES & BRACELETS' ? 'Bracelet' : titleCaseName;
        const womensTitleCaseName = cleanName === 'BANGLES & BRACELETS' ? 'Bangle & Bracelet' : titleCaseName;

        return (
          <div 
            key={`dropdown-${idx}`}
            className={`absolute top-full left-0 w-full z-50 flex justify-center pt-1 transition-all duration-300 ${
              hoveredCategory === cat.name ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
            }`}
            onMouseEnter={() => handleMouseEnter(cat.name)}
            onMouseLeave={() => handleMouseLeave()}
          >
            {/* Invisible bridge to prevent losing hover between nav and dropdown */}
            <div className="absolute top-0 w-full h-4 bg-transparent -translate-y-full"></div>
            
            <div className="bg-white border border-[#e9e3e0] shadow-xl rounded-xl p-3 flex gap-4 max-w-4xl flex-wrap justify-center mt-1">
              {hasMensOptions && (
                <Link to={`/collection/gold-${baseSlug}-men`} className="text-xs px-6 py-2.5 bg-[#fffdfa] border border-[#f0ebe1] hover:border-brand-gold hover:bg-[#fffcf6] hover:text-brand-red rounded-lg transition-all font-medium text-text-body">Gold {mensTitleCaseName} for Men</Link>
              )}
              <Link to={`/collection/gold-${baseSlug}-women`} className="text-xs px-6 py-2.5 bg-[#fffdfa] border border-[#f0ebe1] hover:border-brand-gold hover:bg-[#fffcf6] hover:text-brand-red rounded-lg transition-all font-medium text-text-body">Gold {womensTitleCaseName} for Women</Link>
              
              {hasMensOptions && (
                <Link to={`/collection/silver-${baseSlug}-men`} className="text-xs px-6 py-2.5 bg-[#fffdfa] border border-[#f0ebe1] hover:border-brand-gold hover:bg-[#fffcf6] hover:text-brand-red rounded-lg transition-all font-medium text-text-body">Silver {mensTitleCaseName} for Men</Link>
              )}
              <Link to={`/collection/silver-${baseSlug}-women`} className="text-xs px-6 py-2.5 bg-[#fffdfa] border border-[#f0ebe1] hover:border-brand-gold hover:bg-[#fffcf6] hover:text-brand-red rounded-lg transition-all font-medium text-text-body">Silver {womensTitleCaseName} for Women</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
