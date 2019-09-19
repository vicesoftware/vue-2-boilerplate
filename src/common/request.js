import fetch from 'cross-fetch'
import { actionTypes } from '@/ui/BusyIndicator'

const request = ({
  url,
  httpMethod = 'get',
  httpConfig,
  commit,
  dispatch,
  body,
  actionType,
  mapResponse,
  errorMessage,
  successMessage,
  onResponse // handle response before streaming body via response.json
} = {}) => {
  const requiredError = arg =>
    `You must specify a ${arg} argument when calling request({ ${arg} })`

  if (!url) {
    throw new Error(requiredError('url'))
  }

  if (!commit) {
    throw new Error(requiredError('commit'))
  }

  if (!dispatch) {
    throw new Error(requiredError('dispatch'))
  }

  if (mapResponse && typeof mapResponse !== 'function') {
    throw new Error('mapResponse must be a string')
  }

  httpConfig = {
    method: httpMethod,
    ...httpConfig,
    ...buildHeaders(httpConfig)
  }

  if (body) {
    if (!httpConfig) {
      httpConfig = {}
    }

    httpConfig.body = JSON.stringify(body)
  }

  dispatch(actionTypes.increment, { actionType }, { root: true })

  return fetch(url, httpConfig)
    .then(response => {
      if (onResponse) {
        onResponse(response)
      }

      if (successMessage) {
        dispatch('notification/add', successMessage, { root: true })
      }

      return response.json()
    })
    .then(body => {
      if (mapResponse) {
        body = mapResponse(body)
      }

      commit(actionType, body)

      dispatch(actionTypes.decrement, { action: actionType }, { root: true })
    })
    .catch(error => {
      console.log(
        `Request error ${error}. We need to do something more interesting with these.`
      )

      dispatch(actionTypes.decrement, { action: actionType }, { root: true })

      dispatch('notification/add', errorMessage, { root: true })
    })
}

function buildHeaders(httpConfig) {
  const defaultHeadersObj = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  return httpConfig
    ? {
        headers: {
          ...defaultHeadersObj.headers,
          ...httpConfig.headers
        }
      }
    : defaultHeadersObj
}

export default request
