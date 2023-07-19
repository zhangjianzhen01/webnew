<template>
  <div>
    <el-row>
      <el-col :span="4" class="form-col">
        <el-form-item label="姓名">
          <el-input v-model="nickname" placeholder="请输入姓名" />
        </el-form-item>
      </el-col>

      <el-col :span="5" style="margin-left: 100px;" class="form-col">
        <el-form-item label="商机编号">
          <el-input v-model="businessSn" placeholder="请输入商机编号" />
        </el-form-item>
      </el-col>

      <el-col :span="5" style="margin-left: 200px;" class="form-col">
        <el-form-item>
          <el-button @click="search">搜索</el-button>
        </el-form-item>
      </el-col>
    </el-row>

    <div v-if="result && result.length" class="grid-table">
      <div class="grid-table-header">
        <div class="grid-table-col">姓名</div>
        <div class="grid-table-col">智圣鳞甲ID</div>
        <div class="grid-table-col">商机编号</div>
        <div class="grid-table-col">运营大脑ID</div>
      </div>
      <div v-for="row in result" :key="row.nickname" class="grid-table-row">
        <div class="grid-table-col">{{ row.nickname }}</div>
        <div class="grid-table-col">{{ row.zsljId }}</div>
        <div class="grid-table-col">{{ row.businessSn }}</div>
        <div class="grid-table-col">{{ row.yydnId }}</div>
      </div>
    </div>

    <div v-else>
      <p>暂无结果</p>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      nickname: "",
      businessSn: "",
      result: null
    };
  },
  methods: {
    search() {
      if (!this.nickname && !this.businessSn) {
        console.log("请输入姓名或商机编号");
        return;
      }

      let apiUrl = "";

      if (this.businessSn) {
        apiUrl = "http://127.0.0.1:9000/api/wo"; // 替换为实际的商机接口地址
      } else {
        apiUrl = "http://127.0.0.1:9000/api/user"; // 替换为实际的用户接口地址
      }

      const requestData = {
        nickname: this.nickname,
        business_sn: this.businessSn
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      })
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data)) {
              this.result = data.map((item) => {
                return {
                  nickname: this.nickname,
                  zsljId: item.zslj_id || item.create_id,
                  businessSn: item.business_sn || this.businessSn,
                  yydnId: item.yydn_id
                };
              });
            } else {
              this.result = [
                {
                  nickname: this.nickname,
                  zsljId: data.zslj_id || data.create_id,
                  businessSn: data.business_sn || this.businessSn,
                  yydnId: data.yydn_id
                }
              ];
            }
          })
          .catch((error) => {
            console.log("请求出错:", error);
          });
    }
  }
};
</script>

<style scoped>
.grid-table {
  margin-top: 20px;
}

.grid-table-header {
  display: flex;
}

.grid-table-col {
  flex: 1 1;
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.grid-table-row {
  display: flex;
  margin-top: 5px;
}

</style>