import * as types from './event.mutationTypes'
import EventService from '@/services/EventService.js'
import busyIndicator from '@/modules/ui/busyIndicator'

const { actionTypes } = busyIndicator

export const createEvent = ({ commit, dispatch }, event) => {
  return EventService.postEvent(event)
    .then(() => {
      commit(types.ADD_EVENT, event)
      const notification = {
        type: 'success',
        message: 'Your event has been created!'
      }
      dispatch('notification/add', notification, { root: true })
    })
    .catch(error => {
      const notification = {
        type: 'error',
        message: 'There was a problem creating your event: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
      throw error
    })
}

export const fetchEvents = ({ commit, dispatch }, { perPage, page }) => {
  dispatch(
    actionTypes.increment,
    { action: types.GET_EVENTS_RECEIVED },
    { root: true }
  )

  EventService.getEvents(perPage, page)
    .then(response => {
      commit(
        types.SET_EVENTS_TOTAL,
        parseInt(response.headers['x-total-count'])
      )
      commit(types.GET_EVENTS_RECEIVED, response.data)
      dispatch(
        actionTypes.decrement,
        { action: types.GET_EVENTS_RECEIVED },
        { root: true }
      )
    })
    .catch(error => {
      const notification = {
        type: 'error',
        message: 'There was a problem fetching events: ' + error.message
      }
      commit(actionTypes.decrement, {
        error,
        action: types.GET_EVENTS_RECEIVED
      })
      dispatch('notification/add', notification, { root: true })
    })
}

export const fetchEvent = ({ commit, getters, dispatch }, id) => {
  var event = getters.getEventById(id)

  if (event) {
    commit(types.SET_EVENT, event)
  } else {
    EventService.getEvent(id)
      .then(response => {
        commit(types.SET_EVENT, response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
