import * as types from './busyIndicator.mutationTypes'

export default {
  [types.INCREMENT](state) {
    state.count = state.count + 1
  },
  [types.DECREMENT](state) {
    state.count = state.count - 1
  }
}
