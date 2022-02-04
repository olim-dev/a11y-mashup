export const linePluginNew = {
  info: {
      name: "line-plugin",
      type: "component-definition"
  },
  fn: ({ layout, keys }) => {
  const componentDefinition = {
      type: "line",
      key: keys.COMPONENT.LINE,
      settings: {
      layers: { curve: "monotone", line: { strokeWidth: 3 } }
      }
  };
  return componentDefinition;
  }
};
