import { useBusinessSettings } from './useBusinessSettings';

export function useWhatsAppContact() {
  const { data: settings } = useBusinessSettings();

  const openWhatsApp = (message: string = '') => {
    const number = settings?.whatsappNumber ?? '919588046569';
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${number}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
    window.open(url, '_blank');
  };

  return { openWhatsApp, whatsappNumber: settings?.whatsappNumber ?? '919588046569' };
}
