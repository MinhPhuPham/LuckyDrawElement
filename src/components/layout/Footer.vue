<template>
  <a-divider orientation="center" class="bottom_line">
    <p style="color: lightgray; font-size: 12px; margin-top: 10px">
      © {{ currentYear }} Jable JohnSon, All Rights Reserved.
    </p>
  </a-divider>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import dayjs from 'dayjs'
import { Divider } from 'ant-design-vue'
@Options({
  components: { [Divider.name]: Divider },
  name: 'ms-footer',
})
export default class Login extends Vue {
  get currentYear() {
    return dayjs().year()
  }
}
</script>
