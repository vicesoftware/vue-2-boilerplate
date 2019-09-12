import mutations from './busyIndicator.mutations'
import * as getters from './busyIndicator.getters'
import * as actions from './busyIndicator.actions'
import components from './components'

const MODULE_NAME = 'busyIndicator'

const state = {
  count: 0
}

const buildActionsTypes = (actions, moduleName) =>
  Object.keys(actions).reduce((acc, cur) => {
    acc[cur] = `${moduleName}/${cur}`
    return acc
  }, {})

const namespaced = true

export default {
  store: {
    state,
    namespaced,
    mutations,
    getters,
    actions
  },
  components,
  actionTypes: buildActionsTypes(actions, MODULE_NAME)
}
