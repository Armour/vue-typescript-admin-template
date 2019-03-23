<template>
  <div style="padding:30px;">
    <el-alert
      :closable="false"
      title="menu 1"
    >
      <transition
        name="fade-transform"
        mode="out-in"
      >
        <router-view />
      </transition>
    </el-alert>
  </div>
</template>

<script lang="ts">
export default {}
</script>
