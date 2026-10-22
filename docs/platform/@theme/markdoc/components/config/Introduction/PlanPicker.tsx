import * as React from 'react';
import { SelectPicker, SelectOption } from './SelectPicker';
import { Plan } from '../utils/types';
import { ORDERED_PLANS } from '../utils/planMapping';

export interface PlanPickerProps {
  value?: Plan;
  onPlanChange?: (plan: Plan) => void;
  className?: string;
}

export function PlanPicker({
  value,
  onPlanChange,
  className,
}: PlanPickerProps): React.ReactElement {
  const planOptions: SelectOption<Plan>[] = ORDERED_PLANS.map((plan) => ({
    value: plan,
    label: plan,
  }));

  return (
    <SelectPicker
      options={planOptions}
      value={value}
      placeholder="Select a plan"
      onValueChange={(plan) => onPlanChange?.(Array.isArray(plan) ? plan[0] : plan)}
      className={className}
    />
  );
}
