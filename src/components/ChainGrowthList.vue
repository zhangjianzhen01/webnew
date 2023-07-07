<template>
  <div>
    <el-form>
      <div v-for="(item, index) in items" :key="index">
        <el-row>
          <el-col :span="6">
            <el-form-item label="Q1:">
              <el-input :style="{ width: '200px' }" v-model="item.q1" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Q2:">
              <el-input :style="{ width: '200px' }" v-model="item.q2" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <div v-if="results[index]">
              <!-- 添加 "环比增长：" 到计算结果的显示中 -->
              <p>{{ results[index] }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" native-type="button" @click="submitForm">计算</el-button>
            <el-button type="primary" native-type="button" @click="addItem">添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [{ q1: "", q2: "" }],
      results: [],
    };
  },
  methods: {
    submitForm() {
      this.results = [];  // 清空上次的计算结果

      const requestData = {};

      this.items.forEach((item, index) => {
        requestData["a" + (index + 1)] = { a: item.q1, b: item.q2 };
      });

      axios
          .post("http://localhost:8000/api/hb", requestData)
          .then((response) => {
            const results = response.data.results;
            if (results) {
              // 格式化结果为 "环比增长：XXX"
              this.results = results.map(result => `环比增长：${result.result}`);
            }
          })
          .catch((error) => {
            console.error(error);
          });
    },
    addItem() {
      this.items.push({ q1: "", q2: "" });
    },
  },
};
</script>