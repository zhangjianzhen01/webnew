<!-- App.vue -->
<template>
  <div>
    <el-link v-show="shouldShowSearchLink" @click="goToSearch">查询</el-link>
    <el-link v-show="shouldShowBackLink" @click="goToHome">返回</el-link>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    shouldShowSearchLink() {
      return this.$route.path !== '/search';
    },
    shouldShowBackLink() {
      return this.$route.path !== '/';
    }
  },
  methods: {
    goToSearch() {
      this.$router.push('/search');
    },
    goToHome() {
      this.$router.push('/');
    }
  }
}
</script>
