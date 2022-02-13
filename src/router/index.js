import Vue from 'vue'
import VueRouter from 'vue-router'
// import Overview from '../views/Overview.vue'
// import Search from '../views/Search.vue'
// import Puzzle from '../views/Puzzle.vue'
// import PuzzleSolver from '../views/PuzzleSolver.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/overview',
    name: 'Overview',
    component: resolve => require(['@/views/Overview'], resolve),
  },
  {
    path: '/search',
    name: 'Search',
    component: resolve => require(['@/views/Search'], resolve),
    props: route => ({ query: route.query.q })
  },
  {
    path: '/puzzle',
    name: 'Puzzle',
    component: resolve => require(['@/views/Puzzle'], resolve),
  },
  {
    path: '/solve',
    name: 'PuzzleSolver',
    component: resolve => require(['@/views/PuzzleSolver'], resolve),
  },
]

const router = new VueRouter({
  routes
})

export default router
