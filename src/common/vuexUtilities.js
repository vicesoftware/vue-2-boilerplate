export const buildActionsTypes = (actions, moduleName) =>
  Object.keys(actions).reduce((acc, cur) => {
    acc[cur] = `${moduleName}/${cur}`
    return acc
  }, {})
