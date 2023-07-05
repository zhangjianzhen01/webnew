<template>
  <div>
    <h1>查询功能</h1>
    <SerialNumberList/>
  </div>
</template>

<script>
import SerialNumberList from '@/components/SerialNumberList.vue';

export default {
  components: {
    SerialNumberList,
  },
};
</script>