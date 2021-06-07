<template>
  <div v-cloak>
    <vue-frappe
        id="stats"
        :labels="this.labels"
        type="line"
        :axisOptions="{
          xIsSeries: true,
        }"
        :lineOptions="{
          regionFill: 1,
          hideDots: 1
        }"
        :colors="['#3490dc', '#1cc88a']"
        :dataSets="this.points"
        :tooltipOptions="{
          formatTooltipX: d => moment(d, 'YYYY-MM-DD').format('dddd, MMMM Do'),
          formatTooltipY: d => `P${d}`,
        }">
    </vue-frappe>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment-timezone';
import Chart from 'vue2-frappe'

Vue.use(Chart);
Vue.prototype.moment = moment;

export default {
  props: {
    chartLabels: {
      type: Array,
      required: true
    },

    chartData: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      points: this.chartData,
      labels: this.chartLabels
    }
  }
}
</script>

<style>
#stats > div > svg > g > g.dataset-units.dataset-line.dataset-0 > path.line-graph-path {
  stroke-width: 2px !important;
}
</style>
