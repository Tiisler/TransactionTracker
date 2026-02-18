import { createWebHistory, createRouter } from 'vue-router'

import LogIn from '@/LogIn.vue'
import Home from '@/Home.vue'
import SignUp from '@/SignUp.vue'
import supabase from '@/config/supabase'

const routes = [
    { path: '/', component: Home, meta: { requiresAuth: true } },
    { path: '/login', component: LogIn },
    { path: '/signup', component: SignUp },

]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return next('/login')
        }
    }
    next()
})