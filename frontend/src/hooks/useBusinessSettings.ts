import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { BusinessSettings } from '@/backend';

export function useBusinessSettings() {
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<BusinessSettings | null>({
    queryKey: ['businessSettings'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBusinessSettings();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  const updateMutation = useMutation({
    mutationFn: async (settings: BusinessSettings) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBusinessSettings(settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessSettings'] });
    },
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
    updateSettings: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
