import { useBusinessSettings } from './useBusinessSettings';

export function useWhatsAppTemplates() {
  const { data: settings, isLoading } = useBusinessSettings();

  const replacePlaceholders = (template: string, data: Record<string, string>): string => {
    let result = template;
    Object.entries(data).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      result = result.replace(new RegExp(placeholder, 'g'), value || '');
    });
    return result;
  };

  return {
    templates: settings
      ? {
          estimateMessageTemplate: settings.estimateMessageTemplate,
          contractorInquiryTemplate: settings.contractorInquiryTemplate,
          siteVisitTemplate: settings.siteVisitTemplate,
          productInquiryTemplate: settings.productInquiryTemplate,
          quoteBuilderTemplate: settings.quoteBuilderTemplate,
        }
      : null,
    replacePlaceholders,
    isLoading,
  };
}
