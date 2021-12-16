import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.scss'

import { message, Modal, notification, Button } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import i18n from './plugins/i18n'
import routerPlugin from './plugins/router'
import './helpers/firebase'
import { database } from './helpers/firebase'

const app = createApp(App)

app.config.globalProperties.$message = message
app.config.globalProperties.$confirm = Modal.confirm
app.config.globalProperties.$notification = notification
app.config.globalProperties.$database = database

app.use(i18n).use(router).use(routerPlugin).use(store).use(Button).mount('#app')
