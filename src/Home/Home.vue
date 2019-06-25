<template>
  <v-app>
    <Navbar></Navbar>
    <v-container>
      <v-data-table :headers="headers" :items="alltasks" class="elevation-1 pt-5">
        <template v-slot:items="props" >
        <td>{{props.item.taskId}}</td>
        <td>{{props.item.userStory}}</td>
         <td>{{props.item.taskDomain}}</td>
         <td> {{props.item.dateTime.substring(0,10)}} </td>
        <td>{{props.item.timeLogged}}</td>
        <td>{{props.item.allocatedTime}}</td>
        <td> <v-icon color="red" style="cursor:pointer" @click="removeTask(props.item.taskId)">delete</v-icon> </td>            
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>

<script>
import "vuetify/dist/vuetify.min.css";
import axios from "axios";
import Navbar from "../Navbar/navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar
  },
  computed:{
    tasks(){
      return this.$store.state.userTasks;
    }
  },
  created() {
    var token = sessionStorage.getItem("user");
    axios
      .get(`https://localhost:44389/api/task/usertask?email=${token}`)
      .then(response => {
      
        this.$store.commit('addToTask',response.data);
        
       
        this.alltasks=this.tasks[0];
       
        this.id=0;
      })
      .catch(e => {
        console.log(e);
      });
  },
  data() {
    return {
     
      headers: [
        {
          text: "Task Id",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "User Story",
          value: "user story",
          sortable: false
        },
        { text: "Task Domain", sortable: false, value: "tech" },
        {text : "Created On", sortable :false, value: "date"},
        { text: "Time Logged", sortable: false, value: "time" },
        { text: "Allocated Time", sortable: false, value: "time" }
      ],
      
      alltasks:[],
      id:0,
    };
  },
  methods: {
      removeTask(id){
        axios.delete(`https://localhost:44389/api/task/deletetask?id=${id}`)
        .then(response => {
          if(response.data == true){
           
            window.location.reload();
          }
          else{
            alert('error while deletion');
          }
        })
        .catch(e =>{
          console.log(e);
        })
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
