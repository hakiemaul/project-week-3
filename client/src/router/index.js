import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Rooms from '@/components/ListRooms'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import Inside from '@/components/Inside'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
    },
    {
      path: '/game',
      component: Game
    }
  ]
})
