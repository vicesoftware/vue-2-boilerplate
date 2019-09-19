import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/modules/user.js'
import event from '@/modules/event'
import * as BusyIndicator from '@/ui/BusyIndicator'
import * as notification from '@/modules/notification.js'

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
