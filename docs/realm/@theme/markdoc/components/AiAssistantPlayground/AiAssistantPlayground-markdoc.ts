import type { Schema } from '@markdoc/markdoc';

import { COLOR_MODES } from './constants';

export const AiAssistantPlaygroundTag: Schema = {
  render: 'AiAssistantPlayground',
  selfClosing: true,
  attributes: {
    apiUrl: {
      type: String,
      required: false,
    },
    colorMode: {
      type: String,
      required: false,
      matches: [...COLOR_MODES],
    },
  },
};
