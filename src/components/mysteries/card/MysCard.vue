<template>
  <div class="card-module" v-show="!emptyData">
    <div
      v-for="(item, index) of dataSource"
      :class="['img-box', { active: item.isShow }]"
      :key="index"
      @click="handleClick(index)"
      :data-id="index"
    >
      <div class="back">
        <a class="back_title">{{ $t('luckCard.no') }}{{ ++index }}</a>
        <img class="img-item" :src="item.url || require('@/assets/img/luck-card/project_card_bg.png')" />
      </div>
      <div class="front">
        <a class="title_item">{{ item.name }}</a>
        <a class="subtitle_item">{{ item.subtitle }}</a>

        <a class="id_item">*{{ item.key }}*</a>
        <img class="img-item" src="@/assets/img/luck-card/card_win_bg.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  components: {},
})
export default class MysCardComponent extends Vue {
  get emptyData() {
    return false
  }
}
</script>

<style lang="scss" scoped>
$cardHeight: 350px;

.card-module {
  margin: 2%;
  display: flex;
  flex-wrap: wrap;

  .img-box {
    flex-shrink: 0;
    width: 20%;
    height: $cardHeight;
    text-align: center;
    box-sizing: border-box;
    position: relative;

    .front {
      box-sizing: border-box;
      position: absolute;
      transform: rotateY(180deg);
      backface-visibility: hidden;
      transform-style: preserve-3d;
      border: 1px solid #e8e8e8;
      border-radius: 7px;

      .title_item {
        position: absolute;
        top: 35%;
        width: 100%;
        text-align: center;
        color: white;
        font-size: 27px;
        font-weight: bold;
      }

      .subtitle_item {
        position: absolute;
        top: 50%;
        width: 100%;
        text-align: center;
        color: whitesmoke;
        font-size: 15px;
      }

      .remark_item {
        position: absolute;
        top: 75%;
        left: 5%;
        width: 90%;
      }

      .id_item {
        position: absolute;
        bottom: 5px;
        right: 6%;
        width: 50%;
        text-align: right;
        background: none;
        color: orange;
        font-size: 10px;
      }

      .img-item {
        object-fit: cover;
      }
    }

    .back {
      background: none;
      box-sizing: border-box;
      position: absolute;
      transform: rotateY(0deg);
      backface-visibility: hidden;
      transform-style: preserve-3d;

      .img-item {
        object-fit: cover;
        border-radius: 7px;
      }

      .back_title {
        position: absolute;
        top: 15px;
        width: 100px;
        margin: 0 auto;
        text-align: center;
        color: #ff6c00;
        font-size: 20px;
        font-weight: bold;
      }
    }

    &.active {
      animation: mymove 0.5s forwards;
      -webkit-animation: mymove 0.5s forwards;

      .front {
        transform: rotateY(0deg);
        transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1);
      }

      .back {
        transform: rotateY(180deg);
        transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1);
      }
    }
  }
}
</style>
