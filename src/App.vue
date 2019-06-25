<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import 'vuetify/dist/vuetify.min.css';
export default {
  name: "app"
};
</script>

<style>
#app {
  background-image: url("https://images.unsplash.com/photo-1497733942558-e74c87ef89db?dpr=1&auto=compress,format&fit=crop&w=1650&h=&q=80&cs=tinysrgb&crop=");
  background-size: cover;
  overflow: hidden;
}
.loginOverlay {
  background: rgba(33, 150, 243, 0.3);
}
.photoCredit {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>
