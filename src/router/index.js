import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Puzzle from '../views/Puzzle.vue'
import PuzzleSolver from '../views/PuzzleSolver.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/result/:search',
    name: 'Home',
    props: true,
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/puzzle',
    name: 'Puzzle',
    component: Puzzle
  },
  {
    path: '/solve',
    name: 'PuzzleSolver',
    component: PuzzleSolver
  },
]

const router = new VueRouter({
  routes
})

export default router
