import { mount, createLocalVue } from '@vue/test-utils'
import store from '@/store'
import router from '@/router'
import { mockFetch } from '@/__mocks__/cross-fetch'
import VueRouter from 'vue-router'
import EventList from '@/views/EventList.vue'
import App from '@/App.vue'
import fetch from 'cross-fetch' // needed for module mocking with jest.mock below

jest.mock('cross-fetch')

export default function mountApp(done, { getEventsResponse } = {}) {
  if (!done) {
    throw Error('done is required!')
  }

  try {
    mockFetch([
      {
        url: 'events',
        response: getEventsResponse || (() => [])
      }
    ])

    const localVue = createLocalVue()

    localVue.use(VueRouter)

    const wrapper = mount(App, {
      router,
      localVue,
      store
    })

    expect(wrapper.isVueInstance()).toBeTruthy()

    expect(wrapper.is(App)).toBeTruthy()

    expect(wrapper.find(EventList)).toBeTruthy()

    return Promise.resolve({ wrapper, store })
  } catch (e) {
    done.fail(e)
  }
}
