import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/Store/user.js'
import event from '@/Store/Event'
import * as BusyIndicator from '@/Store/BusyIndicator'
import * as notification from '@/Store/notification.js'

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
