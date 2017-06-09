<template lang="html">
<div class="container-fluid well span6">
	<div class="row-fluid">
    <div class="span2" >
    <img src="https://slm-assets3.secondlife.com/assets/253017/view_large/94c194faff175f184e544d1d999b07bd.jpg?1276935701" class="img-circle">
    </div>
    
    <div class="span8">
        <h3>ID: {{_id}}</h3>
        <h3>Username: {{username}}</h3>
        <h3>Email: {{email}}</h3>
        <h3>Wins: {{win}}</h3>
    </div>
    
    <div class="span2">
        <div class="btn-group">
            <a class="btn dropdown-toggle btn-info" data-toggle="dropdown" href="#">
                Action 
                <span class="icon-cog icon-white"></span><span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
                <li><a href="#"><span class="icon-wrench"></span> Modify</a></li>
                <li><a href="#"><span class="icon-trash"></span> Delete</a></li>
            </ul>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  data(){
    return{
      _id: "",
      username:"",
      email: "",
      win:""
    }
  },
  methods:{
    profile(){
    var user = JSON.parse(localStorage.getItem('token'))
    console.log(user);
      axios.get(`http://localhost:3000/${user._id}`)
      .then(response=>{
        this._id = response.data._id
        this.username = response.data.username
        this.email = response.data.email
        this.win = response.data.win
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
  created:function(){
    this.profile()
  },
  computed:{
  }
}
</script>

<style lang="css">
</style>
