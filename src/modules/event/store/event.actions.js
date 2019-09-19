import * as types from './event.mutationTypes'
import request from '@/common/request'

export const createEvent = ({ commit, dispatch }, event) =>
  request({
    url: '/events',
    commit,
    dispatch,
    httpMethod: 'post',
    body: event,
    actionType: types.CREATE_EVENT_RECEIVED,
    successMessage: 'Your event has been created!',
    errorMessage: 'Unable to fetch events',
    onResponse: r => commit(types.SET_EVENT, event)
  })

export const fetchEvents = ({ commit, dispatch }, { perPage, page }) =>
  request({
    url: '/events?_limit=' + perPage + '&_page=' + page,
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

    return Promise.resolve() // we return promises to allow upstream chaining
  } else {
    return request({
      url: `/events/${id}`,
      commit,
      dispatch,
      actionType: types.GET_EVENT_RECEIVED,
      errorMessage: `Unable to fetch event ${id}`,
      mapResponse: r => (r ? {} : r[0])
    })
  }
}
