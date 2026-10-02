import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { 
  WhatsappLogo, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkle, 
  SealCheck,
  WarningCircle,
  Calculator,
  Minus,
  Plus
} from '@phosphor-icons/react';
import { getLiveRates } from '../data/liveRates';

export default function ProductDetail() {
  const { id } = useParams();
  const baseProduct = products.find(p => p.id === id);

  if (!baseProduct) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-8 bg-[#fffcf6] min-h-[50vh]">
        <WarningCircle size={48} className="text-brand-red mb-4" />
        <h2 className="text-2xl font-serif font-bold text-brand-dark-red mb-4">Product Not Found</h2>
        <Link to="/" className="text-brand-rust hover:underline flex items-center gap-2 font-semibold">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  // Active Image State (for gallery thumbnail selection)
  const [activeImage, setActiveImage] = useState(baseProduct.image);

  // Dynamic Weight & Price Adjuster
  const [customWeight, setCustomWeight] = useState(baseProduct.weightVal || 0);

  const isGemstoneProduct = (baseProduct.category || '').toUpperCase() === 'GEMSTONE' || (baseProduct.metalType || '').toUpperCase() === 'GEMSTONE';
  const [gemstoneGrade, setGemstoneGrade] = useState('gradeA');
  const [gemstoneSize, setGemstoneSize] = useState(1);
  
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

  const is24K = baseProduct.purity.toLowerCase().includes('24k') || baseProduct.purity.toLowerCase().includes('24 karat');
  const goldRatePerGram = is24K ? rates.rate24K : rates.rate22K;
  
  // Dynamic calculation for gold items
  const isGoldProduct = (baseProduct.metalType || '').toUpperCase() === 'GOLD';
  const rawValue = customWeight * goldRatePerGram;
  
  // Making charges & GST details
  const makingCharges = rawValue * 0.12;
  const gstValue = (rawValue + makingCharges) * 0.03;
  const estimatedTotalPrice = isGoldProduct && customWeight > 0
    ? Math.round(rawValue + makingCharges + gstValue)
    : baseProduct.priceVal; // For diamond/silver products, price is kept fixed in this simple estimator

  // Dynamic calculation for gemstone items
  let gemstoneEstimatedPrice = 0;
  if (isGemstoneProduct) {
    const gradePrice = Number(baseProduct[gemstoneGrade]) || 0;
    gemstoneEstimatedPrice = gemstoneSize * gradePrice;
  }

  const formattedPrice = isGoldProduct && customWeight > 0
    ? `₹ ${estimatedTotalPrice.toLocaleString('en-IN')}`
    : isGemstoneProduct && gemstoneEstimatedPrice > 0
    ? `₹ ${gemstoneEstimatedPrice.toLocaleString('en-IN')}`
    : baseProduct.price || 'Call for Price';

  // Inquire Action details
  const whatsappNumber = "919836818376";
  const weightString = customWeight > 0 ? `Weight: ${customWeight.toFixed(2)}g, ` : '';
  const gemstoneString = isGemstoneProduct ? `Grade: ${gemstoneGrade.replace('grade', '')}, Size: ${gemstoneSize}, ` : '';
  const whatsappMessage = encodeURIComponent(
    `Hi Dhar Jewellery House! I am highly interested in the "${baseProduct.name}" (SKU: ${baseProduct.sku}). Specifications: ${weightString}${gemstoneString}Purity: ${baseProduct.purity}, Estimated Price: ${formattedPrice}. Please guide me on booking an in-store trial.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Adjust weight helpers
  const handleIncreaseWeight = () => {
    setCustomWeight(prev => Number((prev + 0.5).toFixed(2)));
  };

  const handleDecreaseWeight = () => {
    setCustomWeight(prev => Number(Math.max(1, prev - 0.5).toFixed(2)));
  };

  return (
    <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      {/* 1. BREADCRUMBS */}
      <nav className="flex justify-between items-center mb-8 bg-white border border-[#e9e3e0] py-3.5 px-6 rounded-2xl shadow-sm">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-body/75 hover:text-brand-red transition-colors"
        >
          <ArrowLeft size={16} weight="bold" />
          <span>Back to Collections</span>
        </Link>
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-text-body/50">
          <Link to="/" className="hover:text-brand-red">Home</Link>
          <span>/</span>
          <span className="hover:text-brand-red">Collections</span>
          <span>/</span>
          <span className="text-brand-gold">{baseProduct.category}</span>
        </div>
      </nav>
      
      {/* 2. SPLIT LAYOUT SHEET */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#e9e3e0] flex flex-col lg:flex-row min-h-[580px]">
        
        {/* Left Column: Image Showcase & Thumbnail Gallery */}
        <div className="lg:w-1/2 bg-[#fff7e7] p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#e9e3e0]">
          
          {/* Main Zoomable Image Frame */}
          <div className="relative aspect-square max-w-md mx-auto w-full bg-white rounded-2xl shadow-md border border-[#e9e3e0]/40 overflow-hidden flex items-center justify-center p-6 cursor-zoom-in group">
            <img 
              src={activeImage} 
              alt={baseProduct.name} 
              className="w-full h-full object-contain max-h-[360px] drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
            />
            {/* Hologram Badge */}
            <div className="absolute top-4 left-4 bg-brand-dark-red text-yellow-300 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 border border-brand-gold/30">
              <Sparkle size={12} weight="fill" className="animate-spin-slow" />
              <span>Certified Purity</span>
            </div>
          </div>

          {/* Thumbnail Gallery Toggles */}
          {baseProduct.images && baseProduct.images.length > 1 && (
            <div className="flex justify-center items-center gap-3 mt-6">
              {baseProduct.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-xl bg-white border-2 overflow-hidden p-1 shadow-sm transition-all duration-300 transform active:scale-95 ${
                    activeImage === img ? 'border-brand-gold scale-[1.05] shadow-md' : 'border-[#e9e3e0] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail view" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Safe Delivery Pledge */}
          <div className="mt-8 text-center text-[10px] text-text-body/60 font-medium uppercase tracking-wider flex items-center justify-center gap-2 bg-white/40 py-2.5 rounded-lg border border-[#e9e3e0]/30">
            <ShieldCheck size={16} className="text-brand-gold" />
            <span>100% Insured Delivery with Hallmark Valuation Certificate</span>
          </div>
        </div>
        
        {/* Right Column: Luxury Details & Pricing sheets */}
        <div className="lg:w-1/2 p-8 sm:p-10 md:p-12 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Category tag & Title */}
            <div className="space-y-1.5">
              <p className="text-xs font-bold text-brand-gold tracking-[0.25em] uppercase">
                {baseProduct.category}
              </p>
              <h1 className="text-2xl sm:text-3.5xl font-serif font-extrabold text-brand-dark-red tracking-wide leading-snug">
                {baseProduct.name}
              </h1>
              <div className="flex items-center gap-4 text-xs font-semibold text-text-body/55">
                <span>SKU: {baseProduct.sku}</span>
                <span>•</span>
                <span className="text-[#279A4B] flex items-center gap-1">
                  <SealCheck size={16} weight="fill" /> In Stock
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-[#fffcf6] p-5 rounded-2xl border border-[#e9e3e0] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-text-body/55">Estimated Price</span>
                  <p className="text-2xl sm:text-3xl font-serif font-extrabold text-brand-rust tracking-tight mt-0.5">
                    {formattedPrice}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase font-bold bg-[#fff7e7] text-brand-gold px-2.5 py-1 rounded-full border border-brand-gold/20 tracking-wider">
                    {baseProduct.purity.split('(')[0]}
                  </span>
                  <p className="text-[9px] text-text-body/55 mt-1 font-semibold">BIS Standard Certifications</p>
                </div>
              </div>
              {isGoldProduct && (
                <div className="flex items-center justify-between border-t border-[#e9e3e0]/60 pt-2 text-[10px] text-text-body/65">
                  <span className="flex items-center gap-1">
                    <Sparkle size={10} weight="fill" className="text-yellow-500 animate-pulse" />
                    Live Gold Rate (Kolkata): <strong>₹ {goldRatePerGram.toLocaleString('en-IN')}/g</strong>
                  </span>
                  <span>Updated: {rates.updatedAt}</span>
                </div>
              )}
            </div>

            <div className="h-px bg-[#e9e3e0] w-full"></div>

            {/* Weight Calculator (Dynamic estimation widget) */}
            {isGoldProduct && (
              <div className="space-y-3.5 bg-cream-dark/30 p-4.5 rounded-2xl border border-[#e9e3e0]/60">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-brand-gold">
                    <Calculator size={18} weight="bold" />
                    <span className="text-[10px] uppercase font-extrabold tracking-widest">Adjust Ornament Weight</span>
                  </div>
                  <span className="text-[10px] font-bold text-text-body/60">Base Gold Weight: {baseProduct.weight}</span>
                </div>
                
                <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-[#e9e3e0]">
                  <button 
                    onClick={handleDecreaseWeight} 
                    className="p-1 text-text-body/60 hover:text-brand-red active:scale-95 transition-transform"
                    aria-label="Decrease weight"
                  >
                    <Minus size={16} weight="bold" />
                  </button>
                  <div className="text-center">
                    <span className="text-base font-extrabold text-brand-dark-red">{customWeight.toFixed(2)}</span>
                    <span className="text-[11px] font-bold text-text-body/55 ml-1">grams</span>
                  </div>
                  <button 
                    onClick={handleIncreaseWeight} 
                    className="p-1 text-text-body/60 hover:text-brand-red active:scale-95 transition-transform"
                    aria-label="Increase weight"
                  >
                    <Plus size={16} weight="bold" />
                  </button>
                </div>
                <p className="text-[10px] text-text-body/50 text-center font-light leading-normal">
                  *Weight can vary slightly based on final handcrafted polish. Prices fluctuate daily.
                </p>
              </div>
            )}
            {/* Gemstone Grade & Size Selector */}
            {isGemstoneProduct && (
              <div className="space-y-3.5 bg-cream-dark/30 p-4.5 rounded-2xl border border-[#e9e3e0]/60">
                <div className="flex items-center gap-2 text-brand-gold mb-2">
                  <Sparkle size={18} weight="fill" />
                  <span className="text-[10px] uppercase font-extrabold tracking-widest">Select Gemstone Grade & Size</span>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2 space-y-1">
                    <label className="text-[10px] uppercase font-bold text-text-body/60">Grade</label>
                    <select 
                      value={gemstoneGrade}
                      onChange={(e) => setGemstoneGrade(e.target.value)}
                      className="w-full bg-white border border-[#e9e3e0] text-sm text-text-body p-3 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors font-medium"
                    >
                      <option value="gradeA">Grade A (Premium)</option>
                      <option value="gradeB">Grade B (Standard)</option>
                      <option value="gradeC">Grade C (Basic)</option>
                    </select>
                  </div>
                  <div className="w-1/2 space-y-1">
                    <label className="text-[10px] uppercase font-bold text-text-body/60">Size</label>
                    <input 
                      type="number"
                      min="1"
                      step="0.1"
                      value={gemstoneSize}
                      onChange={(e) => setGemstoneSize(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-white border border-[#e9e3e0] text-sm text-text-body p-3 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors font-medium"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-text-body/50 text-center font-light leading-normal mt-2">
                  *Different grades offer varying levels of clarity, color intensity, and astrological benefits.
                </p>
              </div>
            )}

            {/* Description Block */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-extrabold text-brand-gold tracking-widest">Product Description</h3>
              <p className="text-xs text-text-body/85 leading-relaxed font-light">
                {baseProduct.description}
              </p>
            </div>

            {/* Specifications Details Table */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-extrabold text-brand-gold tracking-widest">Ornament Specifications</h3>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-6 text-xs border border-[#e9e3e0]/60 p-4 rounded-xl bg-[#fffcf6]">
                <div className="opacity-70 font-light">Metal Type</div>
                <div className="font-semibold text-text-body">{baseProduct.metalType}</div>
                
                <div className="opacity-70 font-light">Purity Certificate</div>
                <div className="font-semibold text-text-body">{baseProduct.purity}</div>
                
                <div className="opacity-70 font-light">Estimated Weight</div>
                <div className="font-semibold text-text-body">{customWeight.toFixed(2)} g</div>
                
                <div className="opacity-70 font-light">SKU Identifier</div>
                <div className="font-semibold text-text-body">{baseProduct.sku}</div>

                <div className="opacity-70 font-light col-span-2 h-[1px] bg-[#e9e3e0]/50 my-1"></div>

                <div className="opacity-70 font-light">Authentication</div>
                <div className="font-semibold text-brand-gold flex items-center gap-1.5">
                  <ShieldCheck size={16} /> Certified Authentic
                </div>
              </div>
            </div>

            {/* Highlights List */}
            {baseProduct.features && (
              <div className="space-y-2.5">
                <h3 className="text-xs uppercase font-extrabold text-brand-gold tracking-widest">Highlights & Features</h3>
                <ul className="space-y-1.5 text-xs text-text-body/85 font-light">
                  {baseProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-brand-gold font-bold">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Action Row: WhatsApp CTA button */}
          <div className="mt-10 pt-6 border-t border-[#e9e3e0]">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 px-8 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-[0.98]"
            >
              <WhatsappLogo size={24} weight="fill" />
              <span>Inquire via WhatsApp</span>
            </a>
            
            <p className="text-[10px] text-center text-text-body/55 mt-2.5 font-light">
              Clicking will load WhatsApp Web or App with a structured, pre-filled inquiry.
            </p>
          </div>
        </div>

      </div>

      {/* 3. BIS HALLMARKING DETAILS ORNAMENT (Transparency Card) */}
      <section className="mt-12 bg-[#fff7e7] p-8 rounded-3xl border border-[#e9e3e0] shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-2/3 space-y-4">
            <div className="flex items-center gap-2.5 text-brand-gold">
              <ShieldCheck size={28} weight="fill" />
              <h3 className="font-serif text-lg sm:text-xl font-extrabold text-brand-dark-red tracking-wide uppercase">
                BIS Hallmark Purity Seal Verification
              </h3>
            </div>
            <p className="text-xs text-text-body opacity-85 leading-relaxed font-light">
              At **Dhar Jewellery House**, our products undergo strict testing in government laboratories to secure official Bureau of Indian Standards (BIS) Hallmarks. A standard authentic hallmark contains four components which are laser-engraved onto the interior band of your jewelry. Always verify these symbols upon collection:
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-medium pt-2">
              <div className="bg-white p-3 rounded-lg border border-[#e9e3e0] flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center font-bold">1</span>
                <div>
                  <p className="text-brand-dark-red font-bold">BIS Logo</p>
                  <p className="text-[10px] opacity-75 font-normal">Triangular government seal</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#e9e3e0] flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center font-bold">2</span>
                <div>
                  <p className="text-brand-dark-red font-bold">Purity Grade</p>
                  <p className="text-[10px] opacity-75 font-normal">e.g., 22K916 (91.6% Pure Gold)</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#e9e3e0] flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center font-bold">3</span>
                <div>
                  <p className="text-brand-dark-red font-bold">Assaying Center Code</p>
                  <p className="text-[10px] opacity-75 font-normal">Identifying lab symbol</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#e9e3e0] flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center font-bold">4</span>
                <div>
                  <p className="text-brand-dark-red font-bold">Unique HUID Seal</p>
                  <p className="text-[10px] opacity-75 font-normal">Laser etched 6-digit identification</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Vector Hallmark Shield illustration */}
          <div className="md:w-1/3 flex justify-center w-full">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-[#e9e3e0] flex flex-col items-center text-center max-w-[200px] w-full">
              <svg className="w-16 h-16 text-yellow-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7v9c0 5.52 4.48 10 9 10s9-4.48 9-10V7l-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(253,154,82,0.06)"/>
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="currentColor"/>
              </svg>
              <h4 className="font-serif text-[11px] font-bold text-brand-dark-red uppercase tracking-wider mt-3">Government Hallmarked</h4>
              <p className="text-[9px] text-text-body opacity-70 mt-1 font-light leading-relaxed">
                BIS certified 916 pure gold ornaments with verified laser HUID traceability codes.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
