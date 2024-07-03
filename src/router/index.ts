import { createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    { 
        path: '/:pathMatch(.*)*', 
        name: '404',
        component: () => import(/* webpackChunkName: "404" */ '../pages/404.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router