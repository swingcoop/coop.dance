import Vue from 'vue'
import VueRouter from 'vue-router'
import Contact from '../views/Contact.vue'
import Home from '../views/Home.vue'
import Mission from '../views/Mission.vue'
import Rsvp from '../views/Rsvp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/mission',
    name: 'mission',
    component: Mission
  },{
    path: '/rsvp',
    name: 'rsvp',
    component: Rsvp
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
