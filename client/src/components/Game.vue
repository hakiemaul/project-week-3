<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <h1 id="messageArea"> {{ message }} </h1>
        <input type="text" class="form-control small" v-model="move" placeholder="A0" id="guessInput">
        <br>
        <button type="button" class="btn btn-danger" @click="sendMove" id="fireButton">FIRE!!</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <h3>Enemy Board</h3>
        <Board></Board>
      </div>
      <div class="col-md-6">
        <h3>Your Board</h3>
        <MyBoard></MyBoard>
      </div>
    </div>
  </div>
</template>

<script>
import Board from '@/components/Board'
import MyBoard from '@/components/MyBoard'
const config = {
  apiKey: "AIzaSyA1_GmSaCxf1gxPRC-11NmW5niDIaaO3KE",
  authDomain: "fir-lecture-77a47.firebaseapp.com",
  databaseURL: "https://fir-lecture-77a47.firebaseio.com",
  storageBucket: "fir-lecture-77a47.appspot.com"
}
firebase.initializeApp(config)

var db = firebase.database()
var enemyBoard = db.ref('urls/1')
var myBoard = db.ref('urls/1')
export default {
  components: {
    Board,
    MyBoard
  },
  data () {
    return {
      message: 'Selamat bermain',
      move: null,
      enemyMove: null
    }
  },
  methods: {
    sendMove () {
      var self = this
      enemyBoard.set({
        move: self.move
      })
    },
    listen () {
      var self = this
      myBoard.on('value', function (enemyMove) {
        let guess = enemyMove.val().move.toUpperCase()
        self.enemyMove = guess
        handleEnemyMove(guess)
      })
    }
  },
  created () {
    this.listen()
  }
}
</script>

<style lang="css">
</style>
