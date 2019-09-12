import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'
import event from '@/store/modules/event'
import busyIndicator from '@/store/modules/busyIndicator'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    busyIndicator,
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
