import { createRouter, createWebHistory } from 'vue-router';
import UsersListView from '../views/UsersListView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: UsersListView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: UsersListView
        },
        {
            path: '/add-user',
            name: 'add-user',
            component: () => import('../views/UserView.vue')
        },
        {
            path: '/edit-user',
            name: 'edit-user',
            component: () => import('../views/UserView.vue')
        }
    ]
});

export default router;
