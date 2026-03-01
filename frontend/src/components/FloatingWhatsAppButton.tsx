import { MessageCircle } from 'lucide-react';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';

export default function FloatingWhatsAppButton() {
  const { openWhatsApp } = useWhatsAppContact();

  return (
    <button
      onClick={() => openWhatsApp('Hello! I would like to know more about your services.')}
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      {/* Animated ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
    </button>
  );
}
