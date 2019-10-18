import mutations from './event.mutations'
import * as getters from './event.getters'
import * as actions from './event.actions'

const state = {
  events: [],
  eventsTotal: 0,
  event: {}
}

const namespaced = true

export default {
  state,
  namespaced,
  mutations,
  getters,
  actions
}
