import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { templateApi } from '@/lib/api/template';
import type { CreateTemplateDto } from '@/types/template';

export function useCreateTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: templateApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['templates'],
      });
    }
  });
}

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: templateApi.findAll,
  });
}

export function useTemplate(id: string) {
  return useQuery({
    queryKey: ['templates', id],
    queryFn: () => templateApi.findOneById(id),
    enabled: !!id,
  });
}

export function useUpdateTemplate(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: Partial<CreateTemplateDto>) => templateApi.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['templates', id],
      });
      queryClient.invalidateQueries({
        queryKey: ['templates'],
      });
    }
  });
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: templateApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['templates'],
      });
    },
  });
}
