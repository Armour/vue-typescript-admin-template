<template>
  <div
    class="card-background"
    @click="clickHandler"
  >
    <div
      class="card-panel"
      :style="{'--color': state.color}"
    >
      <div class="card-panel-icon-wrapper icon-color">
        <svg-icon
          :name="state.icon"
          class="card-panel-icon"
        />
      </div>
      <div class="card-panel-description">
        <div class="card-panel-text">
          {{ state.title }}
        </div>
        <count-to
          :start-val="0"
          :end-val="state.number"
          :duration="1000"
          class="card-panel-num"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CountTo from 'vue-count-to'
import CardPanelState from './CardPanelState'

@Component({
  name: 'CardPanel',
  components: {
    CountTo
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:CardPanelState;

  private clickHandler() {
    // if (this.state.action) { (this.$store as ArkfbpStore).runAction(this.state.action) }
  }
}
</script>

<style lang="scss" scoped>
.card-background{
  cursor: pointer;
  background-color: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  border-color: rgba(0, 0, 0, .05);
  overflow: hidden;

  &:hover {
    .card-panel-icon-wrapper {
      color: #fff;
    }
    .icon-color {
        background: var(--color);
    }
  }
}
.card-panel {
  width: 250px;
  height: 150px;
  font-size: 12px;

  color: #666;

  position: relative;
  top: 50%; /*偏移*/
  transform: translateY(-50%);
  margin: 0 auto;

  .icon-color {
    color: var(--color);
  }

  .card-panel-icon-wrapper {
    float: left;
    // margin: 14px 0 0 14px;
    margin: 0 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;

    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);
  }

  .card-panel-icon {
    float: left;
    font-size: 48px;

  }

  .card-panel-description {
    float: right;
    font-weight: bold;
    margin-right: 26px;
    margin-left: 0px;

    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);

    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      margin-bottom: 12px;
    }

    .card-panel-num {
      font-size: 20px;
    }
  }
}
</style>
