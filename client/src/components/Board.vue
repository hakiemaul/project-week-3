<template lang="html">
  <div id="board">
    <!-- battleship table -->
    <table>
      <!-- battleship row 0 -->
      <tr>
        <td id="00"></td><td id="01"></td><td id="02"></td><td id="03"></td><td id="04"></td><td id="05"></td><td id="06"></td>
      </tr>
      <!-- battleship row 1 -->
      <tr>
        <td id="10"></td><td id="11"></td><td id="12"></td><td id="13"></td><td id="14"></td><td id="15"></td><td id="16"></td>
      </tr>
      <!-- battleship row 2 -->
      <tr>
        <td id="20"></td><td id="21"></td><td id="22"></td><td id="23"></td><td id="24"></td><td id="25"></td><td id="26"></td>
      </tr>
      <!-- battleship row 3 -->
      <tr>
        <td id="30"></td><td id="31"></td><td id="32"></td><td id="33"></td><td id="34"></td><td id="35"></td><td id="36"></td>
      </tr>
      <!-- battleship row 4 -->
      <tr>
        <td id="40"></td><td id="41"></td><td id="42"></td><td id="43"></td><td id="44"></td><td id="45"></td><td id="46"></td>
      </tr>
      <!-- battleship row 5 -->
      <tr>
        <td id="50"></td><td id="51"></td><td id="52"></td><td id="53"></td><td id="54"></td><td id="55"></td><td id="56"></td>
      </tr>
      <!-- battleship row 6 -->
      <tr>
        <td id="60"></td><td id="61"></td><td id="62"></td><td id="63"></td><td id="64"></td><td id="65"></td><td id="66"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['move'],
  methods: {

  },
  created () {
    console.log(this.move);
  }
}
</script>

<style lang="css">
div#board {
	position: relative;
	width: 512px;
	height: 431px;
	margin: auto;
	background: url('/static/space50.jpg') no-repeat;
}

/*battleship table*/
table {
	position: absolute;
	left: 86px;
	top: 40px;
	border-spacing: 0;
}

/*battleship table rows*/
tr {
	height: 24px;
}
/*battleship table data cell*/
td {
	width: 48px;
	height: 40px;
}

/*battleship form*/
form {
	position: absolute;
	top: 25px;
	right: 0;
	padding: 10px;
	background-color: rgb(83, 175, 19);
	z-index: 100;
}

/*battleship form input*/
form input {
	background-color: rgb(152, 207, 113);
	border-color: rgb(83, 175, 19);
	font-size: 1em;
}
.form-control {
	width: 70% !important;
	margin-right: 5%;
}
/*hit or miss*/
.hit {
	background: url('/static/spaceship.png') no-repeat center center;
  width: 48px;
}
.miss {
	background: url('/static/miss50.png') no-repeat center center;
}
</style>
