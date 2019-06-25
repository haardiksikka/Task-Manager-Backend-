<template>
 <nav>
     <v-toolbar  class="blue lighten grey--text text--lighten-3" clipped-left>
            <v-toolbar-side-icon  @click="hideDrawer" class="hidden-md-and-up white--text"></v-toolbar-side-icon>
            <v-toolbar-title>Task Manager</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
               <ChartPopup/>
               <popup></popup>               
              <v-btn class="white--text" flat @click="logout">Log Out <v-icon right>exit_to_app</v-icon> </v-btn>
            </v-toolbar-items>
          </v-toolbar>
   <v-navigation-drawer class="blue lighten-1 " v-model="drawer" temporary absolute width="200" id="drawer">
        <popup></popup>
        <v-btn class="white--text" flat @click="logout">Log Out <v-icon right>exit_to_app</v-icon> </v-btn>
   </v-navigation-drawer>
    </nav>
</template>

<script>
import "vuetify/dist/vuetify.min.css";
import Popup from './popup.vue'
import ChartPopup from './graphPopup.vue';

export default {
    name: "Navbar",
    components: {
        Popup,
        ChartPopup,
    },
    data(){
        return {
            drawer: false,
        }
    },
    methods: {
        hideDrawer(){
            this.drawer= true;
        },
        addTask(){
            console.log('add task');
        },
        logout(){
            console.log('Logging out');
            sessionStorage.removeItem('user');
            this.$router.push({name:'Login'});
        }

    },
   
}
</script>

<style>
</style>
