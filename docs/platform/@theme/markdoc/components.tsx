import { dynamic } from '@redocly/theme';

import { ConfigIntroduction } from './components/config/Introduction/Introduction';
import { ConfigSection } from './components/config/Section/Section';
import { ConfigProperty } from './components/config/Property/Property';
import { ConfigOptionRequirements } from './components/config/OptionRequirements/OptionRequirements';

// Only the icons page uses it, so its code loads only on that page.
const ThemeIcon = dynamic(() =>
  import('./components/ThemeIcon/ThemeIcon').then((module) => module.ThemeIcon),
);

// Only the AI assistant web component page uses it, so its code loads only on that page.
const AiAssistantPlayground = dynamic(() =>
  import('./components/AiAssistantPlayground/AiAssistantPlayground').then(
    (module) => module.AiAssistantPlayground,
  ),
);

export { ThemeIcon };
export { ConfigIntroduction };
export { ConfigSection };
export { ConfigProperty };
export { ConfigOptionRequirements };
export { AiAssistantPlayground };

const components = {
  ThemeIcon,
  ConfigIntroduction,
  ConfigSection,
  ConfigProperty,
  ConfigOptionRequirements,
  AiAssistantPlayground,
};

export default components;
