import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeViewRedesigned from '../views/HomeViewRedesigned.vue'
import AboutView from '../views/AboutView.vue'
import AboutViewRedesigned from '../views/AboutViewRedesigned.vue'
import ContactView from '../views/ContactView.vue'
import ContactViewRedesigned from '../views/ContactViewRedesigned.vue'
import DestinationsView from '../views/DestinationsView.vue'
import DestinationsViewRedesigned from '../views/DestinationsViewRedesigned.vue'
import PackagesView from '../views/PackagesView.vue'
import PackagesViewRedesigned from '../views/PackagesViewRedesigned.vue'
import BlogView from '../views/BlogView.vue'
import BlogViewRedesigned from '../views/BlogViewRedesigned.vue'
import TestView from '../views/TestView.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewRedesigned
    },
    {
      path: '/destinations',
      name: 'destinations',
      component: DestinationsViewRedesigned
    },
    {
      path: '/destinations/:id',
      name: 'destination-details',
      component: () => import('../views/DestinationDetails.vue')
    },
    {
      path: '/packages',
      name: 'packages',
      component: PackagesViewRedesigned
    },
    {
      path: '/packages/:id',
      name: 'package-details',
      component: () => import('../views/PackageDetails.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: AboutViewRedesigned
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogViewRedesigned
    },
    {
      path: '/blog/:id',
      name: 'blog-post',
      component: () => import('../views/BlogPost.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactViewRedesigned
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/admin',
      name: 'admin-login',
      component: () => import('../views/AdminLogin.vue')
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('../views/BookingPage.vue')
    },
    {
      path: '/testimonials',
      name: 'testimonials',
      component: () => import('../views/TestimonialsView.vue')
    }
  ]
})

export default router