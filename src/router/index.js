import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/HomeView.vue';
import About from '@/views/AboutView.vue';
import Cursos from '@/views/cursos.vue';
import Admin from '@/views/admin.vue';  

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/cursos', name: 'Cursos', component: Cursos },
  { path: '/administracion', name: 'Admin', component: Admin },  
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
