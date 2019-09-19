import mutations from './store/event.mutations'
import * as getters from './store/event.getters'
import * as actions from './store/event.actions'

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
