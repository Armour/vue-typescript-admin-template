<template>
  <Card :state="state">
    <Form :state="state.form" />
  </Card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormPageState from './FormPageState'
import Card from '@/admin/common/Card/index.vue'
import Form from '@/admin/common/Form/index.vue'

@Component({
  name: 'FromPage',
  components: {
    Form,
    Card
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:FormPageState;
}
</script>
