<template>
  <div>
    <el-form class="search-form">
      <el-form-item label="序列号查询" class="search-item">
        <el-input
            v-model="materialCode"
            placeholder="请输入生产物料编码"
            style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item class="search-item">
        <el-button type="primary" @click="getSerialNumbers">查询</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-card class="result-card" v-if="serialNumbers.length > 0">
      <div class="card-header">
        <span class="card-title">查询结果:</span>
        <el-button type="text" size="mini" @click="copySerialNumbers">一键复制</el-button>
      </div>
      <div class="serial-numbers-container">
        <div class="serial-number-row" v-for="(serialNumber, index) in serialNumbers" :key="index">
          <div class="serial-number-box">{{ serialNumber }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ElButton, ElInput, ElCard, ElForm, ElFormItem, ElMessage } from 'element-plus';

export default {
  components: {
    ElButton,
    ElInput,
    ElCard,
    ElForm,
    ElFormItem,
  },
  data() {
    return {
      serialNumber: '',
      materialCode: '',
      serialNumbers: [],
    };
  },
  methods: {
    async getSerialNumbers() {
      try {
        const materialCodeWithSlash = this.materialCode + '/';
        const response = await fetch(`http://localhost:8000/api/cx/${materialCodeWithSlash}`);
        const data = await response.json();
        this.serialNumbers = data.serialNumbers;
      } catch (error) {
        console.error(error);
      }
    },
    resetForm() {
      this.materialCode = '';
      this.serialNumbers = [];
    },
    copySerialNumbers() {
      const el = document.createElement('textarea');
      el.value = this.serialNumbers.join('\n');
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      ElMessage.success('已复制序列号');
    },
  },
};
</script>

<style scoped>
.result-card {
  margin-top: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-weight: bold;
}

.serial-numbers-container {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  padding: 10px;
  gap: 10px;
}

.serial-number-row {
  display: flex;
}

.serial-number-box {
  border: 1px solid #ccc;
  padding: 8px;
  flex: 1;
  margin-bottom: 10px;
}

.search-form {
  display: flex;
}

.search-item {
  margin-right: 10px;
}
</style>
