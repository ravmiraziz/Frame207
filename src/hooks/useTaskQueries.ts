import { useQuery } from '@tanstack/react-query';
import { fetchAssignees, fetchThemes, fetchTags, fetchPeriodicities } from '../api/mock';

export const useAssignees = (query: string, isTeam: boolean) => {
  return useQuery({
    queryKey: ['assignees', query, isTeam],
    queryFn: () => fetchAssignees(query, isTeam),
  });
};

export const useThemes = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });
};

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });
};

export const usePeriodicities = () => {
  return useQuery({
    queryKey: ['periodicities'],
    queryFn: fetchPeriodicities,
  });
};
