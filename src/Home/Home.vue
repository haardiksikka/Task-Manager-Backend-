<template>
  <v-app>
    <Navbar></Navbar>
    <v-container>
      <v-data-table :headers="headers" :items="tasks" class="elevation-1 pt-5">
        <template v-slot:items="props" >
        <td>{{props.item.TaskId}}</td>
        <td>{{props.item.UserStory}}</td>
         <td>{{props.item.TaskDomain}}</td>
         <td> {{new Date(props.item.CreatedOn.match(/\d+/)[0]*1).toString().substring(0,10)}} </td>
        <td>{{props.item.TimeLogged}}</td>
        <td>{{props.item.AllocatedTime}}</td>
        <td> <v-icon color="red" style="cursor:pointer" @click="removeTask(props.item.TaskId)">delete</v-icon> </td>
        <td><EditPopup :task="props.item"></EditPopup></td>      
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>

<script>
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';
import Navbar from '../Navbar/navbar.vue';
import EditPopup from '../Navbar/editTaskPopup.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    EditPopup
  },
  computed: {
    tasks() {    
      return this.$store.getters.userTasks;
    },
  },
  mounted() {
      this.$store.dispatch('getTaskData');
  },
  data() {
    return {
      headers: [
        {
          text: 'Task Id',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'User Story',
          value: 'user story',
          sortable: false,
        },
        { text: 'Task Domain', sortable: false, value: 'tech' },
        { text: 'Created On', sortable: false, value: 'date' },
        { text: 'Time Logged', sortable: false, value: 'time' },
        { text: 'Allocated Time', sortable: false, value: 'time' },
      ],
      id: 0,
    };
  },
  methods: {
    removeTask(id) {
      axios.get(`http://localhost:53653/deletetask/${id}`)
        .then((response) => {
          if (response.data === true) {
           this.$store.dispatch('getTaskData');
           //this.$store.dispatch('getCategories');
          } else {
            alert('error while deletion');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editTask(id){
      console.log('dd');
    }
  },
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
