import { dynamic } from '@redocly/theme';

import { ConfigIntroduction } from './components/config/Introduction/Introduction';
import { ConfigSection } from './components/config/Section/Section';
import { ConfigProperty } from './components/config/Property/Property';
import { ConfigOptionRequirements } from './components/config/OptionRequirements/OptionRequirements';
import { AiAssistantPlayground } from './components/AiAssistantPlayground/AiAssistantPlayground';

// Only the icons page uses it, so its code loads only on that page.
const ThemeIcon = dynamic(() =>
  import('./components/ThemeIcon/ThemeIcon').then((module) => module.ThemeIcon),
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
