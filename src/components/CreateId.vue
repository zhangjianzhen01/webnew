<template>
  <div>
    <el-input v-model="businessSn" placeholder="请输入business_sn"></el-input>
    <el-button @click="search">搜索</el-button>
    <div v-if="userId !== null"> 用户ID：{{ userId }}</div>
  </div>
</template>
<script> import {ref} from 'vue';
import {ElInput, ElButton} from 'element-plus';

export default {
  components: {ElInput, ElButton,}, setup() {
    const businessSn = ref('');
    const userId = ref(null);
    const search = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/wo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({business_sn: businessSn.value,}),
      });
      if (response.ok) {
        const data = await response.json();
        userId.value = data.create_id;
      } else {
        console.error('请求错误');
      }
    };
    return {businessSn, userId, search,};
  },
}; </script>
<style> /* 您可以在这里添加组件的样式 */ </style>