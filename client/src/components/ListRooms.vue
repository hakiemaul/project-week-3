<template lang="html">
  <div>
  <div class = 'head container'>
    <div class="row">
    <h1>SPACESHIP WAR</h1>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#room-modal">CREATE ROOM</button>
    <div class="modal fade container" id="room-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="margin-top:50px">
      <div class="col-md-offset-2 col-md-8 jumbotron">
        <form>
          <h3>Create Room</h3>
          <div class="form-group col-12">
            <label>Room Name</label>
            <input type="text" class="form-control" v-model="title">
          </div>
          <div class="col-12">
              <button type="submit" class="btn btn-primary" v-on:click="createRoom">Create</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </div>
  <div class="services">
<div class="col-md-4" v-for="(room,index) in rooms">
    <figure class="snip1174 navy col-md-4">
      <img v-if="room.players.length < 2" src="http://cdn.wallpapersafari.com/12/39/6rdHR4.jpg" alt="planet" />
      <img class = "war" v-if="room.players.length === 2" src="http://ds9.trekcore.com/images/retake3.gif" alt="planet" />
      <figcaption>
        <h2>{{room.title}}</h2>
        <p>
        created by: <b>{{room.creator}}</b>
        </p>
        <p>
        {{room.players.length}}/2
        </p>
        <a class="btn btn-danger"  v-if="user._id === room.user_id" v-on:click="deleteRoom(room._id,index)"><span class="glyphicon glyphicon-trash"></span>Delete</a>
        <a class="btn btn-primary" v-if="room.players.length < 2 && isJoin === false" v-on:click="join(room)"><span class="glyphicon glyphicon-share"></span>Join</a>
        <a class="btn btn-primary" v-if="isJoin === true && room.players.indexOf(user._id) !== -1" v-on:click="quit(room)"><span class="glyphicon glyphicon-share"></span>Quit</a>
        <a class="btn btn-success" v-if="room.players.indexOf(user._id) !== -1 && isReady === false" v-on:click="ready(room)"><span class="glyphicon glyphicon-share"></span>Ready</a>
        <a class="btn btn-primary" v-if="isFull === true && room.players.indexOf(user._id) !== -1 && isReady === true" v-on:click="start(room)"><span class="glyphicon glyphicon-share"></span>Start</a>
      </figcaption>
    </figure>
</div>
</div>
  </div>  
</template>

<script>
export default {
  data(){
    return{
      rooms: [],
      title: "",
      currentID: "",
      isJoin: false
    }
  },
    methods:{
      listRooms(){
        let self = this;
        axios.get('http://localhost:3000/rooms/all')
        .then(response=>{
          self.rooms = response.data
        })
        .catch(err=>{
          console.log(err);
        })
      }, 
      createRoom(){
        let self = this;
        let user = JSON.parse(localStorage.getItem('token'))
        axios.post('http://localhost:3000/createroom',{
          title: self.title,
          creator: user.username,
          user_id: user._id
        })
        .then(response=>{
          console.log(user._id);
          self.rooms.push(response.data)
          //location.reload()
        })
        .catch(err=>{
          console.log(err);
        })
      },
      deleteRoom(id,index){
        let self = this;
        axios.delete(`http://localhost:3000/rooms/${id}`)
        .then(response=>{
          self.rooms.splice(index,1)
        })
        .catch(err=>{
          console.log(err);
        })
      },
      join(room){
        let self = this;
        let user = JSON.parse(localStorage.getItem('token'))
        axios.get(`http://localhost:3000/rooms/${room._id}`)
        .then(response=>{
          let player = response.data.players
          player.push(user._id)
          axios.put(`http://localhost:3000/rooms/${room._id}`,{
            players: player
          })
          .then(response=>{
            room.players.push(user._id)
            localStorage.setItem('isJoin','true')
            self.isJoin = true
            let count = room.players.length
            self.$db.ref(`players`).set({
              count: count
            })
            self.isFull = true
          })
        })        
      },
      quit(room){
        let self = this;
        let user = JSON.parse(localStorage.getItem('token'))        
        axios.get(`http://localhost:3000/rooms/${room._id}`)
        .then(response=>{
          let player = response.data.players
          var index = player.indexOf(user._id)
          player.splice(index,1)
          axios.put(`http://localhost:3000/rooms/${room._id}`,{
            players: player
          })
          .then(response=>{
            room.players.splice(index,1)
            localStorage.removeItem('isJoin')
            self.isJoin = false
            let count = room.players.length
            self.$db.ref(`players`).set({
              count: count
            })
          })
        })
      
        self.isJoin = false
      },
      ready(room) {
        let user = JSON.parse(localStorage.getItem('token'))
        // model.generateShipLocations()
        // myModel.generateShipLocations()
        // if(user._id == room.players[0].id) {
        //   model = model
        //   myModel = myModel
        // } else {
        //   model = myModel
        //   myModel = model
        //   console.log(myModel);
        // }
        this.$db.ref('rooms/').set({
          ready: true
        })
        this.isReady = true
      },
      listen (room) {
        var self = this
        this.$db.ref(`players/`).on('value', function (tes) {
          let count = tes.val().count
          room.players.length = count
          console.log(count);
          if(tes.val().count == 2) {
            self.isFull = true
          }
        })
        this.$db.ref('rooms/').on('value', function (readiness){
          alert('Opponent is ready')
        })
      },
      checkJoin(){
        var check = localStorage.getItem('isJoin')
        console.log(check);
        if(check !== null){
          this.isJoin = true 
          console.log(`masuk isjoin true`);
        }
        else{
          this.isJoin = false
        }
    },
    created: function(){
      this.listRooms()
      this.checkJoin()
      this.rooms.forEach(room => {
        this.listen(room)
      })
    },
    computed:{
      user(){
        var currentUser = JSON.parse(localStorage.getItem('token'))
        // this._id = currentUser._id
        // this.username = currentUser.username
        return currentUser
      }    
      }
  }
</script>

<style lang="css">
.head{
  text-align: center;
}

.war {
  width: 370px;
  height: 234px;
}
.services{
    margin: 20px auto;
    }
figure.snip1174 {
  color: #fff;
  position: relative;
  float: left;
  overflow: hidden;
  background-color: #1a1a1a;
  color: #ffffff;
  text-align: left;
  margin: 10px;
  width: 100%;
  border-radius: 0px;
}
figure.snip1174 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
figure.snip1174 img {
  max-width: 100%;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  vertical-align: top;
  opacity: 0.7;
}
figure.snip1174 figcaption {
  position: absolute;
  padding: 40px 25px;
  top: 0;
  left: 0;
}
figure.snip1174 h2,
figure.snip1174 p {
  margin: 0;
  padding: 0;
}
figure.snip1174 h2 {
  margin-bottom: 10px;
  display: inline-block;
  font-weight: 100;
  font-size: 1.8em;
}
figure.snip1174 p {
  font-weight: 300;
  margin-bottom: 20px;
  line-height: 1.4em;
}
figure.snip1174 a {
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid #ffffff;
  text-decoration: none;
  color: #ffffff;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.8em;
  -webkit-transform: translateY(50%);
  transform: translateY(50%);
  opacity: 0;
}
figure.snip1174 a:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
figure.snip1174.blue {
  background-color: #20638f;
}
figure.snip1174.yellow {
  background-color: #c87f0a;
}
figure.snip1174.green {
  background-color: #1e8449;
}
figure.snip1174.navy {
  background-color: #222f3d;
}
figure.snip1174.red {
  background-color: #962d22;
}
figure.snip1174:hover img,
figure.snip1174.hover img {
  opacity: 0;
  -webkit-transform: scale(1);
  transform: scale(1);
}
figure.snip1174:hover a,
figure.snip1174.hover a {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
}

</style>
