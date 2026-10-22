import * as React from 'react';
import styled from 'styled-components';
import { Plan } from '../utils/types';
import { toCurrentPlans } from '../utils/planMapping';
import { useUrlParams } from '../utils/useUrlParams';
import { ArrowUpRightIcon } from '@redocly/theme';
import { Tooltip } from '@redocly/theme/components/Tooltip/Tooltip';

import Badge from '../utils/Badge';
import PlanBadge from '../utils/PlanBadge';

interface PropertyConditionProps {
  plans?: Plan[];
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const MoreBadge = styled(Badge)`
  border-color: var(--border-color-secondary);
  cursor: help;
`;

const UpgradeBadge = styled(Badge)`
  border-color: var(--border-color-secondary);
  background-color: var(--button-bg-color-secondary);
  cursor: help;
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    display: block;
  }
`;

type ComputedVisibility = {
  allItems: string[];
  visibleItems: string[];
  remainingCount: number;
  showUpgradeBadge: boolean;
};

const MAX_VISIBLE_ITEMS = 3;

const computeVisibility = (plans: string[], currentPlan: Plan | undefined): ComputedVisibility => {
  const plansProvided: boolean = Array.isArray(plans) && plans.length > 0;
  const hasCurrentPlan: boolean = typeof currentPlan !== 'undefined' && currentPlan !== null;

  const showUpgradeBadge: boolean =
    hasCurrentPlan && plansProvided && !plans.includes(currentPlan as Plan);

  // Badge display logic: only show descriptive badges when the user hasn't filtered/selected
  const shouldShowPlanBadges: boolean = !hasCurrentPlan && plansProvided && !showUpgradeBadge;

  const allItems: string[] = shouldShowPlanBadges ? plans : [];

  const visibleItems: string[] = allItems.slice(0, MAX_VISIBLE_ITEMS);
  const remainingCount: number = Math.max(0, allItems.length - MAX_VISIBLE_ITEMS);

  return { allItems, visibleItems, remainingCount, showUpgradeBadge };
};

const PropertyCondition = ({ plans = [] }: PropertyConditionProps): React.ReactElement => {
  const { currentPlan } = useUrlParams();
  const currentPlans = React.useMemo(() => toCurrentPlans(plans), [plans]);

  const { allItems, visibleItems, remainingCount, showUpgradeBadge } =
    React.useMemo<ComputedVisibility>(
      (): ComputedVisibility => computeVisibility(currentPlans, currentPlan),
      [currentPlans, currentPlan],
    );

  return (
    <Container>
      {visibleItems.map((item) => (
        <PlanBadge key={`plan-${item}`} plan={item} />
      ))}
      {showUpgradeBadge && (
        <Tooltip
          tip={'This option is available on a higher plan.'}
          children={
            <UpgradeBadge>
              Upgrade
              <ArrowUpRightIcon size={'14px'} />
            </UpgradeBadge>
          }
        />
      )}
      {remainingCount > 0 && (
        <Tooltip
          tip={allItems.join(', ')}
          children={<MoreBadge>+{remainingCount} more</MoreBadge>}
        />
      )}
    </Container>
  );
};

export default PropertyCondition;
