import * as types from './event.mutationTypes'
import EventService from '@/services/EventService.js'
import request from '@/modules/data/request'

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

export const fetchEvents = ({ commit, dispatch }, { perPage, page }) =>
  request('/events?_limit=' + perPage + '&_page=' + page, {
    commit,
    dispatch,
    actionType: types.GET_EVENTS_RECEIVED,
    errorMessage: 'Unable to fetch events',
    onResponse: r =>
      commit(types.SET_EVENTS_TOTAL, parseInt(r.headers.map['x-total-count']))
  })

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
