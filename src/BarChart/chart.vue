<script>
import { Bar } from 'vue-chartjs';
import categories from '../Categories/categories';

export default {
  extends: Bar,
  data() {
    return {
      chartData: {},
      categories: [],
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
      this.getCategories.forEach((c)=>{
        this.categories.push(c.CategoryName)
      })
    
      console.log(this.categories);
      const categoryCount = [];
      this.categories.forEach((category) => {
        const count = this.taskArray.filter(
          task => task.taskDomain === category,
        ).length;
        categoryCount.push(count);
      });
      const allocatedTimeArray = [];
      const timeLoggedArray = [];
      let asum = 0;
      let tsum = 0;
      this.categories.forEach((category) => {
        this.taskArray.forEach((task) => {
          if (task.TaskDomain === category) {
            asum += task.AllocatedTime;
            tsum += task.TimeLogged;
          }
        });
        allocatedTimeArray.push(asum);
        timeLoggedArray.push(tsum);
        asum = 0;
        tsum = 0;
      });
      this.chartData = {
        labels: this.categories,
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
      return this.$store.getters.userTasks;
    },
    getCategories(){
      return this.$store.getters.taskCategories;
    },
  },
};
</script>
