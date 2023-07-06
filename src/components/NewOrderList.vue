<template>
  <div class="container">
    <el-form>
      <el-form-item label="选择操作">
        <!-- 根据options数组动态生成下拉选项 -->
        <el-select v-model="selectedOption" placeholder="请选择操作">
          <el-option
              v-for="option in options"
              :key="option.id"
              :label="option.label"
              :value="option.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- 点击按钮触发handleSubmit方法 -->
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewOrderSelect',
  data() {
    return {
      options: [
        { label: '新建采购订单', id: 1 },
        { label: '新建资金平台', id: 2 },
        { label: '新建销售订单', id: 3 },
      ],
      selectedOption: null,
    };
  },
  methods: {
    async handleSubmit() {
      // 构建要发送给后端的数据
      const body = { id: this.selectedOption };

      try {
        // 向后端发送请求，这里使用了axios作为示例
        const response = await axios.post('http://localhost:8000/api/xz', body);

        // 根据不同的响应消息类型显示不同的提示消息
        if (response.data.message === '新建销售订单成功') {
          this.$message({
            message: response.data.message,
            type: 'success',
            showClose: true,
            duration: 3000,
          });
        } else {
          this.$message({
            message: response.data.message,
            showClose: true,
            duration: 3000,
          });
        }
      } catch (error) {
        // 处理错误
        console.error(error);
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>