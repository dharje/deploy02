import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { 
  Sparkle, 
  ShieldCheck, 
  Truck, 
  ArrowsLeftRight, 
  Coins, 
  Calculator, 
  ArrowRight,
  CaretLeft,
  CaretRight,
  WhatsappLogo
} from '@phosphor-icons/react';
import { getLiveRates } from '../data/liveRates';

export default function Home() {
  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      // title: 'A Legacy of Purity & Timeless Artistry',
      // subtitle: 'Crafting royal gold chokers, certified diamond bangles, and heirloom antique jewelry for generations.',
      image: '/images/banners/DHAR_BANNER_01.jpg.jpeg',
      mobileImage: '/images/banners/mobile_01.png',
      cta1: 'Explore Collections',
      cta1Link: '#collections',
      cta2: 'WhatsApp Inquiry',
      cta2Link: 'https://wa.me/919836818376'
    },
    {
      // title: 'Dazzling Diamond Masterpieces',
      // subtitle: 'Celebrate your infinite love with SGL & GIA certified high-brilliance diamond creations in VVS-GH quality.',
      image: '/images/banners/DHAR_BANNER_02.jpg.jpeg',
      mobileImage: '/images/banners/mobile_02.png',
      gradientBg: 'from-[#720000] via-[#500000] to-[#250000]',
      cta1: 'Explore Collections',
      cta1Link: '#collections',
      cta2: 'WhatsApp Inquiry',
      cta2Link: 'https://wa.me/9198368 18376'
    },
    {
      image: '/images/banners/DHAR_BANNER_03.jpg.jpeg',
      mobileImage: '/images/banners/mobile_03.png',
      cta1: 'Explore Collections',
      cta1Link: '#collections',
      cta2: 'WhatsApp Inquiry',
      cta2Link: 'https://wa.me/919836818376'
    },
    {
      image: '/images/banners/DHAR_BANNER_04.jpg.jpeg',
      mobileImage: '/images/banners/mobile_04.png',
      cta1: 'Explore Collections',
      cta1Link: '#collections',
      cta2: 'WhatsApp Inquiry',
      cta2Link: 'https://wa.me/919836818376'
    },
    {
      image: '/images/banners/DHAR_BANNER_05.jpg.jpeg',
      mobileImage: '/images/banners/mobile_01.png',
      cta1: 'Explore Collections',
      cta1Link: '#collections',
      cta2: 'WhatsApp Inquiry',
      cta2Link: 'https://wa.me/919836818376'
    }
  ];

  // Auto transition slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Gold Rate Calculator State
  const [calcWeight, setCalcWeight] = useState(10);
  const [calcPurity, setCalcPurity] = useState('22K');
  const [showGoldBreakdown, setShowGoldBreakdown] = useState(false);

  const [rates, setRates] = useState({
    rate22K: 7120,
    rate24K: 7765,
    rateSilver: 92,
    updatedAt: '11:00 AM'
  });

  useEffect(() => {
    let active = true;
    getLiveRates().then(data => {
      if (active) setRates(data);
    });
    return () => { active = false; };
  }, []);

  const rate22K = rates.rate22K;
  const rate24K = rates.rate24K;
  const makingChargePercent = 12; // 12% making charges
  const gstPercent = 3; // 3% GST

  const basePricePerGram = calcPurity === '22K' ? rate22K : rate24K;
  const rawGoldValue = basePricePerGram * calcWeight;
  const makingCharges = rawGoldValue * (makingChargePercent / 100);
  const gstValue = (rawGoldValue + makingCharges) * (gstPercent / 100);
  const estimatedTotalCost = rawGoldValue + makingCharges + gstValue;

  // Collection Tabs State
  const [activeTab, setActiveTab] = useState('ALL');
  const filteredProducts = activeTab === 'ALL' 
    ? products 
    : products.filter(p => p.metalType.toUpperCase() === activeTab);

  // Circular Categories Array
  const categories = [
    { 
      name: 'Necklaces', 
      svg: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C8 6 6 9.5 6 12C6 15.5 8.5 18 12 18C15.5 18 18 15.5 18 12C18 9.5 16 6 12 2Z" fill="rgba(136,98,0,0.15)" stroke="#886200"/>
          <path d="M9 13.5C9.5 14 10.5 14.5 12 14.5C13.5 14.5 14.5 14 15 13.5" stroke="#886200" strokeLinecap="round"/>
          <circle cx="12" cy="18" r="1.5" fill="#886200"/>
        </svg>
      )
    },
    { 
      name: 'Bangles', 
      svg: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" stroke="#886200" fill="rgba(136,98,0,0.15)"/>
          <circle cx="12" cy="12" r="6" stroke="#886200"/>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#886200" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      name: 'Earrings', 
      svg: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2c-.6 0-1 .4-1 1v4h2V3c0-.6-.4-1-1-1z" fill="#886200"/>
          <path d="M7 8h10c.6 0 1 .4 1 1v6c0 2.2-1.8 4-4 4H10c-2.2 0-4-1.8-4-4V9c0-.6.4-1 1-1z" fill="rgba(136,98,0,0.15)" stroke="#886200"/>
          <circle cx="12" cy="14" r="2" fill="#886200"/>
        </svg>
      )
    },
    { 
      name: 'Rings', 
      svg: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="15" r="5" stroke="#886200" fill="rgba(136,98,0,0.15)"/>
          <path d="M12 10l-2.5-3 2.5-3 2.5 3L12 10z" fill="#886200" stroke="#886200"/>
        </svg>
      )
    },
    { 
      name: 'Tikka', 
      svg: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v10" stroke="#886200" strokeDasharray="2 2"/>
          <path d="M12 12l-4 4 4 4 4-4-4-4z" fill="rgba(136,98,0,0.15)" stroke="#886200"/>
          <circle cx="12" cy="16" r="1.5" fill="#886200"/>
        </svg>
      )
    },
    { 
      name: 'Gold Coins', 
      svg: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="8" stroke="#886200" fill="rgba(136,98,0,0.25)" className="animate-pulse"/>
          <text x="12" y="15" textAnchor="middle" fill="#886200" fontSize="8" fontWeight="bold" fontFamily="serif">24K</text>
        </svg>
      )
    },
    { 
      name: 'Silver Essence', 
      svg: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#6b7280" fill="rgba(107,114,128,0.1)"/>
          <path d="M8 12h8" stroke="#6b7280" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  return (
    <main className="flex-grow">
      
      {/* 1. HERO SLIDESHOW CAROUSEL */}
      <section className="relative h-[300px] sm:h-[500px] w-full overflow-hidden bg-[#151515]">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background image or gradient */}
            {slide.image ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Mobile Banner */}
                <img 
                  src={slide.mobileImage || slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-contain object-center opacity-100 sm:hidden" 
                />
                {/* Desktop Banner */}
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="hidden sm:block w-full h-full object-contain object-center opacity-100" 
                />
                {/* <div className="absolute inset-0 bg-black/45"></div> */}
              </div>
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradientBg}`}>
                {/* Decorative background grid pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-60"></div>
              </div>
            )}

            {/* Slide Content Overlay */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center text-[#fff6ed] z-20">
              
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-wide mb-5 max-w-4xl leading-tight">
                {slide.title}
              </h2>
              
              <p className="max-w-2xl text-xs sm:text-base opacity-90 mb-8 sm:mb-10 font-light leading-relaxed">
                {slide.subtitle}
              </p>
              
              <div className="flex flex-col mt-6 sm:mt-65 sm:flex-row gap-2.5 sm:gap-4 w-full sm:w-auto items-center">
                {/* <a 
                  href={slide.cta1Link} 
                  className="bg-brand-rust hover:bg-brand-red text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-max sm:w-auto text-center"
                >
                  {slide.cta1}
                </a>
                <a 
                  href={slide.cta2Link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-max sm:w-auto text-center"
                >
                  {slide.cta2}
                </a> */}
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Arrow Controls */}
        <button 
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-brand-red/90 text-white p-2 sm:p-3 rounded-full z-25 focus:outline-none transition-all duration-300"
          aria-label="Previous Slide"
        >
          <CaretLeft size={22} weight="bold" />
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-brand-red/90 text-white p-2 sm:p-3 rounded-full z-25 focus:outline-none transition-all duration-300"
          aria-label="Next Slide"
        >
          <CaretRight size={22} weight="bold" />
        </button>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-25">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-yellow-400 w-6' : 'bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* 2. CIRCULAR CATEGORY SHOWCASE */}
      <section className="py-12 bg-white border-b border-[#e9e3e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-nowrap md:flex-wrap md:justify-center items-center gap-6 sm:gap-10 overflow-x-auto pb-4 md:pb-0 scrollbar-none">
            {categories.map((cat, idx) => (
              <a 
                key={idx} 
                href={`/collection/${cat.name.toLowerCase()}`}
                onClick={() => {
                  if (cat.name.includes('Silver')) setActiveTab('SILVER');
                  else if (cat.name.includes('Coin')) setActiveTab('GOLD');
                  else setActiveTab('ALL');
                }}
                className="flex flex-col items-center flex-shrink-0 group text-center"
              >
                <div className="w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full bg-[#fffcf6] border border-[#e9e3e0] flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-brand-gold transition-all duration-500 transform group-hover:scale-105">
                  {cat.svg}
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-text-body mt-2.5 uppercase tracking-wider group-hover:text-brand-red transition-colors">
                  {cat.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE GOLD RATE CALCULATOR */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#e9e3e0] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Calculator Inputs */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-brand-gold border-b border-[#e9e3e0]/50 pb-4">
              <div className="flex items-center gap-2.5">
                <Calculator size={28} weight="fill" />
                <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-brand-dark-red tracking-wide uppercase">
                  Gold Value Estimator
                </h3>
              </div>
              <span className="text-[10px] bg-brand-gold/10 text-brand-gold font-semibold px-2.5 py-1 rounded-full border border-brand-gold/20 flex items-center gap-1 self-start sm:self-auto">
                <Sparkle size={10} weight="fill" className="text-yellow-500 animate-pulse" />
                Live Rates ({rates.updatedAt})
              </span>
            </div>
            
            <p className="text-xs text-text-body/80 leading-relaxed font-light">
              Dhar Jewellery House provides full transparency. Calculate the estimated pricing of ornaments based on current real-time market rates in Kolkata (22K gold @ ₹ {rate22K.toLocaleString('en-IN')}/g, 24K gold @ ₹ {rate24K.toLocaleString('en-IN')}/g). Included is standard 12% making charges and 3% GST.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* Purity selector */}
              <div>
                <label className="block text-[10px] uppercase font-extrabold text-brand-gold tracking-widest mb-2">Select Purity</label>
                <div className="flex bg-[#fffcf6] p-1 rounded-xl border border-[#e9e3e0]">
                  <button 
                    onClick={() => setCalcPurity('22K')}
                    className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                      calcPurity === '22K' ? 'bg-brand-red text-white shadow-md' : 'text-text-body hover:bg-cream-dark'
                    }`}
                  >
                    22K Gold (91.6% Pure)
                  </button>
                  <button 
                    onClick={() => setCalcPurity('24K')}
                    className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                      calcPurity === '24K' ? 'bg-brand-red text-white shadow-md' : 'text-text-body hover:bg-cream-dark'
                    }`}
                  >
                    24K Gold (99.9% Pure)
                  </button>
                </div>
              </div>

              {/* Weight Selector */}
              <div>
                <label className="block text-[10px] uppercase font-extrabold text-brand-gold tracking-widest mb-2">Enter Weight (Grams)</label>
                <div className="flex bg-[#fffcf6] items-center px-3.5 py-1.5 rounded-xl border border-[#e9e3e0]">
                  <input 
                    type="number"
                    min="1"
                    max="1000"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(Number(e.target.value))}
                    className="bg-transparent text-sm w-full font-bold focus:outline-none text-text-body border-none"
                  />
                  <span className="text-xs font-bold text-text-body/50">grams</span>
                </div>
              </div>
            </div>

            {/* Quick weight shortcuts */}
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-[10px] uppercase text-text-body/50 font-bold tracking-wider mr-1">Shortcuts:</span>
              {[1, 5, 8, 10, 20, 50, 100].map((w) => (
                <button
                  key={w}
                  onClick={() => setCalcWeight(w)}
                  className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-all ${
                    calcWeight === w 
                      ? 'bg-brand-gold/15 text-brand-gold border-brand-gold' 
                      : 'bg-white text-text-body/70 border-[#e9e3e0] hover:border-brand-gold'
                  }`}
                >
                  {w}g
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Calculations Breakdown Block */}
          <div className="lg:col-span-5 bg-[#fff7e7] p-8 sm:p-10 border-t lg:border-t-0 lg:border-l border-[#e9e3e0] flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-extrabold uppercase tracking-widest text-brand-dark-red pb-2 border-b border-[#e9e3e0]">
                Price Summary Breakdown
              </h4>
              
              <div className="space-y-2.5 text-xs text-text-body">
                <div className="flex justify-between font-medium">
                  <span className="opacity-75">Base Rate ({calcPurity} Gold):</span>
                  <span>₹ {basePricePerGram.toLocaleString('en-IN')}/g</span>
                </div>
                
                <div className="flex justify-between font-medium">
                  <span className="opacity-75">Raw Gold Value ({calcWeight}g):</span>
                  <span>₹ {rawGoldValue.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between font-medium text-brand-gold">
                  <span className="opacity-75">Making Charges ({makingChargePercent}%):</span>
                  <span>+ ₹ {makingCharges.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between font-medium text-brand-gold">
                  <span className="opacity-75">GST Value ({gstPercent}%):</span>
                  <span>+ ₹ {gstValue.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-dashed border-[#e9e3e0]">
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-serif text-xs uppercase tracking-wider font-extrabold text-brand-dark-red">Est. Total Price</span>
                <p className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-rust tracking-tight">
                  ₹ {Math.round(estimatedTotalCost).toLocaleString('en-IN')}
                </p>
              </div>

              <a 
                href={`https://wa.me/919836818376?text=Hi! I checked your Gold Estimator for ${calcWeight}g of ${calcPurity} gold. Estimated price is ₹ ${Math.round(estimatedTotalCost).toLocaleString('en-IN')}. I would like to book a visit to discuss custom jewelry crafting!`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-colors"
              >
                <WhatsappLogo size={20} weight="fill" />
                <span>Book In-Store Valuation</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 4. GOVERNMENT APPROVED TRUST RIBBON */}
      <section className="bg-[#fff7e7] border-y border-[#e9e3e0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="flex flex-col items-center p-2">
            <ShieldCheck size={36} className="text-brand-gold mb-2.5" />
            <h4 className="font-serif text-xs font-bold uppercase tracking-wide text-brand-dark-red">100% BIS Hallmarked</h4>
            <p className="text-[10px] text-text-body opacity-80 mt-1 leading-normal font-light">Certified government standard gold purity check on all catalog items.</p>
          </div>

          <div className="flex flex-col items-center p-2 border-l border-[#e9e3e0]/60">
            <Sparkle size={36} className="text-brand-gold mb-2.5" />
            <h4 className="font-serif text-xs font-bold uppercase tracking-wide text-brand-dark-red">Top Quality Crystals</h4>
            <p className="text-[10px] text-text-body opacity-80 mt-1 leading-normal font-light">Genuine VVS-GH quality natural diamonds with authentic certificates.</p>
          </div>

          <div className="flex flex-col items-center p-2 border-t md:border-t-0 md:border-l border-[#e9e3e0]/60">
            <Truck size={36} className="text-brand-gold mb-2.5" />
            <h4 className="font-serif text-xs font-bold uppercase tracking-wide text-brand-dark-red">Safe Insured Delivery</h4>
            <p className="text-[10px] text-text-body opacity-80 mt-1 leading-normal font-light">Full-value transit coverage ensures your order reaches secure and undamaged.</p>
          </div>

          <div className="flex flex-col items-center p-2 border-l border-[#e9e3e0]/60">
            <ArrowsLeftRight size={36} className="text-brand-gold mb-2.5" />
            <h4 className="font-serif text-xs font-bold uppercase tracking-wide text-brand-dark-red">Lifetime Purity Pledge</h4>
            <p className="text-[10px] text-text-body opacity-80 mt-1 leading-normal font-light">Highly competitive and fully transparent gold valuation exchange policy.</p>
          </div>

        </div>
      </section>

      {/* 5. TABBED FEATURED COLLECTIONS SHOWCASE */}
      <section id="collections" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase font-bold text-brand-gold tracking-[0.3em] block mb-2.5">Authentic Collection</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-brand-dark-red tracking-wide uppercase">
            Signature Jewellery
          </h2>
          <div className="w-20 h-[1.5px] bg-brand-gold mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center items-center gap-3 sm:gap-6 mb-12 border-b border-[#e9e3e0] max-w-lg mx-auto pb-4">
          {[
            { label: 'All Collections', value: 'ALL' },
            { label: 'Gold Specials', value: 'GOLD' },
            { label: 'Silver Elegants', value: 'SILVER' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`text-xs font-bold uppercase tracking-widest py-2 px-3 border-b-2 transition-all ${
                activeTab === tab.value 
                  ? 'border-brand-rust text-brand-rust font-extrabold' 
                  : 'border-transparent text-text-body/75 hover:text-brand-red'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* 6. OUR LEGACY & HERITAGE */}
      <section id="legacy" className="bg-[#fff7e7] py-16 sm:py-24 border-t border-[#e9e3e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Legacy text details */}
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-gold tracking-[0.25em] block mb-2">Our Foundation Story</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-brand-dark-red tracking-wide uppercase leading-tight">
                Crafting Legacies Since 1978
              </h2>
              <div className="w-16 h-[1.5px] bg-brand-gold mt-3"></div>
            </div>

            <p className="text-sm text-text-body opacity-85 leading-relaxed font-light">
              For close to five decades, **Dhar Jewellery House** has stood as a beacon of trust, purity, and exquisite craftsmanship in Diamond District, West Bengal. Handcrafted by master *karigars* (Bengal artisans) who have inherited the heritage of fine wire filigree and traditional gemstone encrustation, every piece in our collection is treated as a work of art.
            </p>

            <p className="text-sm text-text-body opacity-85 leading-relaxed font-light">
              From the heavy gold ornaments that grace our gorgeous brides on their wedding day, to the minimalistic diamonds that define modern celebrations, we are committed to providing transparency in gold valuation, government-approved hallmarking purity, and lifetime assurances.
            </p>

            <div className="pt-2">
              <Link 
                to="/story" 
                className="inline-flex items-center gap-2 bg-brand-rust hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Read Our Full Story</span>
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>

          {/* Legacy illustrative banner grid */}
          <div className="relative flex justify-center">
            {/* Visual banner block overlay */}
            <div className="relative w-full max-w-md h-[300px] sm:h-[380px] rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/20">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-dark-red/90 to-[#3b3330]/95 mix-blend-multiply z-10"></div>
              <img 
                src="/images/necklace-1.png" 
                alt="Filigree gold detailing" 
                className="w-full h-full object-cover opacity-60 filter grayscale-[20%]" 
              />
              
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-8 text-[#fff6ed]">
                <div className="w-16 h-16 rounded-full border-2 border-brand-gold flex items-center justify-center text-yellow-400 mb-4 animate-spin-slow">
                  <Coins size={32} weight="fill" />
                </div>
                <h4 className="font-serif text-lg font-bold tracking-widest uppercase text-yellow-300 mb-2">100% Purity Pledge</h4>
                <p className="text-xs opacity-90 leading-relaxed font-light max-w-xs">
                  Every gram of gold is weighed under strict government calibrations and BIS certified seals.
                </p>
                <div className="mt-6 flex items-center justify-center gap-1.5">
                  <span className="w-4 h-[1px] bg-brand-gold"></span>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-yellow-400">Trusted Since 1978</span>
                  <span className="w-4 h-[1px] bg-brand-gold"></span>
                </div>
              </div>
            </div>
            
            {/* Soft background decor circle */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-[#886200]/5 -z-10 blur-xl"></div>
          </div>

        </div>
      </section>

    </main>
  );
}
