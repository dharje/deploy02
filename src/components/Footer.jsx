import { Link } from "react-router-dom";
import {
  WhatsappLogo,
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
  PinterestLogo,
  Phone,
  Envelope,
  MapPin,
  Clock,
} from "@phosphor-icons/react";
import ReviewScroll from "./ReviewScroll";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <ReviewScroll />
      <footer className="bg-[#3b3330] text-[#fff6ed] pt-16 pb-8 border-t-4 border-brand-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand Legacy & Trust Pledge */}
          <div className="space-y-6">
            <div>
              <img
                src="/images/logo/LOGO_06.webp"
                alt="Dhar Jewellery Logo"
                className="h-25 object-contain"
              />
              <div className="w-16 h-[1.5px] bg-brand-gold mt-4"></div>
            </div>

            <p className="text-xs text-[#fff6ed]/80 leading-relaxed font-light">
              Crafting purity and trust since 1976. Dhar Jewellery House has
              curated timeless traditional gold, contemporary diamonds, and
              elegant silver jewelry for over four decades, celebrating your
              most precious memories.
            </p>

            {/* Social Icons */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                Follow Us
              </p>
              <div className="flex gap-3 text-cream">
                <a
                  href="https://www.facebook.com/DharJewelleryHouse/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-yellow-400 p-1.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookLogo size={18} weight="fill" />
                </a>
                <a
                  href="https://www.instagram.com/dhar.jewelleryhouse"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-yellow-400 p-1.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramLogo size={18} weight="fill" />
                </a>
                <a
                  href="https://www.youtube.com/@sudipdhar009"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-yellow-400 p-1.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="YouTube"
                >
                  <YoutubeLogo size={18} weight="fill" />
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-yellow-400 p-1.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Pinterest"
                >
                  <PinterestLogo size={18} weight="fill" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links / Jewellery Categories */}
          <div>
            <h4 className="font-serif text-sm font-extrabold uppercase tracking-widest text-brand-gold mb-6 border-b border-white/10 pb-2">
              Jewellery Categories
            </h4>
            <ul className="space-y-3.5 text-xs text-[#fff6ed]/85 font-light">
              <li>
                <Link
                  to="/#collections"
                  className="hover:text-yellow-300 hover:pl-1 transition-all duration-300 flex items-center gap-1.5"
                >
                  <span className="text-brand-gold font-bold">›</span> Gold
                  Necklaces & Chokers
                </Link>
              </li>
              <li>
                <Link
                  to="/#collections"
                  className="hover:text-yellow-300 hover:pl-1 transition-all duration-300 flex items-center gap-1.5"
                >
                  <span className="text-brand-gold font-bold">›</span> Diamond
                  Wedding Bands
                </Link>
              </li>
              <li>
                <Link
                  to="/#collections"
                  className="hover:text-yellow-300 hover:pl-1 transition-all duration-300 flex items-center gap-1.5"
                >
                  <span className="text-brand-gold font-bold">›</span> Antique
                  Gold Jhumkas
                </Link>
              </li>
              <li>
                <Link
                  to="/#collections"
                  className="hover:text-yellow-300 hover:pl-1 transition-all duration-300 flex items-center gap-1.5"
                >
                  <span className="text-brand-gold font-bold">›</span> Bridal
                  Maang Tikkas
                </Link>
              </li>
              <li>
                <Link
                  to="/#collections"
                  className="hover:text-yellow-300 hover:pl-1 transition-all duration-300 flex items-center gap-1.5"
                >
                  <span className="text-brand-gold font-bold">›</span> 925 Pure
                  Silver Essence
                </Link>
              </li>
              <li>
                <Link
                  to="/#collections"
                  className="hover:text-yellow-300 hover:pl-1 transition-all duration-300 flex items-center gap-1.5"
                >
                  <span className="text-brand-gold font-bold">›</span>{" "}
                  Investment Gold Coins
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Services / Purity Verification */}
          <div>
            <h4 className="font-serif text-sm font-extrabold uppercase tracking-widest text-brand-gold mb-6 border-b border-white/10 pb-2">
              Our Purity Assurance
            </h4>
            <div className="space-y-4">
              <p className="text-[11px] text-[#fff6ed]/80 leading-normal font-light">
                We guarantee 100% authenticity on all our jewelry pieces. Verify
                your hallmark unique HUID identifier via the official Bureau of
                Indian Standards (BIS) Portal.
              </p>

              {/* Trust Badge Vector Seal */}
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                <svg
                  className="w-10 h-10 text-yellow-400 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L3 7v9c0 5.52 4.48 10 9 10s9-4.48 9-10V7l-9-5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="rgba(253,154,82,0.05)"
                  />
                  <path
                    d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                    fill="currentColor"
                  />
                </svg>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold text-yellow-400 uppercase tracking-wide">
                    BIS Hallmarked 916
                  </p>
                  <p className="text-[9px] text-[#fff6ed]/70 font-medium">
                    Government Approved Purity Standards
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#fff6ed]/85 font-light">
                <li>
                  <Link to="/#collections" className="hover:text-yellow-300">
                    Book an In-Store Consultation
                  </Link>
                </li>
                <li>
                  <Link to="/#collections" className="hover:text-yellow-300">
                    Lifetime Exchange & Buyback Policy
                  </Link>
                </li>
                <li>
                  <Link to="/#collections" className="hover:text-yellow-300">
                    Return & Refund Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Contact details & Showroom Info */}
          <div>
            <h4 className="font-serif text-sm font-extrabold uppercase tracking-widest text-brand-gold mb-6 border-b border-white/10 pb-2">
              Primary Showroom
            </h4>
            <ul className="space-y-3.5 text-xs text-[#fff6ed]/85 font-light">
              <li className="flex gap-2.5 items-start">
                <MapPin
                  size={18}
                  className="text-brand-gold flex-shrink-0 mt-0.5"
                />
                <span className="leading-normal">
                  <strong>Dhar Jewellery House</strong>
                  <br />
                  99B Beliaghata Main Road, Joramandir,
                  <br />
                  Beleghata, West Bengal - 700010
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <span className="text-brand-gold flex-shrink-0">GSTIN:</span>
                <span>19AAOFD7314A1ZL</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone size={16} className="text-brand-gold flex-shrink-0" />
                <span>+91 98368 18376 / +91 98302 93358</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Envelope size={16} className="text-brand-gold flex-shrink-0" />
                <a
                  href="mailto:contact@dharjewelleryhouse.in"
                  className="hover:text-yellow-300"
                >
                  dharjewelleryweb@gmail.com
                </a>
              </li>
              <li className="flex gap-2.5 items-start">
                <Clock
                  size={16}
                  className="text-brand-gold flex-shrink-0 mt-0.5"
                />
                <span className="leading-normal text-[#fff6ed]/80">
                  Monday to Saturday: (Sunday Closed)
                  <br />
                  11:00 AM - 3:00 PM 
                  <br/>
                  5:30 PM - 10:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-12"></div>

        {/* Brand Trust Icons Row */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 opacity-80 mb-8 text-[11px] font-medium uppercase tracking-widest text-[#fff6ed]/90 text-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
            <span>100% Insured Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
            <span>7-Day Easy Exchange</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
            <span>Lifetime Valuation Seal</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
            <span>Government Verified HUID</span>
          </div>
        </div>

        {/* Location Map */}
        <div id="footer-map" className="w-full h-64 sm:h-[300px] mb-8 rounded-xl overflow-hidden border border-white/10 shadow-lg scroll-mt-32">
          <iframe 
            src="https://www.google.com/maps?q=Dhar+Jewellery+House,+99B+Beliaghata+Main+Road,+Joramandir,+Beleghata,+West+Bengal&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Dhar Jewellery House Location"
            className="grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </div>

        {/* Bottom copyright bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#fff6ed]/60 border-t border-white/5 pt-6 text-center sm:text-left gap-4 font-light">
          <p>
            &copy; {currentYear} Dhar Jewellery House. All rights reserved.
            Crafting trust and purity with Indian artistry.
          </p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
