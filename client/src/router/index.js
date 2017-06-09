import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/components/Board'
import Auth from '@/components/Auth'
import Rooms from '@/components/ListRooms'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import Inside from '@/components/Inside'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/game',
      name: 'Board',
      component: Board
    },
    {
      path: '/registration',
      component: Auth
    },
    {
      path: '/rooms',
      name: 'room',
      component: Rooms
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/inside',
      name: 'inside',
      component: Inside
    }
  ]
})
