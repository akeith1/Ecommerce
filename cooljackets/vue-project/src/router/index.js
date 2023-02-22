import { createRouter, createWebHistory } from 'vue-router'
import {useProductStore} from '../store'
import.meta.env
import HomeView from '../views/HomeView.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import MyAccount from '../views/MyAccount.vue'
import Checkout from '../views/Checkout.vue'
import Success from '../views/Success.vue'
  const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/log-in',
      name: 'LogIn',
      component: Login,
    },
    {
      path: '/my-account',
      name: 'MyAccount',
      component: MyAccount,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/cart/success',
      name: 'Success',
      component: Success,
    },
    {
      path: '/cart/checkout',
      name: 'Checkout',
      component: Checkout,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/:category_slug/:product_slug',
      name: 'Product',
      component: Product
    },
    {
      path: '/:category_slug',
      name: 'Category',
      component: Category
    },
  ]

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

  router.beforeEach((to,from, next) => {
    const productStore = useProductStore()
    if(to.matched.some(record => record.meta.requireLogin) && !productStore.isAuthenticated){
      next({name: 'LogIn', query: {to: to.path}});
    } else {
      next()
    }
  })


export default router
