export const namespaced = true

export const state = {
  notifications: {}
}

let nextId = 1

export const mutations = {
  PUSH(state, notification) {
    state.notifications = {
      message: notification,
      type: 'error',
      id: nextId++
    }
  },
  DELETE(state, notificationToRemove) {
    // state.notifications = state.notifications.filter(
    //   notification => notification.id !== notificationToRemove.id
    // )

    state.notifications = {}
  }
}
export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  }
}
