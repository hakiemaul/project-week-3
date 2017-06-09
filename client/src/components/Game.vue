<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div>
          <h1 id="messageArea"> {{ message }} </h1>
          <input type="text" class="form-control small" v-model="move" placeholder="A0" id="guessInput">
          <br>
          <button type="button" class="btn btn-danger" @click="sendMove" id="fireButton">FIRE!!</button>
        </div>
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

export default {
  components: {
    Board,
    MyBoard
  },
  data () {
    return {
      message: 'Selamat bermain',
      move: '',
      enemyMove: '',
      myBoard: this.$route.query.player,
      enemyBoard: this.$route.query.enemy,
      turn: true
    }
  },
  methods: {
    sendMove () {
      var self = this
      this.$db.ref(`urls/${self.enemyBoard}`).set({
        move: self.move
      })
      self.turn = false
    },
    listen () {
      var self = this
      this.$db.ref(`urls/${self.myBoard}`).on('value', function (enemyMove) {
        let guess = enemyMove.val().move.toUpperCase()
        self.enemyMove = guess
        handleEnemyMove(guess)
        self.turn = true
      })
    }
  },
  created () {
    this.sendMove()
    this.listen()
  }
}
</script>

<style lang="css">
</style>
