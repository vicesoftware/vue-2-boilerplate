// This file will be used instead of the cross-fetch module in jest envionrment
import get from 'lodash/get'

let _stubConfig
let _calls

const buildFetchErrorResponse = (data, status) =>
  Promise.resolve({
    ok: false,
    status: status || 400,
    headers: {
      get: () => null,
      map: {
        'content-type': ''
      }
    },
    json: () => Promise.resolve(data)
  })

const buildFetchResponse = data =>
  Promise.resolve({
    ok: {},
    headers: {
      get: () => null,
      map: {
        'content-type': ''
      }
    },
    json: () => Promise.resolve(data)
  })

const mockFetch = (stubConfig, { calls } = {}) => {
  const isntAnArray = arg =>
    arg && (!(typeof arg === 'object') || arg.length === undefined)

  if (!stubConfig || isntAnArray(stubConfig) || !stubConfig.length) {
    throw new Error(
      'stubConfig is required and must be a non-empty array and each array element must be an object that contain at least a "url" and a "response" property.'
    )
  }

  if (isntAnArray(calls)) {
    throw new Error('calls must be an array.')
  }

  _stubConfig = stubConfig
  _calls = calls

  _stubConfig.sort((a, b) => {
    const aIsArray = !!a.reduce
    const bIsArray = !!b.reduce

    if (!aIsArray === bIsArray) {
      return 0
    }

    if (aIsArray) {
      return -1
    }

    return 1
  })

  const NOT_FOUND = -1
  if (
    !_stubConfig.length ||
    _stubConfig.findIndex(
      c =>
        !c.url ||
        (!c.response && typeof c.response === 'function') ||
        (!c.errorResponse && typeof c.errorResponse === 'function')
    ) > NOT_FOUND
  ) {
    throw new Error(
      'You must specify at least one config as part of the stubConfig argument and each config must have a valid format. Example: [{url:"/foo", response: fooResponseGetter}]'
    )
  }

  if (calls) {
    calls.get = function(url, method) {
      return _calls.find(
        c =>
          ((!c.config.method && (!method || method.toLowerCase() === 'get')) ||
            (c.config.method &&
              c.config.method.toLowerCase() === method.toLowerCase())) &&
          c.url.includes(url)
      )
    }

    calls.expect = function(url, method) {
      expect(!!_calls.get(url, method)).toBeTruthy()
    }

    calls.getBody = function(url, method) {
      const call = _calls.get(url, method)

      const body = get(call, 'config.body')

      return body && JSON.parse(body)
    }
  }
}

const fetch = (url, config) => {
  if (!_stubConfig) {
    throw new Error(
      `An unexpected call to fetch was made. 
Call detials-----
url: ${url},
config: ${JSON.stringify(config)}
      
To fix this error-----
"stubConfig" parameter is required by "__mocks__/cross-fetch.js" and hasn't been configured! 
Please use "mockFetch(stubConfig)" method in "__mocks__\\cross-fetch.js" module to configure expected calls to 
fetch by your code under test. Note that any unexpected calls will throw. 
Example config:
import fetch from "cross-fetch";
import { mockFetch } from "../../__mocks__/cross-fetch.js";
it("configures mockFetch(), () => {
    mockFetch([{
        url: "/foo",
        response: () => dummyFooResponse
    }]);
});
See readme for full details.
`
    )
  }
  let foundUrl

  const isGetOrDefault = stubUrlConfig =>
    !stubUrlConfig.method || stubUrlConfig.method.toLowerCase() === 'get'

  const stubMethodMatchesConfig = (stubUrlConfig, curConfig) =>
    stubUrlConfig.method &&
    curConfig.method &&
    curConfig.method.toLowerCase() === stubUrlConfig.method.toLowerCase()

  const methodIsGetOrMethodsMatch = (stubUrlConfig, curConfig) =>
    isGetOrDefault(stubUrlConfig) ||
    stubMethodMatchesConfig(stubUrlConfig, curConfig)

  const urlIncludesFragments = (url, fragments) => {
    if (fragments.reduce) {
      return fragments.reduce((acc, cur) => {
        if (!acc) {
          return acc
        }
        return url.includes(cur)
      }, true)
    }

    return url.includes(fragments)
  }

  foundUrl = _stubConfig.find(
    stubUrlConfig =>
      methodIsGetOrMethodsMatch(stubUrlConfig, config) &&
      urlIncludesFragments(url, stubUrlConfig.url)
  )

  if (foundUrl) {
    if (_calls && _calls.length !== undefined) {
      _calls.push({
        url,
        config
      })
    }

    const NOT_FOUND = 404

    if (foundUrl.errorResponse) {
      return buildFetchErrorResponse(foundUrl.response(), foundUrl.statusCode)
    } else if (foundUrl.redirect && foundUrl.statusCode === NOT_FOUND) {
      return Promise.resolve(foundUrl.response())
    } else if (foundUrl.response && typeof foundUrl.response === 'function') {
      return buildFetchResponse(foundUrl.response())
    } else {
      throw new Error(
        `There was no valid response function provided. You must provide either a response function or an errorResponse function. foundUrl: ${JSON.stringify(
          foundUrl
        )}`
      )
    }
  }

  throw new Error(
    `There was an unexpected ajax call. Details follow...
      url: ${url}
      method: ${config.method || 'GET'}
      config: ${JSON.stringify(config)}.
      _stubConfig: ${JSON.stringify(_stubConfig)}`
  )
}

export { mockFetch }

export default fetch
