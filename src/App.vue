<template>
  <div>
    <!-- 使用 Element Plus Button 组件来美化按钮样式，并添加自定义的 class -->
    <el-button @click="goToChainGrowthList" type="primary" class="custom-button">环比增长计算</el-button>

    <el-button @click="goToSerialNumberList" type="success" class="custom-button">序列号查询</el-button>

    <el-button @click="goToNewOrderList" type="primary" class="custom-button">新建单据</el-button>

    <router-view></router-view>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const router = useRouter();

    // 跳转到 ChainGrowthList 组件
    const goToChainGrowthList = () => {
      router.push("/component-a");
    };

    // 跳转到 SerialNumberList 组件
    const goToSerialNumberList = () => {
      router.push("/component-b");
    };

    // 跳转到 NewOrderList 组件
    const goToNewOrderList = () => {
      router.push("/component-c");
    };

    return {
      goToChainGrowthList,
      goToSerialNumberList,
      goToNewOrderList
    };
  },
});
</script>

<style>
.custom-button {
  margin-bottom: 10px; /* 添加按钮之间的底部边距 */
}
</style>