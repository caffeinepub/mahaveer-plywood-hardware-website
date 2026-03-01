import { useBusinessSettings } from './useBusinessSettings';

export function useWhatsAppContact() {
  const { data: settings, isLoading } = useBusinessSettings();

  const openWhatsApp = (message: string) => {
    const whatsappNumber = settings?.whatsappNumber || '';
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return {
    whatsappNumber: settings?.whatsappNumber || '',
    openWhatsApp,
    isLoading,
  };
}
