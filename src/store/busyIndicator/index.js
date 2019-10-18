import mutations from './busyIndicator.mutations'
import * as getters from './busyIndicator.getters'
import * as actions from './busyIndicator.actions'
import BusyIndicator from '@/components/BusyIndicator.vue'
import { buildActionsTypes } from '@/common/vuexUtilities'

const state = {
  count: 0
}

const namespaced = true

export default BusyIndicator

export const MODULE_NAME = 'busyIndicator'

export const store = {
  state,
  namespaced,
  mutations,
  getters,
  actions
}

export const actionTypes = buildActionsTypes(actions, MODULE_NAME)
