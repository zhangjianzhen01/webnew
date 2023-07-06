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
        <el-tag
            class="serial-number-box"
            effect="plain"
            size="medium"
            v-for="(serialNumber, index) in serialNumbers"
            :key="index"
        >
          {{ serialNumber }}
        </el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ElButton, ElInput, ElCard, ElForm, ElFormItem, ElMessage, ElTag } from 'element-plus';

export default {
  components: {
    ElButton,
    ElInput,
    ElCard,
    ElForm,
    ElFormItem,
    ElTag,
  },
  data() {
    return {
      serialNumber: '',
      materialCode: '',
      serialNumbers: [],
      itemsPerRow: 10, // 每行展示的序列号数量
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

<style>
.serial-numbers-container {
  display: flex;
  flex-wrap: wrap;
}

.serial-number-box {
  background-color: #e6f7ff;
  color: #1890ff;
  border-color: #1890ff;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  flex-basis: calc(100% / 10 - 10px); /* 设置每个序列号框的宽度 */
}

/* 其他自定义样式 */
</style>