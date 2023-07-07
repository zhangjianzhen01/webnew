import {createApp} from 'vue';
import {createRouter, createWebHistory} from "vue-router";
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

// 导入组件
import ChainGrowthList from './components/ChainGrowthList.vue';
import SerialNumberList from './components/SerialNumberList.vue';
import NewOrderList from './components/NewOrderList.vue'

// 创建路由实例并配置路由规则
const router = createRouter({
    history: createWebHistory(),
    //定义路由和路由引用的组件
    routes: [
        {path: '/component-a', component: ChainGrowthList},
        {path: '/component-b', component: SerialNumberList},
        {path: '/component-c', component: NewOrderList},
    ],
});

// 创建Vue应用实例
const app = createApp(App);

// 将路由实例注册到应用实例中
app.use(router);

// 使用Element Plus插件
app.use(ElementPlus);

// 将应用实例挂载到DOM元素上
app.mount('#app');