import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/components/Board'
import Auth from '@/components/Auth'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Board',
      component: Board
    },
    {
      path: '/registration',
      component: Auth
    },
    {
      path: '/game',
      component: Game
    }
  ]
})
