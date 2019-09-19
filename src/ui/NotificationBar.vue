<template>
  <div v-if="notifications && notifications.message" class="error-msg">
    <i class="fa fa-times-circle"></i>
    {{ notifications.message }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notifications: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  // mounted() {
  //   this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  // },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: mapActions('notification', ['remove'])
}
</script>

<style scoped>
.info-msg,
.success-msg,
.warning-msg,
.error-msg {
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
}
.error-msg {
  color: #d8000c;
  background-color: #ffbaba;
}
</style>
