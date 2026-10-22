import { useSearchParams, useNavigate } from 'react-router';
import { useCallback } from 'react';
import { Plan } from './types';
import { getPlanFromSearchParams, createSearchParams } from './urlUtils';

export interface UseUrlParamsResult {
  currentPlan: Plan | undefined;
  updatePlan: (plan: Plan | undefined) => void;
  clearAll: () => void;
}

export function useUrlParams(): UseUrlParamsResult {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPlan = getPlanFromSearchParams(searchParams);

  const updatePlan = useCallback(
    (plan: Plan | undefined): void => {
      const newParams = createSearchParams(plan);
      navigate({ search: newParams.toString() }, { replace: true });
    },
    [navigate],
  );

  const clearAll = useCallback((): void => {
    navigate({ search: '' }, { replace: true });
  }, [navigate]);

  return { currentPlan, updatePlan, clearAll };
}
