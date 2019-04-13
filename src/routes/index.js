import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/lobby/Home.vue';
import Lobby from '../components/lobby/Lobby.vue';
import Login from '../components/login/Login.vue';
import Logout from '../components/login/Logout.vue';
import Unauthorized from '../components/Unauthorized.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'Login',
            path: '/',
            component: Login,
            meta:{
                isGuest:true
            }
        },
        {
            name: 'Logout',
            path: '/logout',
            component: Logout,
            meta:{
                isGuest:true
            }
        },
        {
            name: 'Unauthorized',
            path: '/unauthorized',
            component: Unauthorized,
            meta:{
                isGuest:true
            }
        },
        {
            name: 'Lobby',
            path: '/lobby',
            component: Lobby,
            meta: {
                requiresAuth: true,
                requiredRole: 'all',
                menu: true
            },
            children: [
                {
                    name: 'Home',
                    path: '/home',
                    component: Home,
                    meta: {
                        requiresAuth: true,
                        requiredRole: 'all',
                        menu: true
                    }
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("access_token") === undefined || localStorage.getItem("access_token") === null) {
            next('/')
        } else {
            if (to.matched.some(record => record.meta.requiredRole === "admin")) {
                if( localStorage.getItem('user_role') === "admin" ){
                    next();
                }else{
                    next('/unauthorized');
                }
            }else{
                if(to.matched.some(record => record.meta.requiredRole !== "all")){
                    if( localStorage.getItem('user_role') === "admin" || localStorage.getItem('user_role') === to.meta.requiredRole){
                        next();
                    }else{
                        next('/unauthorized');
                    }
                }else {
                    next();
                }
            }
        }
    } else if(to.matched.some(record => record.meta.isGuest)){
        next();
    }else{
        next('/unauthorized');
    }
});


export default router;
