<template>
  <v-container fluid>
    <v-card class="pa-3">
      <div class="small">
        <line-chart :chart-data="datacollection" />
        <button @click="fillData()">
          Randomize
        </button>
      </div>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import LineChart from "@/components/charts/LineChart.js";
export default {
  name: 'Home',
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: null
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50-5 + 1)) + 5
    }
  }
}
</script>
<style>
.small {
  max-width: 400px;
  margin:  150px auto;
}
</style>
