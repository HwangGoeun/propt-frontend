import { useQuery } from '@tanstack/react-query';

import { templateApi } from '@/lib/api/template';

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: templateApi.findAll,
  });
}

