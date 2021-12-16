import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css'
import i18n from './plugins/i18n'
import routerPlugin from './plugins/router'
import { message, Modal, notification, Button } from 'ant-design-vue'
import firebaseHelper from './helpers/firebase'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

const firebase = new firebaseHelper()
firebase.setup()

app.config.globalProperties.$message = message
app.config.globalProperties.$confirm = Modal.confirm
app.config.globalProperties.$notification = notification

app.use(router).use(routerPlugin).use(store).use(i18n).use(Button).mount('#app')
