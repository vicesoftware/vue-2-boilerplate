import EventCard from '@/modules/event/EventCard.vue'
import mountApp from '@/tests/mountApp'
import { getEventsResponse, getExpectedCards } from './EventList.data'

describe('Given we load app and are on the event-list page ', () => {
  describe('When there are events on the server ', () => {
    test('Then we are shown events in EventCards with correct data', done => {
      mountApp(done, { getEventsResponse })
        .then(({ wrapper }) => {
          const eventCards = wrapper.findAll(EventCard)

          expect(eventCards.wrappers.map(e => ({ ...e.props() }))).toEqual(
            getExpectedCards()
          )
        })
        .then(() => done())
        .catch(done.fail)
    })
  })

  describe('When there are no events on the server ', () => {
    it('Then we get no EventCards displayed', done => {
      mountApp(done)
        .then(({ wrapper }) => {
          const eventCards = wrapper.findAll(EventCard)

          expect(eventCards.length).toBe(0)
        })
        .then(() => done())
        .catch(done.fail)
    })
  })
})
