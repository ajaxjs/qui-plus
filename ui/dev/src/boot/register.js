import { boot } from 'quasar/wrappers'
import VuePlugin from 'ui' // "ui" is aliased in quasar.conf.js

import LanmuBox from 'src/components/LanmuBox.vue'

export default boot(({ app }) => {
  app.component('LanmuBox', LanmuBox);
  app.use(VuePlugin)
})
