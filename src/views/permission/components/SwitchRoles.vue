<template>
  <div>
    <div style="margin-bottom:15px;">
      {{ $t('permission.roles') }}： {{ roles }}
    </div>
    {{ $t('permission.switchRoles') }}：
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component
export default class SwitchRoles extends Vue {
  get roles() {
    return UserModule.roles
  }

  get switchRoles() {
    return this.roles[0]
  }

  set switchRoles(value: string) {
    UserModule.ChangeRoles(value).then(() => {
      this.$emit('change')
    })
  }
}
</script>
