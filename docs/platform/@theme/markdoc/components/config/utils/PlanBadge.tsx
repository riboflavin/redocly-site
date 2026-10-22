import * as React from 'react';
import styled from 'styled-components';
import { Plan } from './types';
import Badge from './Badge';

const PLAN_ICONS: Partial<Record<string, React.ReactNode>> = {
  [Plan.PRO]: (
    <>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
  [Plan.SCALE]: (
    <>
      <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
      <path d="m7 16.5-4.74-2.85" />
      <path d="m7 16.5 5-3" />
      <path d="M7 16.5v5.17" />
      <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
      <path d="m17 16.5-5-3" />
      <path d="m17 16.5 4.74-2.85" />
      <path d="M17 16.5v5.17" />
      <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
      <path d="M12 8 7.26 5.15" />
      <path d="m12 8 4.74-2.85" />
      <path d="M12 13.5V8" />
    </>
  ),
  [Plan.ENTERPRISE]: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      <path d="M8 6h.01" />
      <path d="M12 6h.01" />
      <path d="M16 6h.01" />
      <path d="M8 10h.01" />
      <path d="M12 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
    </>
  ),
};

type PlanColors = { stroke: string; bg: string; border: string };

const PLAN_COLORS: Partial<Record<string, PlanColors>> = {
  [Plan.PRO]: {
    stroke: 'var(--color-persian-green-8)',
    bg: 'var(--color-persian-green-2)',
    border: 'var(--color-persian-green-5)',
  },
  [Plan.SCALE]: {
    stroke: 'var(--color-purple-7)',
    bg: 'var(--color-purple-2)',
    border: 'var(--color-purple-4)',
  },
  [Plan.ENTERPRISE]: {
    stroke: 'var(--color-blue-6)',
    bg: 'var(--color-blue-2)',
    border: 'var(--color-blue-4)',
  },
};

const IconBox = styled.span<{ $colors: PlanColors }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex: none;
  border-radius: 4px;
  color: ${({ $colors }) => $colors.stroke};
  background-color: ${({ $colors }) => $colors.bg};
`;

const Icon = styled.svg`
  width: 12px;
  height: 12px;
`;

const IconBadge = styled(Badge)<{ $colors: PlanColors }>`
  padding-left: 3px;
  border-color: ${({ $colors }) => $colors.border};
`;

/** The plan name with its tinted icon (Pro, Scale, Enterprise); other names render as plain text. */
export const PlanBadge = ({ plan }: { plan: string }): React.ReactElement => {
  const icon = PLAN_ICONS[plan];
  if (!icon) return <Badge>{plan}</Badge>;
  const colors = PLAN_COLORS[plan];
  if (!colors) return <Badge>{plan}</Badge>;
  return (
    <IconBadge $colors={colors}>
      <IconBox $colors={colors}>
        <Icon
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {icon}
        </Icon>
      </IconBox>
      {plan}
    </IconBadge>
  );
};

export default PlanBadge;
