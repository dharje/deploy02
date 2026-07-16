import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WhatsappLogo } from '@phosphor-icons/react';
import { getLiveRates } from '../data/liveRates';

export default function ProductCard({ product }) {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    let active = true;
    getLiveRates().then(data => {
      if (active) setRates(data);
    });
    return () => { active = false; };
  }, []);

  const whatsappNumber = "919876543210";
  
  const isGoldProduct = product.metalType.toUpperCase() === 'GOLD';
  
  // Calculate price dynamically if rates are loaded and it's a gold product
  let displayPrice = product.price || 'Call for Price';
  let dynamicWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Dhar Jewellery House! I am interested in the ${product.name || 'product'} (SKU: ${product.sku || 'N/A'}) priced at ${displayPrice}. Could you please share more details or schedule an in-store viewing?`
  )}`;
  
  if (isGoldProduct && rates && product.weightVal > 0) {
    const is18K = product.purity.toLowerCase().includes('18k') || product.purity.toLowerCase().includes('18 karat');
    const goldRatePerGram = is18K ? rates.rate18K : rates.rate22K;
    const rawValue = product.weightVal * goldRatePerGram;
    const makingCharges = rawValue * 0.12;
    const gstValue = (rawValue + makingCharges) * 0.03;
    const estimatedTotalPrice = Math.round(rawValue + makingCharges + gstValue);
    
    displayPrice = estimatedTotalPrice > 0 ? `₹ ${estimatedTotalPrice.toLocaleString('en-IN')}` : 'Call for Price';
    
    const dynamicWhatsAppMessage = encodeURIComponent(
      `Hi Dhar Jewellery House! I am interested in the ${product.name} (SKU: ${product.sku}) priced dynamically at ${displayPrice} based on live gold rates. Could you please share more details or schedule an in-store viewing?`
    );
    dynamicWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${dynamicWhatsAppMessage}`;
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl overflow-hidden border border-[#e9e3e0] transition-all duration-500 transform hover:-translate-y-1.5 flex flex-col">
      
      {/* Product Image Holder */}
      <Link 
        to={`/product/${product.id}`} 
        className="block w-full relative overflow-hidden aspect-square bg-[#fff7e7] zoom-container border-b border-[#e9e3e0]/40 flex-shrink-0 flex items-center justify-center p-6"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-md transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Diamond/Gold Purity Label Floating */}
        <div className="absolute top-3.5 left-3.5 bg-[#3b3330]/90 backdrop-blur-sm text-[#f3e5ab] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
          {product.metalType}
        </div>

        {/* Certified Seal overlay */}
        {product.hallmarked && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-brand-gold text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border border-brand-gold/40 shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
            BIS Hallmarked
          </div>
        )}
        
        <div className="absolute inset-0 bg-brand-dark-red/0 group-hover:bg-brand-dark-red/[0.03] transition-all duration-500"></div>
      </Link>
      
      {/* Product Information Body */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="space-y-1">
          {/* Category Tag */}
          <p className="text-[10px] tracking-[0.2em] font-extrabold text-brand-gold uppercase">
            {product.category}
          </p>
          
          {/* Title */}
          <h3 className="text-[15px] sm:text-base font-serif font-bold text-text-body tracking-wide line-clamp-1 group-hover:text-brand-red transition-colors duration-300">
            <Link to={`/product/${product.id}`} title={product.name}>
              {product.name}
            </Link>
          </h3>

          {/* Purity & Weight metrics */}
          <div className="flex items-center gap-2 text-[11px] text-text-body/70 font-medium">
            <span>{product.purity.split('(')[0]}</span>
            <span>•</span>
            <span>{product.weight}</span>
          </div>
        </div>

        {/* Pricing & CTA Action */}
        <div className="mt-2.5">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[10px] text-text-body/50 uppercase tracking-wider font-semibold">Estimated Price</span>
            <p className="text-lg sm:text-lg font-serif font-extrabold text-brand-rust tracking-tight">
              {displayPrice}
            </p>
          </div>
          
          {/* whatsapp button */}
          {/* <a 
            href={dynamicWhatsAppUrl} 
            target="_blank" 
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 px-4 rounded-xl text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] transform"
          >
            <WhatsappLogo size={18} weight="fill" />
            <span>WhatsApp Inquiry</span>
          </a> */}
        </div>
      </div>
    </div>
  );
}
