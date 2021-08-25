import { mutationMixins } from '../mixins/mutationMixins'
import { getterMixins } from '../mixins/getterMixins'
import { defaultDateFilter } from '../mixins/stateMixins'
import { apiUrl } from '../helpers';

const state = () => ({
  chartLabels: [],
  chartData: [],
  totalExpense: 0,
  filter: defaultDateFilter,
  viewChart: false
})

const getters = {
  ...getterMixins,
  getChartLabels: state => state.chartLabels,
  getChartData: state => state.chartData,
  getViewChart: state => state.viewChart,
  getTotalExpense: state => state.totalExpense
}

const mutations = {
  ...mutationMixins(),

  setChartLabels(state, labels) {
    state.chartLabels = labels
  },

  setChartData(state, data) {
    state.chartData = data
  },

  setViewChart(state, bool) {
    state.viewChart = bool
  },

  setTotalExpense(state, total) {
    state.totalExpense = total
  }
}

const actions = {
  fetchData({ commit, state, dispatch }) {
    commit('setViewChart', false)

    axios.get(`${apiUrl}/expense-chart`, { params: state.filter })
      .then(({ data }) => {
        commit('setChartLabels', Object.keys(data))
        commit('setChartData', Object.values(data))
        commit('setTotalExpense', _.sum(Object.values(data).map(expense => parseFloat(expense))))
        setTimeout(() => commit('setViewChart', true), 300)
      })
      .catch((response) => {
        setTimeout(() => commit('setViewChart', false), 300)
        dispatch('app/openSnackbar', { message: response.data.message, type: 'is-danger' }, { root: true })
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
