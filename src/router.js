//--------副路由配置------------
import { createRouter, createWebHistory } from "vue-router";
//引入vue组件
import ChainGrowthList from './components/ChainGrowthList.vue';
import SerialNumberList from './components/SerialNumberList.vue';
import NewOrderList from './components/NewOrderList.vue';
import PermissionTest from './components/PermissionTest.vue';

// 创建路由实例并配置路由规则
const router = createRouter({
    history: createWebHistory(),
    //定义路由和路由引用的组件
    routes: [
        { path: '/js_hb', component: ChainGrowthList },
        { path: '/cx_xlh', component: SerialNumberList },
        { path: '/Added', component: NewOrderList },
        { path: '/cx_qx', component: PermissionTest },
    ],
});

export default router;