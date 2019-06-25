<template>
  <v-dialog flat max-width="900px">
    <v-btn class="white--text" style="padding:20px 10px;" slot="activator" flat>
      Add Task
      <v-icon right>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <h1>Add new Task</h1>
      </v-card-title>
      <v-card-text>
        <div>
          <v-form ref="form">
            <v-text-field
              label="Enter User Story"
              :rules="userStoryRules"
              v-model="userStory"
              required
            ></v-text-field>
            <v-select
              v-model="taskDomain"
              :items="items"
              :rules="[v => !!v || 'Task Domain  is required']"
              label="Task Domain"
              required
            ></v-select>
            <v-text-field
              label="Enter Time Logged"
              type="number"
              v-model="timeLogged"
              :rules="timeLoggedRules"
              required
            ></v-text-field>
            <v-text-field
              label="Enter Allocated Time"
              type="number"
              v-model="allocatedTime"
              min="5"
              :rules="allocatedTimeRules"
              required
            ></v-text-field>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="dateTime"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateTime"
                  label="Created On"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dateTime" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-layout justify-space-between>
              <v-btn @click="addTask" class="blue darken-4 white--text">Add Task</v-btn>
            </v-layout>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      landscape: true,
     // date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      items: [
        "dotNet Framework",
        "dotNet Core",
        "vuejs",
        "Angular",
        "Java",
        "Node js",
        "React",
        "Python Django",
        "CSS"
      ],
      userStory: "",
      taskDomain: "",
      allocatedTime: 0,
      timeLogged: 0,
      dateTime: new Date().toISOString().substr(0, 10),
      userStoryRules: [v => !!v || "User Story is Required"],
      taskDomainRules: [v => !!v || " Task Domain is Requires"],
      allocatedTimeRules: [v => !!v || "Allocated Time is Requires"],
      timeLoggedRules: [v => !!v || "Time Logged is Required"],
      postBody: {}
    };
  },

  methods: {
    addTask() {
      console.log("adding task");
      var token = sessionStorage.getItem("user");
      this.postBody = Object.assign({
        UserStory: this.userStory,
        TaskDomain: this.taskDomain,
        AllocatedTime: this.allocatedTime,
        TimeLogged: this.timeLogged,
        Email: token,
        DateTime: this.dateTime,
      });

      axios
        .post(`https://localhost:44389/api/task/newtask`, this.postBody)
        .then(response => {
          console.log(response.data);
          window.location.reload();
        })
        .catch(e => {
          console.log(e);
          alert("Error!!");
        });
    }
  }
};
</script>

<style>
</style>
