import * as React from 'react';
import styled from 'styled-components';
import { Plan } from '../utils/types';
import PlanBadge from '../utils/PlanBadge';
import { toCurrentPlans } from '../utils/planMapping';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: var(--layer-color);
  border: 1px solid var(--border-color-secondary);
  border-radius: var(--border-radius-lg);
  padding: 8px 16px;
  margin-bottom: 1em;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const Separator = styled.span`
  width: 1px;
  height: 20px;
  background-color: var(--border-color-primary);
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  line-height: var(--line-height-base);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  box-sizing: border-box;
  color: var(--text-color-secondary);
`;

export interface OptionRequirementsProps {
  plans?: Plan[];
}

const ConfigOptionRequirements = ({ plans = [] }: OptionRequirementsProps): React.ReactElement => {
  const currentPlans = React.useMemo(() => toCurrentPlans(plans), [plans]);
  const renderPlans = currentPlans.length > 0;

  if (!renderPlans) {
    return <Container />;
  }

  return (
    <Container>
      <Row>
        <Label>Plans:</Label>
        {currentPlans.map((pl, index) => (
          <React.Fragment key={`plan-${pl}`}>
            {index > 0 && pl !== Plan.COMMUNITY && currentPlans[index - 1] === Plan.COMMUNITY && (
              <Separator aria-hidden="true" />
            )}
            <PlanBadge plan={pl} />
          </React.Fragment>
        ))}
      </Row>
    </Container>
  );
};

export { ConfigOptionRequirements };
