import Vue from 'vue'
import mountApp from '@/tests/mountApp'
import waitFor from '@/tests/waitFor'
import { expectByTestId } from '@/tests/expect'
import { navigateToEventCreate } from './EventCreate.behaviors'
import { mockFetch } from '@/__mocks__/cross-fetch'

describe('Given we load app and we navigate to the event-create page ', () => {
  test('Then we are shown events in EventCreate component', done => {
    Vue.config.errorHandler = done

    mountApp(done)
      .then(navigateToEventCreate)
      .then(
        waitFor(({ wrapper }) => {
          mockFetch([
            {
              url: 'events',
              method: 'post',
              body: {
                id: 4122507,
                user: { id: 'abc123', name: 'Adam' },
                category: '',
                organizer: { id: 'abc123', name: 'Adam' },
                title: 'sample title',
                description: '',
                location: '',
                date: '',
                time: '',
                attendees: []
              },
              response: () => []
            },
            {
              url: 'events',
              method: 'get',
              response: () => []
            }
          ])

          const titleTextBox = expectByTestId(wrapper, 'titleTextBox')

          titleTextBox.setValue('sample title')

          wrapper.find('form').trigger('submit.prevent')
        })
      )
      .then(() => done())
      .catch(done.fail)
  })
})