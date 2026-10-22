export const ConfigOptionRequirementsTag = {
  render: 'ConfigOptionRequirements',
  attributes: {
    // Accepted for the intranet docs, which share this tag schema; the component ignores it.
    products: { type: Array, required: false },
    plans: { type: Array, required: false },
  },
  selfClosing: true,
};
