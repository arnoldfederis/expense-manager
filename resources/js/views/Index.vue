<template>
  <div class="base-content">
    <div class="card is-visible">
      <div class="card-content">
        <div class="card-header-content">
          <h1 class="title has-text-weight-bold">Expenses Chart</h1>
          <router-link class="button is-primary" :to="{ name: 'createExpense' }">Create Expense</router-link>
        </div>

        <hr>

        <div v-if="chartData.length > 0">
          <div class="filter-column is-visible">
            <div class="columns is-multiline">
              <div class="column">
                <b-field>
                  <date-pick
                    @input="updateDateFilter($event, 'from')"
                    class="base-form"
                    :inputAttributes="{ readonly: true }"
                    :value="filter.from"
                    :format="'YYYY-MM-DD'"
                  ></date-pick>
                </b-field>
              </div>

              <div class="column">
                <b-field>
                  <date-pick
                    @input="updateDateFilter($event, 'to')"
                    class="base-form"
                    :inputAttributes="{readonly: true}"
                    :value="filter.to"
                    :format="'YYYY-MM-DD'"
                    :isDateDisabled="minDate"
                  ></date-pick>
                </b-field>
              </div>
            </div>
          </div>

          <hr>

          <div v-if="viewChart">
            <div>
              <h1 class="subtitle has-text-weight-bold has-text-right">Total Expenses:&nbsp;P{{ totalExpense }}</h1>
              <hr>
            </div>
            <expense-chart :chart-labels="chartLabels" :chart-data="chartData"></expense-chart>
          </div>
        </div>

        <div v-else class="base-color has-text-centered has-text-weight-bold">
          No Records Found.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { tableMixins } from '../mixins/tableMixins';

export default {
  computed: {
    ...mapGetters({
      filter: 'expenseChart/getFilter',
      chartLabels: 'expenseChart/getChartLabels',
      chartData: 'expenseChart/getChartData',
      viewChart: 'expenseChart/getViewChart',
      totalExpense: 'expenseChart/getTotalExpense',
    })
  },

  mixins: [tableMixins],

  mounted() {
    this.fetchData()
    setTimeout(() => this.$store.commit('app/setIsLoading', false), 300)
  },

  methods: {
    ...mapActions({
      fetchData: 'expenseChart/fetchData'
    }),

    ...mapMutations({
      setFilter: 'expenseChart/setFilter'
    })
  }
}
</script>

<style scoped>

</style>
