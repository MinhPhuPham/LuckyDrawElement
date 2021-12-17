<template>
  <a-row>
    <a-col class="dashboard__left" :xs="0" :sm="0" :md="6" :lg="6" :xl="6">
      <ms-user-info></ms-user-info>
      <a-button block type="primary" size="large">
        <template #icon>
          <AppstoreAddOutlined />
        </template>
        <strong class="pl-1">Create miracle</strong>
      </a-button>
    </a-col>
    <a-col class="dashboard__right" :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
      <ms-config-miracle />
      <a-result title="You don't have any miracle items. Let's create new!">
        <template #extra>
          <a-button key="console" type="primary">
            <strong>Create Now</strong>
          </a-button>
        </template>
      </a-result>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Row, Col, Result } from 'ant-design-vue'
import { AppstoreAddOutlined } from '@ant-design/icons-vue'

import UserInfo from '@/components/dashboard/left-board/UserInfo.vue'
import ConfigureMiracle from '@/components/dashboard/right-board/ConfigureMiracle.vue'
@Options({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Result.name]: Result,
    [UserInfo.name]: UserInfo,
    [ConfigureMiracle.name]: ConfigureMiracle,
    AppstoreAddOutlined,
  },
  name: 'ms-dashboard',
})
export default class DashBoard extends Vue {}
</script>
