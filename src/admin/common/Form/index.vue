<template>
  <el-form>
    <el-row
      v-for="item in state.items"
      :key="state.items.indexOf(item)"
      :gutter="20"
    >
      <el-col
        v-for="it in item"
        :key="item.indexOf(it)"
        :span="item.indexOf(it)%2 === 0?Math.floor(24/item.length):Math.ceil(24/item.length)"
      >
        <form-item :state="it" />
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormState from './FormState'
import FormItem from '../FromItem/index.vue'

@Component({
  name: 'Form',
  components: {
    FormItem
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:FormState;
}
</script>
