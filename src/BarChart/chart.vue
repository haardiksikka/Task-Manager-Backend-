<script>
import { Bar } from 'vue-chartjs';
import categories from '../Categories/categories';

export default {
  extends: Bar,
  data() {
    return {
      chartData: {},
      catergories: [],
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  watch: {
    taskArray() {
      console.log('entering...');
      console.log(this.taskArray);

      //
      this.catergories = categories.categories;
      const categoryCount = [];
      this.catergories.forEach((category) => {
        const count = this.taskArray.filter(
          task => task.taskDomain === category,
        ).length;
        categoryCount.push(count);
      });

      const allocatedTimeArray = [];
      const timeLoggedArray = [];
      let asum = 0;
      let tsum = 0;
      this.catergories.forEach((category) => {
        this.taskArray.forEach((task) => {
          console.log(`${task.taskDomain} ${category}`);
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
            type: 'bar',
            label: 'time logged',
            // backgroundColor: "black",
            data: timeLoggedArray,
          },
          {
            type: 'line',
            label: 'allocated time',
            //  backgroundColor: "#f87979",
            data: allocatedTimeArray,
          },
        ],
      };
      this.renderChart(this.chartData, this.options);
    },
  },
  computed: {
    taskArray() {
      return this.$store.state.userTasks;
    },
  },
};
</script>
