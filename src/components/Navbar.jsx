import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  WhatsappLogo, 
  MagnifyingGlass, 
  Heart, 
  User, 
  List, 
  X, 
  MapPin, 
  Sparkle 
} from '@phosphor-icons/react';
import { getLiveRates } from '../data/liveRates';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const [rates, setRates] = useState({
    rate22K: 7120,
    rate24K: 7765,
    rateSilver: 92,
    updatedAt: '11:00 AM'
  });

  // Fetch live rates on mount
  useEffect(() => {
    let active = true;
    getLiveRates().then(data => {
      if (active) setRates(data);
    });
    return () => { active = false; };
  }, []);

  // Scroll detection to collapse top logo tier
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Gold', path: '/collection/gold' },
    { label: 'Silver Essence', path: '/collection/silver' },
    { label: 'Our Legacy', path: '/#legacy' },
    { label: 'Showrooms', path: '/#footer-map' },
  ];

  return (
    <>
      {/* Top Banner Ticker: Announcement or Live Market Gold Rate */}
      <div className="bg-[#151515] text-[#fff6ed] text-xs py-2 overflow-hidden border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[11px] sm:text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-yellow-400 font-semibold uppercase tracking-wider">
              <Sparkle size={12} weight="fill" />
              Live Rate
            </span>
            <span className="opacity-80 hidden sm:inline">22K Gold: ₹ {rates.rate22K.toLocaleString('en-IN')}/g</span>
            <span className="opacity-80 hidden sm:inline">|</span>
            <span className="opacity-80">24K Gold: ₹ {rates.rate24K.toLocaleString('en-IN')}/g</span>
            <span className="opacity-80 hidden md:inline">|</span>
            <span className="opacity-80 hidden md:inline">Silver: ₹ {rates.rateSilver.toLocaleString('en-IN')}/g</span>
          </div>
          <div className="flex items-center gap-4 opacity-90">
            <span className="hidden md:flex items-center gap-1 text-[11px]">
              {/* <MapPin size={12} /> */}
              <span>GSTIN: 19AAOFD7314A1ZL</span>
            </span>
            <span className="hidden md:inline">|</span>
            <a href="https://wa.me/919836818376" className="hover:text-yellow-400 flex items-center gap-1 transition-colors">
              <WhatsappLogo size={14} weight="fill" className="text-[#25D366]" />
              <span>+91 98368 18376</span>
            </a>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1 text-[11px]">
              <Clock size={12} />
              11:00 AM - 8:30 PM (Mon-Sat)
            </span>
          </div>
        </div>
      </div>

      {/* Tier 1: Logo & Crest Section (Collapses/shrings on scroll) */}
      <div 
        className={`bg-[#e6e1d7] border-b border-[#e9e3e0] transition-all duration-500 overflow-hidden ${
          isScrolled ? 'h-0 opacity-0 pointer-events-none' : 'py-0 sm:py-0 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 items-center">
          {/* Left Crest: 100% BIS Hallmarked Purity Seal */}
          <div className="hidden md:flex items-center gap-3">
            <svg className="w-10 h-10 text-brand-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 5V11C4 16.55 7.41 21.74 12 23C16.59 21.74 20 16.55 20 11V5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(136,98,0,0.06)"/>
              <path d="M9 11L11 13L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="leading-tight">
              <p className="font-serif font-bold text-xs uppercase text-brand-gold tracking-wider">Purity Pledge</p>
              <p className="text-[10px] text-text-body opacity-85 font-medium">100% BIS Hallmarked</p>
            </div>
          </div>

          {/* Center Brand Identity: Main Wordmark */}
          <div className="col-span-3 md:col-span-1 flex flex-col items-center justify-center">
            <Link to="/" className="text-center group block">
              <img src="/images/logo/LOGO_06.webp" alt="Dhar Jewellery Logo" className="h-21 sm:h-30 object-contain mx-auto transition-transform duration-300 group-hover:scale-110" />
            </Link>
          </div>

          {/* Right Crest: Legacy Shield */}
          <div className="hidden md:flex items-center justify-end gap-3 text-right">
            <div className="leading-tight">
              <p className="font-serif font-bold text-xs uppercase text-brand-gold tracking-wider">Legacy of Trust</p>
              <p className="text-[10px] text-text-body opacity-85 font-medium">Celebrating 50 Years</p>
            </div>
            <svg className="w-10 h-10 text-brand-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(136,98,0,0.06)"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Tier 2: Sticky Main Navigation (Red Bar) */}
      <nav 
        className={`bg-brand-red text-cream sticky top-0 z-50 transition-all duration-300 border-b border-brand-dark-red ${
          isScrolled ? 'shadow-lg py-1.5 sm:py-2' : 'shadow-md py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Hamburger Toggle (Mobile only) */}
            <div className="flex items-center sm:hidden">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="text-cream hover:text-brand-gold p-1.5 focus:outline-none transition-colors duration-300"
                aria-label="Open Navigation Menu"
              >
                <List size={26} weight="bold" />
              </button>
            </div>

            {/* Scrolled Small Logo Wordmark (Only visible when scrolled) */}
            <div 
              className={`flex-shrink-0 flex items-center transition-all duration-500 transform ${
                isScrolled ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-4 scale-95 pointer-events-none hidden sm:flex'
              }`}
            >
              <Link to="/" className="flex flex-col group">
                <img src="/images/logo/LOGO_06W.webp" alt="Dhar Jewellery Logo" className="h-20 object-contain transition-transform duration-300 group-hover:scale-105" />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex space-x-1 md:space-x-4 items-center">
              {navLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  to={link.path} 
                  onClick={() => {
                    if (!link.path.includes('#')) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="font-serif text-[13px] md:text-[14px] font-semibold text-cream hover:text-yellow-200 px-3 py-1.5 rounded transition-all duration-300 tracking-wider uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Header Action Items (Right) */}
            <div className="flex items-center gap-1.5 sm:gap-4">
              
              {/* Search Toggle */}
              <div className="relative">
                {searchOpen ? (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-text-body rounded-full shadow-lg flex items-center px-3.5 py-1.5 w-[200px] sm:w-[260px] border border-brand-gold z-10 transition-all duration-300">
                    <input 
                      type="text" 
                      placeholder="Search jewelry..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-xs w-full focus:outline-none border-none pl-1"
                      autoFocus
                    />
                    <button 
                      onClick={() => setSearchOpen(false)}
                      className="text-text-body opacity-60 hover:opacity-90 ml-1.5"
                    >
                      <X size={14} weight="bold" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setSearchOpen(true)}
                    className="text-cream hover:text-yellow-200 p-2 rounded-full hover:bg-brand-dark-red/30 transition-colors duration-300"
                    aria-label="Open Search"
                  >
                    <MagnifyingGlass size={20} />
                  </button>
                )}
              </div>

              {/* Wishlist Link */}
              {/* <Link 
                to="/#collections" 
                className="text-cream hover:text-yellow-200 p-2 rounded-full hover:bg-brand-dark-red/30 transition-colors duration-300"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link> */}

              {/* Showroom Locator Icon */}
              <a 
                href="#footer-map" 
                className="text-cream hover:text-yellow-200 p-2 rounded-full hover:bg-brand-dark-red/30 transition-colors duration-300 hidden md:block"
                aria-label="Showroom Locator"
              >
                <MapPin size={20} />
              </a>

              {/* Account Link */}
              {/* <Link 
                to="/" 
                className="text-cream hover:text-yellow-200 p-2 rounded-full hover:bg-brand-dark-red/30 transition-colors duration-300"
                aria-label="Profile"
              >
                <User size={20} />
              </Link> */}

              {/* Inquire CTA Button (Desktop only) */}
              <a 
                href="https://wa.me/919836818376" 
                target="_blank" 
                rel="noreferrer" 
                className="hidden lg:flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-[12px] font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-[1.03]"
              >
                <WhatsappLogo size={18} weight="fill" />
                <span>WhatsApp Us</span>
              </a>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {/* Mobile Drawer Panel */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-[280px] bg-[#fffcf6] shadow-2xl flex flex-col transition-transform duration-300 ease-out z-50 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="bg-brand-red text-cream p-5 flex justify-between items-center border-b border-brand-dark-red">
            <div className="flex flex-col">
              <span className="font-serif text-lg leading-tight font-extrabold tracking-wide uppercase text-white">
                Dhar
              </span>
              <span className="font-serif text-[9px] tracking-[0.15em] font-semibold text-yellow-400">
                Jewellery House
              </span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-cream hover:text-yellow-200 p-1 focus:outline-none transition-colors"
              aria-label="Close Menu"
            >
              <X size={24} weight="bold" />
            </button>
          </div>

          {/* Drawer Body - Links */}
          <div className="flex-grow py-6 px-4 overflow-y-auto space-y-4">
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase font-bold text-brand-gold tracking-[0.15em] px-3 mb-2">Navigation</p>
              {navLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  to={link.path}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (!link.path.includes('#')) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="block font-serif text-[15px] font-bold text-text-body hover:bg-cream-dark px-3.5 py-2.5 rounded-lg transition-colors border-l-2 border-transparent hover:border-brand-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="h-px bg-[#e9e3e0] my-4"></div>

            <div className="space-y-2 px-3.5">
              <p className="text-[10px] uppercase font-bold text-brand-gold tracking-[0.15em] mb-2.5">Shop by Metal</p>
              <Link to="/collection/gold" onClick={() => { setMobileMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'}); }} className="flex items-center justify-between text-xs text-text-body opacity-90 py-1 hover:text-brand-red transition-colors">
                <span>Gold Jewellery Collection</span>
                <span className="text-[9px] bg-brand-gold/15 text-brand-gold font-bold px-2 py-0.5 rounded-full">22K / 18K</span>
              </Link>
              <Link to="/collection/silver" onClick={() => { setMobileMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'}); }} className="flex items-center justify-between text-xs text-text-body opacity-90 py-1 hover:text-brand-red transition-colors">
                <span>Silver Elegants</span>
                <span className="text-[9px] bg-brand-gold/15 text-brand-gold font-bold px-2 py-0.5 rounded-full">925 Pure</span>
              </Link>
            </div>
          </div>

          {/* Drawer Footer - Contact info */}
          <div className="bg-cream-dark p-5 border-t border-[#e9e3e0] text-center space-y-3.5">
            <div className="flex items-center justify-center gap-2 text-text-body text-xs font-semibold">
              <MapPin size={16} className="text-brand-gold" />
              <span>Showroom at Diamond District</span>
            </div>
            <a 
              href="https://wa.me/919836818376" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl shadow-md transition-colors"
            >
              <WhatsappLogo size={18} weight="fill" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// Clock component fallback for simple SVG rendering or simple time
function Clock(props) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={props.size || 16} 
      height={props.size || 16} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
