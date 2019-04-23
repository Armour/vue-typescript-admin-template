<template>
  <div class="tab-container">
    <el-tag>mounted times ：{{ createdTimes }}</el-tag>
    <el-alert
      :closable="false"
      style="width:200px; display:inline-block; vertical-align:middle; margin-left:30px;"
      title="Tab with keep-alive"
      type="success"
    />
    <el-tabs
      v-model="activeName"
      style="margin-top:15px"
      type="border-card"
    >
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
        <keep-alive>
          <tab-pane
            v-if="activeName === item.key"
            :type="item.key"
            @create="showCreatedTimes"
          />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TabPane from './components/TabPane.vue'

@Component({
  components: {
    TabPane
  }
})
export default class Tab extends Vue {
  private tabMapOptions = [
    { label: 'China', key: 'CN' },
    { label: 'USA', key: 'US' },
    { label: 'Japan', key: 'JP' },
    { label: 'Eurozone', key: 'EU' }
  ]
  private activeName = 'CN'
  private createdTimes = 0

  private showCreatedTimes() {
    this.createdTimes = this.createdTimes + 1
  }
}
</script>

<style lang="scss" scoped>
.tab-container {
  margin: 30px;
}
</style>
