import mutations from './busyIndicator.mutations'
import * as getters from './busyIndicator.getters'
import * as actions from './busyIndicator.actions'
import actionTypes from './busyIndicator.actionTypes'

const state = {
  count: 0
}

const namespaced = true

export default {
  state,
  namespaced,
  mutations,
  getters,
  actions,
  actionTypes
}
