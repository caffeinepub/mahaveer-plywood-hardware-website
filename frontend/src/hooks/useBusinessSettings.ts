import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BusinessSettings } from '../backend';

const DEFAULT_SETTINGS: BusinessSettings = {
  companyName: 'Mahaveer Plywood & Interiors',
  primaryPhone: '+91 95880 46569',
  secondaryPhone: '+91 95880 46569',
  email: 'info@mahaveerplywood.com',
  businessHours: 'Mon–Sat: 9:00 AM – 7:00 PM',
  address: 'Shop No. 12, Main Market, Pune, Maharashtra 411001',
  whatsappNumber: '919588046569',
  estimateMessageTemplate: `Hello Mahaveer Plywood & Interiors! 🏠

I would like a *Free Quick Estimate* for my project:

👤 *Name:* {{name}}
📞 *Phone:* {{phone}}
🏗️ *Project Type:* {{projectType}}
💰 *Budget:* {{budget}}
📐 *Area:* {{area}} sq ft

Please get back to me at your earliest convenience.

Thank you!`,
  contractorInquiryTemplate: `Hello Mahaveer Plywood & Interiors! 🔨

I am interested in your *Contractor Partnership Program*:

👤 *Name:* {{name}}
📞 *Phone:* {{phone}}
🏢 *Company:* {{company}}
🏗️ *Project Type:* {{projectType}}
💬 *Message:* {{message}}

Looking forward to discussing bulk pricing and partnership opportunities.`,
  siteVisitTemplate: `Hello Mahaveer Plywood & Interiors! 📅

I would like to *Book a Free Site Visit*:

👤 *Name:* {{name}}
📞 *Phone:* {{phone}}
📍 *Address:* {{address}}
📅 *Preferred Date:* {{date}}
⏰ *Preferred Time:* {{time}}
📝 *Notes:* {{notes}}

Please confirm the appointment. Thank you!`,
  productInquiryTemplate: `Hello Mahaveer Plywood & Interiors! 🛒

I am interested in the following products:

{{products}}

Please share pricing and availability details.

Thank you!`,
  quoteBuilderTemplate: `Hello Mahaveer Plywood & Interiors! 🏠

I would like a *Premium Interior Quote*:

🏠 *Rooms Selected:* {{rooms}}
⭐ *Quality Tier:* {{tier}}
💰 *Estimated Budget:* {{estimate}}

Please provide a detailed quotation.

Thank you!`,
};

export function useBusinessSettings() {
  const { actor, isFetching } = useActor();

  return useQuery<BusinessSettings>({
    queryKey: ['businessSettings'],
    queryFn: async () => {
      if (!actor) return DEFAULT_SETTINGS;
      const result = await actor.getBusinessSettings();
      return result ?? DEFAULT_SETTINGS;
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateBusinessSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: BusinessSettings) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateBusinessSettings(settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessSettings'] });
    },
  });
}
