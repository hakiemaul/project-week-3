<template lang="html">
  <div id="board">
    <!-- battleship table -->
    <table>
      <!-- battleship row 0 -->
      <tr>
        <td id="00m"></td><td id="01m"></td><td id="02m"></td><td id="03m"></td><td id="04m"></td><td id="05m"></td><td id="06m"></td>
      </tr>
      <!-- battleship row 1 -->
      <tr>
        <td id="10m"></td><td id="11m"></td><td id="12m"></td><td id="13m"></td><td id="14m"></td><td id="15m"></td><td id="16m"></td>
      </tr>
      <!-- battleship row 2 -->
      <tr>
        <td id="20m"></td><td id="21m"></td><td id="22m"></td><td id="23m"></td><td id="24m"></td><td id="25m"></td><td id="26m"></td>
      </tr>
      <!-- battleship row 3 -->
      <tr>
        <td id="30m"></td><td id="31m"></td><td id="32m"></td><td id="33m"></td><td id="34m"></td><td id="35m"></td><td id="36m"></td>
      </tr>
      <!-- battleship row 4 -->
      <tr>
        <td id="40m"></td><td id="41m"></td><td id="42m"></td><td id="43m"></td><td id="44m"></td><td id="45m"></td><td id="46m"></td>
      </tr>
      <!-- battleship row 5 -->
      <tr>
        <td id="50m"></td><td id="51m"></td><td id="52m"></td><td id="53m"></td><td id="54m"></td><td id="55m"></td><td id="56m"></td>
      </tr>
      <!-- battleship row 6 -->
      <tr>
        <td id="60m"></td><td id="61m"></td><td id="62m"></td><td id="63m"></td><td id="64m"></td><td id="65m"></td><td id="66m"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['move'],
  created () {
    // var self = this
    // setInterval(function () {
    //   console.log(self.move);
    // }, 1000)
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
