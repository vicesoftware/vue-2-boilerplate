import { expectBySelector } from '@/tests/expect'
import waitFor from '@/tests/waitFor'
import EventCreate from '@/views/EventCreate.vue'

export const navigateToEventCreate = waitFor(({ wrapper, router }) => {
  router.push({ name: 'event-create' })
  expectBySelector(wrapper, EventCreate)
})
