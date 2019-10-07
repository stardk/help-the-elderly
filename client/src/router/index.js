import Vue from 'vue'
import Router from 'vue-router'
import Tasks from '@/components/Tasks'
import NewTask from '@/components/NewTask'
import EditTask from '@/components/EditTask'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import About from '@/components/About'
import Profile from '@/components/Profile'
import Rating from '@/components/Rating'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'Tasks' }
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/tasks/new',
      name: 'NewTask',
      component: NewTask
    },
    {
      path: '/tasks/:id/edit',
      name: 'EditTask',
      component: EditTask
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      props: true
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      props: true
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/rating',
      name: 'Rating',
      component: Rating
    }
  ]
})
