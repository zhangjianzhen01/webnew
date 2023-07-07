<template>
  <div>
    <!-- 使用 el-table 组件显示表格数据 -->
    <el-table :data="items" style="width: 100%">
      <!-- 添加备注列 -->
      <el-table-column label="备注" prop="remark">
        <!-- 使用 v-slot 指令获取作用域对象 -->
        <template v-slot="scope">
          <!-- 在作用域中渲染 el-input 组件来绑定备注数据 -->
          <el-input v-model="scope.row.remark" size="small"></el-input>
        </template>
      </el-table-column>
      <!-- 添加 Q1 列 -->
      <el-table-column label="Q1季度" prop="q1">
        <template v-slot="scope">
          <el-input v-model="scope.row.q1" size="small"></el-input>
        </template>
      </el-table-column>
      <!-- 添加 Q2 列 -->
      <el-table-column label="Q2季度" prop="q2">
        <template v-slot="scope">
          <el-input v-model="scope.row.q2" size="small"></el-input>
        </template>
      </el-table-column>
      <!-- 添加删除按钮列 -->
      <el-table-column label="操作">
        <template v-slot="scope">
          <!-- 使用作用域索引来获取对应的数据项索引 -->
          <el-button type="danger" size="small" @click="removeItem(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
      <!-- 添加结果列 -->
      <el-table-column label="结果">
        <template v-slot="scope">
          <!-- 使用作用域索引来获取对应的结果 -->
          <span v-if="results[scope.$index]">{{ results[scope.$index] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" native-type="button" @click="submitForm">计算</el-button>
        <el-button type="primary" native-type="button" @click="addItem">添加</el-button>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [{remark: '', q1: '', q2: ''}],
      results: [],
    };
  },
  methods: {
    submitForm() {
      // 验证表单数据
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.q1.trim() === '' || item.q2.trim() === '') {
          this.$message.warning(`第 ${i + 1} 行不能为空`);
          return; // 如果 q1 或 q2 为空，则停止表单提交
        }
      }

      // 发送请求计算结果
      const requestData = {
        items: this.items,
      };

      axios
          .post('http://localhost:8000/api/hb', requestData)
          .then((response) => {
            const results = response.data.results;
            if (results) {
              this.results = results.map((result) => `环比增长：${result.result}`);
            }
          })
          .catch((error) => {
            console.error(error);
          });
    },
    addItem() {
      // 添加新行数据
      this.items.push({remark: '', q1: '', q2: ''});
    },
    removeItem(index) {
      // 删除指定索引的数据项
      this.items.splice(index, 1);
    },
  },
};
</script>