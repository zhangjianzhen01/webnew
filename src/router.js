//--------副路由配置------------
import { createRouter, createWebHistory } from "vue-router";
//引入vue组件
import ChainGrowthList from './components/ChainGrowthList.vue';
import SerialNumberList from './components/SerialNumberList.vue';
import NewOrderList from './components/NewOrderList.vue';
import NewTiDi from './components/NewTiDi.vue';

// 创建路由实例并配置路由规则
const router = createRouter({
    history: createWebHistory(),
    //定义路由和路由引用的组件
    routes: [
        { path: '/js', component: ChainGrowthList },
        { path: '/cx', component: SerialNumberList },
        { path: '/xz', component: NewOrderList },
        { path: '/qx', component: NewTiDi },
    ],
});

export default router;