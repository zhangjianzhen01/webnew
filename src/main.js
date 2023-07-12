//------主路由配置-------
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

const app = createApp(App);

// 将路由实例注册到应用实例中
app.use(router);

// 使用Element Plus插件
app.use(ElementPlus);

// 将应用实例挂载到DOM元素上
app.mount('#app');