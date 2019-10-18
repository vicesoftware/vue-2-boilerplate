import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/user.js'
import event from '@/store/event'
import * as BusyIndicator from '@/store/busyIndicator'
import * as notification from '@/store/notification.js'

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
