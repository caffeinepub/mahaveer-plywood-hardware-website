import { useBusinessSettings } from './useBusinessSettings';

export function useWhatsAppTemplates() {
  const { data: settings } = useBusinessSettings();

  const templates = {
    estimate: settings?.estimateMessageTemplate ?? '',
    contractorInquiry: settings?.contractorInquiryTemplate ?? '',
    siteVisit: settings?.siteVisitTemplate ?? '',
    productInquiry: settings?.productInquiryTemplate ?? '',
    quoteBuilder: settings?.quoteBuilderTemplate ?? '',
  };

  const replacePlaceholders = (template: string, values: Record<string, string>): string => {
    let result = template;
    Object.entries(values).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value || 'N/A');
    });
    return result;
  };

  return { templates, replacePlaceholders };
}
