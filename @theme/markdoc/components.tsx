import { dynamic } from '@redocly/theme';

export { DocsOverview } from './components/DocsOverview';
export { HeroImage } from './components/HeroImage';
// The license lists are large and only the license pages show them.
export const LicensesTable = dynamic(() =>
  import('./components/LicensesTable').then((module) => module.LicensesTable),
);
export const LicensesPackageVersion = dynamic(() =>
  import('./components/LicensePackageVersion').then((module) => module.LicensesPackageVersion),
);
export { WideTileCards } from './components/WideTileCards';
export { Quiz } from '@redocly/marketing-pages/components/Quiz/Quiz.js';
export { TagBadge } from './components/TagBadge/TagBadge';
export { SplitView, LeftView, RightView } from './components/SplitView/SplitView';
export { GroupElements } from './components/GroupElements/GroupElements';
export * from '../../docs/realm/@theme/markdoc/components';
