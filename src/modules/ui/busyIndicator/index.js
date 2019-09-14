import mutations from './store/busyIndicator.mutations'
import * as getters from './store/busyIndicator.getters'
import * as actions from './store/busyIndicator.actions'
import BusyIndicator from './BusyIndicator'
import { buildActionsTypes } from '@/modules/common/vuexUtilities'

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
