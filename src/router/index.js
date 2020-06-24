import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/Dashboard'
import AddRecipe from '../components/AddRecipe.vue'
import EditRecipe from '@/components/EditRecipe'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      title: 'Resepi - Dashboard',
    },
    {
      path: '/tambah-resep',
      name: 'AddRecipe',
      component: AddRecipe,
      title: 'Tambah resep',
    },
    {
      path: '/ubah-resep/:slug',
      name: 'EditRecipe',
      component: EditRecipe,
    },
  ],
})

export default router
