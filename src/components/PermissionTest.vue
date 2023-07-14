<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="nickname" placeholder="请输入姓名" />
      </el-col>
      <el-col :span="6" style="margin-left: 10px;">
        <el-button @click="searchByNickname">搜索姓名</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px;">
      <el-col :span="6">
        <el-input v-model="businessSn" placeholder="请输入商机编号" />
      </el-col>
      <el-col :span="6" style="margin-left: 10px;">
        <el-button @click="searchByBusinessSn">搜索商机编号</el-button>
      </el-col>
    </el-row>

    <el-table :data="result" v-if="result && result.length"> <!-- Render table only if there are results -->
      <el-table-column label="姓名">
        <template v-slot="{ row }"> <!-- Use v-slot instead of slot-scope -->
          {{ row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="智圣鳞甲ID">
        <template v-slot="{ row }"> <!-- Use v-slot instead of slot-scope -->
          {{ row.zsljId }}
        </template>
      </el-table-column>
      <el-table-column label="运营大脑ID">
        <template v-slot="{ row }"> <!-- Use v-slot instead of slot-scope -->
          {{ row.yydnId }}
        </template>
      </el-table-column>
    </el-table>
    <div v-else>
      <p>暂无结果</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: '', // Stores the user's search input for name
      businessSn: '', // Stores the user's search input for business sn
      result: [] // Stores the retrieved results
    }
  },
  methods: {
    searchByNickname() {
      const requestData = {
        nickname: this.nickname
      };

      this.search('http://127.0.0.1:8000/api/user', requestData);
    },
    searchByBusinessSn() {
      const requestData = {
        business_sn: this.businessSn
      };

      this.search('http://127.0.0.1:8000/api/wo', requestData);
    },
    search(url, requestData) {
      // Send a POST request to the server
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
          .then(response => response.json())
          .then(data => {
            this.result = [{
              nickname: this.nickname || '',
              zsljId: data.zslj_id || '',
              yydnId: data.yydn_id || ''
            }];
          })
          .catch(error => {
            console.log('请求失败', error);
          });
    }
  }
}
</script>