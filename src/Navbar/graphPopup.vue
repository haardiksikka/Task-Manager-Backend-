<template>
  <v-dialog max-width="900px">
    <v-btn class="white--text" style="padding:20px 10px;" slot="activator" flat>Chart</v-btn>
    <v-card>
      <v-card-title>
        <h1>Charts</h1>
      </v-card-title>
      <v-card-text>
        <barChart style="height:300px"></barChart>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import barChart from "../BarChart/chart.vue";

export default {
  name: "GraphPopup",
  components: { barChart }
};
</script>

<style>
</style>
