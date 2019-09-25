import * as types from './event.mutationTypes'

export default {
  [types.CREATE_EVENT_RECEIVED](state, event) {
    state.events.push(event)
  },
  [types.GET_EVENTS_RECEIVED](state, events) {
    state.events = events
  },
  [types.SET_EVENTS_TOTAL](state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  [types.SET_EVENT](state, event) {
    state.event = event
  },
  [types.GET_EVENT_RECEIVED](state, event) {
    state.event = event
  }
}
