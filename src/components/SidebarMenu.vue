<template>
  <el-menu
      class="sidebar-menu"
      :default-active="defaultActive"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      :unique-opened="uniqueOpened"
      router
  >
    <slot></slot>
  </el-menu>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarMenu",
  props: {
    defaultActive: {
      type: String,
      default: "1",
    },
    backgroundColor: {
      type: String,
      default: "#212121",
    },
    textColor: {
      type: String,
      default: "#fff",
    },
    activeTextColor: {
      type: String,
      default: "#ffffff",
    },
    uniqueOpened: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.sidebar-menu {
  width: 240px;
  height: 100vh;
  background-color: #354b5b;
}
</style>