import { notification } from 'ant-design-vue'
import { FrownOutlined, CheckCircleOutlined, NotificationTwoTone } from '@ant-design/icons-vue'
import { h } from 'vue'

export function errorNotification(title: string, description = '', error?: Error) {
  notification.open({
    message: title,
    description: description,
    icon: h(FrownOutlined, { style: 'color: red' }),
    placement: 'bottomRight',
  })

  if (error) {
    console.log(title, error)
  }
}

export function successNotification(title: string, description = '') {
  notification.open({
    message: title,
    description: description,
    icon: h(CheckCircleOutlined, { style: 'color: #108ee9' }),
  })
}

export function updateNotification(title: string, description = '', timeout = 6) {
  notification.open({
    message: title,
    description: description,
    icon: h(NotificationTwoTone, { style: 'color: #108ee9' }),
    duration: timeout,
  })
}
