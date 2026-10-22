import { Plan } from './types';
import { parsePlan } from './planMapping';

export function getPlanFromSearchParams(searchParams: URLSearchParams): Plan | undefined {
  return parsePlan(searchParams.get('plan'));
}

export function createSearchParams(plan?: Plan): URLSearchParams {
  const params = new URLSearchParams();

  if (plan) {
    params.set('plan', plan);
  }

  return params;
}

export function getPlanFromURL(): Plan | undefined {
  if (typeof window === 'undefined') return undefined;

  const urlParams = new URLSearchParams(window.location.search);
  return getPlanFromSearchParams(urlParams);
}

export function updateURLParams(plan?: Plan): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  const params = createSearchParams(plan);

  url.search = params.toString();
  window.history.replaceState({}, '', url.toString());
}
