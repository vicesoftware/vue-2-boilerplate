import * as types from './busyIndicator.mutationTypes'

export const increment = ({ commit }) => {
  commit(types.INCREMENT)
}

export const decrement = ({ commit }) => {
  commit(types.DECREMENT)
}
