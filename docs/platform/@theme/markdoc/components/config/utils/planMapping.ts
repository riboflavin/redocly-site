import { Plan } from './types';

export const ORDERED_PLANS: Plan[] = [Plan.COMMUNITY, Plan.PRO, Plan.SCALE, Plan.ENTERPRISE];

/**
 * Retired plan names that may still appear in front matter or in a `?plan=` URL,
 * mapped to the plan that replaced them. The front matter is the source of truth;
 * this is only a fallback so a stale value renders as a current plan.
 */
export const LEGACY_PLAN_TO_CURRENT: Record<string, Plan> = {
  'Enterprise+': Plan.ENTERPRISE,
  'Enterprise Plus': Plan.ENTERPRISE,
};

export function isPlan(value: unknown): value is Plan {
  return typeof value === 'string' && (Object.values(Plan) as string[]).includes(value);
}

/** Accepts current and retired plan names; returns `undefined` for anything else. */
export function parsePlan(value: string | null | undefined): Plan | undefined {
  if (!value) return undefined;
  if (isPlan(value)) return value;
  return LEGACY_PLAN_TO_CURRENT[value];
}

/**
 * Normalizes a page's `plans:` list: retired names map to their current plan,
 * duplicates collapse, and the result is in ladder order. Unknown values keep
 * their spelling at the end so nothing disappears.
 */
export function toCurrentPlans(plans: ReadonlyArray<string> | undefined): string[] {
  if (!Array.isArray(plans)) return [];
  const mapped = Array.from(new Set(plans.map((plan) => parsePlan(plan) ?? plan)));
  const order = ORDERED_PLANS as string[];
  return mapped.sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    return (ai === -1 ? order.length : ai) - (bi === -1 ? order.length : bi);
  });
}
