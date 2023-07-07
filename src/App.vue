<template>
  <div class="main-container">
    <div class="left-container">
      <ChainGrowthList/>
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

{
  flex: 3; /* 右侧容器占据2份宽度 */
}
</style>

<script>
import ChainGrowthList from '@/components/ChainGrowthList.vue';

export default {
  components: {
    ChainGrowthList,
  },
};
</script>