// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css'
import './style/index.scss';
const app = createApp(App)
import mgjUI from '@/components'
app.use(router)
app.use(mgjUI)

app.mount('#app')
