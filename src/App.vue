<template>
  <div class="app-container">
    <sidebar-menu>
      <el-menu-item index="1" @click="handleMenuItemClick(1)">
        <i class="el-icon-menu"></i>
        <span class="menu-text">环比增长计算</span>
      </el-menu-item>
      <el-menu-item index="2" @click="handleMenuItemClick(2)">
        <i class="el-icon-menu"></i>
        <span class="menu-text">序列号查询</span>
      </el-menu-item>
      <el-menu-item index="3" @click="handleMenuItemClick(3)">
        <i class="el-icon-menu"></i>
        <span class="menu-text">新建单据</span>
      </el-menu-item>
      <el-menu-item index="4" @click="handleMenuItemClick(4)">
        <i class="el-icon-menu"></i>
        <span class="menu-text">权限ID对比</span>
      </el-menu-item>
    </sidebar-menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import SidebarMenu from "./components/SidebarMenu.vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    SidebarMenu,
  },
  setup() {
    const router = useRouter();
//配置路由跳转
    const handleMenuItemClick = (index) => {
      if (index === 1) {
        router.push("js_hb");
      } else if (index === 2) {
        router.push("/cx_xlh");
      } else if (index === 3) {
        router.push("/Added");
      } else if (index === 4) {
        router.push("/cx_qx");
      }
    };

    return {
      handleMenuItemClick,
    };
  },
});
</script>

<style>
.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: 20px;
  width: 80%; /* 调整为适当的数值或百分比 */
}
</style>