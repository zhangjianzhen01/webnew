<template>
  <div class="container">
    <el-select v-model="selectedOption" placeholder="选择操作" class="select-option">
      <el-option v-for="option in options" :key="option.id" :label="option.label" :value="option.id"></el-option>
    </el-select>
    <div class="button-container">
      <el-button type="primary" @click="handleSubmit" class="submit-button">提交</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ElSelect, ElOption, ElButton, ElMessage} from 'element-plus';

export default {
  name: "NewOrderSelect",
  components: {
    ElSelect,
    ElOption,
    ElButton
  },
  data() {
    return {
      options: [
        {label: '新建采购订单', id: 1},
        {label: '新建资金平台', id: 2},
        {label: '新建销售订单', id: 3},
        {label: '新建客户', id: 4}
      ],
      selectedOption: null
    };
  },
  methods: {
    handleSubmit() {
      const body = {id: this.selectedOption};
      axios.post('http://127.0.0.1:9000/api/xz', body)
          .then(response => {
            console.log(response.data);
            this.showSuccessMessage(response.data);
          })
          .catch(error => {
            console.error(error);
            this.showErrorMessage();
          });
    },
    showSuccessMessage(message) {
      const msg = message.message || ''; // 获取消息内容，如果返回的是对象，则取对象的 "message" 属性
      ElMessage.success(msg);
    },
    showErrorMessage() {
      ElMessage.error('操作失败');
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-end;
}

.select-option {
  width: 200px;
}

.button-container {
  margin-left: 20px;
}

.submit-button {
  margin-top: 10px;
}
</style>