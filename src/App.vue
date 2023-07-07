<template>
  <div class="main-container">
    <div class="left-container">
      <SerialNumberList/>
    </div>
    <div class="right-container">
      <NewOrderList/>
    </div>
  </div>
</template>

<style>
.main-container {
  display: flex; /* 展示为Flex布局 */
}

.left-container {
  flex: 1; /* 左侧容器占据1份宽度 */
  margin-right: 20px; /* 左侧容器与右侧容器之间的间距 */
}

.right-container {
  flex: 2; /* 右侧容器占据2份宽度 */
}
</style>

<script>
import SerialNumberList from '@/components/SerialNumberList.vue';
import NewOrderList from '@/components/NewOrderList.vue';

export default {
  components: {
    SerialNumberList,
    NewOrderList,
  },
};
</script>