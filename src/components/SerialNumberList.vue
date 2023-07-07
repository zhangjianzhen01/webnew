<template>
  <div>
    <el-form class="search-form">
      <el-form-item label="序列号查询" class="search-item">
        <el-input v-model="materialCode" placeholder="请输入生产物料编码" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item class="search-item">
        <el-button type="primary" @click="getSerialNumbers">查询</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-card class="result-card" v-if="serialNumbers.length > 0">
      <div class="card-header">
        <span class="card-title">查询结果:</span>
        <el-button type="text" size="default" @click="copySerialNumbers">一键复制</el-button>
      </div>
      <div class="serial-numbers-container">
        <div class="serial-number-row" v-for="(serialNumberGroup, index) in serialNumberGroups" :key="index">
          <div class="serial-number-group">
            <div class="serial-number-box" v-for="(serialNumber, innerIndex) in serialNumberGroup" :key="innerIndex">{{ serialNumber }}</div>
          </div>
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
      materialCode: '',
      serialNumbers: [],
    };
  },
  computed: {
    serialNumberGroups() {
      const size = 8; // 每行显示的序列号个数
      const groups = [];
      for (let i = 0; i < this.serialNumbers.length; i += size) {
        groups.push(this.serialNumbers.slice(i, i + size));
      }
      return groups;
    },
  },
  methods: {
    async getSerialNumbers() {
      if (!this.materialCode) {
        ElMessage.warning('请先输入生产物料编码');
        return;
      }

      try {
        const materialCodeWithSlash = this.materialCode + '/';
        const response = await fetch(`http://localhost:8000/api/cx/${materialCodeWithSlash}`);
        const data = await response.json();
        this.serialNumbers = data.serialNumbers;
        if (this.serialNumbers.length === 0) {
          ElMessage.info('未找到相关序列号');
        }
      } catch (error) {
        console.error(error);
        ElMessage.error('查询失败');
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
      ElMessage.success('序列号已复制到剪贴板');
    },
  },
};
</script>

<style scoped>
.search-form {
  margin-bottom: 20px;
}

.search-item {
  margin-right: 20px;
}

.result-card {
  margin-top: 20px;
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
  margin-top: 10px;
}

.serial-number-row {
  margin-bottom: 5px;
}

.serial-number-group {
  display: flex;
}

.serial-number-box {
  border: 1px solid #ccc;
  padding: 10px;
  flex-grow: 1;
  text-align: center;
  background-color: #f5faff;
  color: #409eff;
  margin-right: 5px;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>