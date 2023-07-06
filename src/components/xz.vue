<template>
  <div>
    <label for="selectOption">选择操作：</label>
    <select id="selectOption" v-model="selectedOption">
      <option v-for="option in options" :value="option.dj_id" :key="option.dj_id">{{ option.label }}</option>
    </select>
    <button @click="handleSubmit">提交</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewOrderSelect",
  data() {
    return {
      options: [
        {label: '新建采购订单', dj_id: 1},
        {label: '新建资金平台', dj_id: 2},
        {label: '新建销售订单', dj_id: 3}
      ],
      selectedOption: null
    };
  },
  methods: {
    handleSubmit() {
      // 构建要发送给后端的数据
      const body = {dj_id: this.selectedOption};

      // 向后端发送请求，这里使用了axios作为示例
      axios.post('http://localhost:8000/api/xz', body)
          .then(response => {
            // 处理响应
            console.log(response.data);
          })
          .catch(error => {
            // 处理错误
            console.error(error);
          });
    }
  }
};
</script>