import EventCard from '@/modules/event/EventCard.vue'
import mountApp from '@/tests/mountApp'

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

function getExpectedCards() {
  return [
    {
      event: {
        attendees: [
          { id: 'abc123', name: 'Adam Jahr' },
          { id: 'def456', name: 'Gregg Pollack' },
          { id: 'ghi789', name: 'Beth Swanson' },
          { id: 'jkl101', name: 'Mary Gordon' }
        ],
        category: 'sustainability',
        date: 'Aug 28 2018',
        description: "Let's clean up this beach.",
        id: 1,
        location: 'Daytona Beach',
        organizer: 'Adam Jahr',
        time: '10:00',
        title: 'Beach Cleanup'
      }
    },
    {
      event: {
        attendees: [
          { id: 'ghi789', name: 'Beth Swanson' },
          { id: 'jkl101', name: 'Mary Gordon' }
        ],
        category: 'nature',
        date: 'Nov 12 2018',
        description: "We're going to clean up this park.",
        id: 2,
        location: '132 N Magnolia Street, Orlando, Florida',
        organizer: 'Adam Jahr',
        time: '12:00',
        title: 'Park Cleanup'
      }
    },
    {
      event: {
        attendees: [
          { id: 'abc123', name: 'Adam Jahr' },
          { id: 'ghi789', name: 'Beth Swanson' },
          { id: 'jkl101', name: 'Mary Gordon' }
        ],
        category: 'animal welfare',
        date: 'Dec 2 2018',
        description: 'Help animals find new homes.',
        id: 3,
        location: '132 N Magnolia Street, Orlando, Florida',
        organizer: 'Gregg Pollack',
        time: '12:00',
        title: 'Pet Adoption Day'
      }
    }
  ]
}

function getEventsResponse() {
  return [
    {
      id: 1,
      title: 'Beach Cleanup',
      date: 'Aug 28 2018',
      time: '10:00',
      location: 'Daytona Beach',
      description: "Let's clean up this beach.",
      organizer: 'Adam Jahr',
      category: 'sustainability',
      attendees: [
        {
          id: 'abc123',
          name: 'Adam Jahr'
        },
        {
          id: 'def456',
          name: 'Gregg Pollack'
        },
        {
          id: 'ghi789',
          name: 'Beth Swanson'
        },
        {
          id: 'jkl101',
          name: 'Mary Gordon'
        }
      ]
    },
    {
      id: 2,
      title: 'Park Cleanup',
      date: 'Nov 12 2018',
      time: '12:00',
      location: '132 N Magnolia Street, Orlando, Florida',
      description: "We're going to clean up this park.",
      organizer: 'Adam Jahr',
      category: 'nature',
      attendees: [
        {
          id: 'ghi789',
          name: 'Beth Swanson'
        },
        {
          id: 'jkl101',
          name: 'Mary Gordon'
        }
      ]
    },
    {
      id: 3,
      title: 'Pet Adoption Day',
      date: 'Dec 2 2018',
      time: '12:00',
      location: '132 N Magnolia Street, Orlando, Florida',
      description: 'Help animals find new homes.',
      organizer: 'Gregg Pollack',
      category: 'animal welfare',
      attendees: [
        {
          id: 'abc123',
          name: 'Adam Jahr'
        },
        {
          id: 'ghi789',
          name: 'Beth Swanson'
        },
        {
          id: 'jkl101',
          name: 'Mary Gordon'
        }
      ]
    }
  ]
}
