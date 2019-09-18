import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/features/user.js'
import event from '@/features/event'
import * as BusyIndicator from '@/ui/BusyIndicator'
import * as notification from '@/features/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    [BusyIndicator.MODULE_NAME]: BusyIndicator.store,
    notification
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  }
})
