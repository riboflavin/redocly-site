import type { Schema } from '@markdoc/markdoc';

export const ConfigIntroductionTag: Schema = {
  render: 'ConfigIntroduction',
  selfClosing: true,
  attributes: {
    title: {
      type: String,
      default: 'Filter configuration options',
    },
    description: {
      type: String,
      default:
        'Choose your plan to see only the configuration options available to you. Select a plan below to get started.',
    },
    passedPlan: {
      type: String,
      default: undefined,
    },
  },
};
