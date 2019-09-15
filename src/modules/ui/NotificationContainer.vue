<template>
  <div>
    <NotificationBar :key="notifications.id" :notifications="notifications" />
  </div>
</template>

<script>
import NotificationBar from '@/modules/ui/NotificationBar.vue'
import { mapState } from 'vuex'

export default {
  components: {
    NotificationBar
  },
  computed: mapState('notification', ['notifications'])
}
</script>

<style scoped></style>
