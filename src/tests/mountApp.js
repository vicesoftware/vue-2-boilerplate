import { mount, createLocalVue } from '@vue/test-utils'
import waitForExpect from 'wait-for-expect'
import EventCard from '@/modules/event/EventCard.vue'
import store from '@/store'
import router from '@/router'
import { mockFetch } from '@/__mocks__/cross-fetch'
import VueRouter from 'vue-router'
import EventList from '@/views/EventList.vue'
import App from '@/layout/App.vue'
import { expectBySelector } from '@/tests/expect'
import fetch from 'cross-fetch' // needed for module mocking with jest.mock below

jest.mock('cross-fetch')

export default function mountApp(done, { getEventsResponse } = {}) {
  return new Promise(async resolve => {
    if (!done) {
      throw Error('done is required!')
    }

    const response = getEventsResponse || (() => [])

    try {
      mockFetch([
        {
          url: 'events',
          response
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

      expectBySelector(wrapper, EventList)

      await waitForExpect(() => {
        const eventCards = wrapper.findAll(EventCard)

        expect(eventCards.length).toBe(response().length)
      })

      resolve({ wrapper, store, router })
    } catch (e) {
      done.fail(e)
    }
  })
}
