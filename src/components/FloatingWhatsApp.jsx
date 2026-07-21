import { WhatsappLogo } from '@phosphor-icons/react';

export default function FloatingWhatsApp() {
  const whatsappNumber = "919836818376"; // Use the provided primary WhatsApp number
  const defaultMessage = encodeURIComponent("Hi Dhar Jewellery House! I'm browsing your website and would like some assistance.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:bg-[#128C7E] hover:scale-110 hover:-translate-y-1 transition-all duration-300 group"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsappLogo size={32} weight="fill" />
      
      {/* Tooltip on Hover */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#3b3330] text-cream text-[11px] font-medium tracking-wide rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
        Chat with us!
        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-[#3b3330]"></div>
      </div>
      
      {/* Pulse ring effect */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75 pointer-events-none"></span>
    </a>
  );
}
