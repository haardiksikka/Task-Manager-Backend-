<script>
import { Bar } from "vue-chartjs";
import categories from "../Categories/categories";

export default {
  extends: Bar,
  data() {
    return {
      chartData: {},
      taskArray: [],
      catergories: [],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  watch: {
    allTasks: function(newData, oldData) {
      console.log("entering...");
      this.taskArray = this.allTasks[0];
      console.log(this.taskArray);
      this.catergories = categories.categories;
      var categoryCount = [];
      this.catergories.forEach(category => {
        const count = this.taskArray.filter(
          task => task.taskDomain === category
        ).length;
        categoryCount.push(count);
      });

      var allocatedTimeArray = [];
      var timeLoggedArray = [];
      var asum = 0;
      var tsum = 0;
      this.catergories.forEach(category => {
        this.taskArray.forEach(task => {
          console.log(task.taskDomain + " " + category);
          if (task.taskDomain === category) {
            asum += task.allocatedTime;
            tsum += task.timeLogged;
          }
        });
        allocatedTimeArray.push(asum);
        timeLoggedArray.push(tsum);
        asum = 0;
        tsum = 0;
      });
      this.chartData = {
        labels: this.catergories,
        datasets: [
          {
            type: "bar",
            label: "time logged",
            // backgroundColor: "black",
            data: timeLoggedArray
          },
          {
            type: "line",
            label: "allocated time",
            //  backgroundColor: "#f87979",
            data: allocatedTimeArray
          }
        ]
      };
      this.renderChart(this.chartData, this.options);
    }
  },
  computed: {
    allTasks() {
      return this.$store.state.userTasks;
    }
  }
};
</script>