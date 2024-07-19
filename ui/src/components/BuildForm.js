import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'BuildForm',

  setup () {
    return () => h(QBadge, {
      class: 'BuildForm',
      label: 'BuildForm'
    })
  }
}
