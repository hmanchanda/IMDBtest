import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import axios from 'axios'
import VueAxios from 'vue-axios'
import quasarUserOptions from './quasar-user-options'
const app = createApp(App)
app.use(VueAxios, axios)
app.use(Quasar, quasarUserOptions)
app.mount('#app')
//app.config.globalProperties.axios=axios
