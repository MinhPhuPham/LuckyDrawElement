<template>
  <div class="flex flex-column items-center justify-center w-full h-100h">
    <a-spin size="large" />
    <div class="wave-text">
      <span v-for="text in loadingTexts" :key="text">{{ text === ' ' ? '&nbsp;' : text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Spin } from 'ant-design-vue'
@Options({
  components: {
    [Spin.name]: Spin,
  },
  name: 'ms-loader',
})
export default class FullPageLoader extends Vue {
  loadingTexts = 'Please wait...'
}
</script>

<style lang="scss" scoped>
$offset: -0.8rem;
$count: 15;
$duration: 0.45;

@keyframes wave {
  from {
    transform: translateY(0);
    color: white;
  }
  to {
    transform: translateY($offset);
  }
}

.wave-text {
  margin-top: 2.5rem;
  text-align: center;
}

.wave-text span {
  display: inline-block;
  font-family: 'Fredoka One', sans-serif;
  font-size: 2rem;

  animation-duration: #{$duration}s;
  animation-name: wave;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@for $i from 0 to $count {
  .wave-text :nth-child(#{$count}n + #{$i}) {
    animation-delay: -#{calc(($count - $i) * 1.8 * $duration / $count)}s;

    color: rgba(100 + $i * 20 % 155, 10, 100 + $i * 40 % 55, 1);
  }
}
</style>
