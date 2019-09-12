import * as myActions from './busyIndicator.actions'

const MODULE_NAME = 'busyIndicator'

const buildActionsTypes = (actions, moduleName) =>
  Object.keys(actions).reduce((acc, cur) => {
    acc[cur] = `${moduleName}/${cur}`
    return acc
  }, {})

const types = buildActionsTypes(myActions, MODULE_NAME)

export default types
