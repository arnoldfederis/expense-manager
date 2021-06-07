import { mutationMixins } from '../mixins/mutationMixins'
import { getterMixins } from '../mixins/getterMixins'
import { defaultDateFilter } from '../mixins/stateMixins'
import { apiUrl } from '../helpers';

const state = () => ({
  chartLabels: [],
  chartData: [],
  filter: defaultDateFilter,
  viewChart: false
})

const getters = {
  ...getterMixins,

  getChartLabels: state => state.chartLabels,
  getChartData: state => state.chartData,
  getViewChart: state => state.viewChart
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
  }
}

const actions = {
  fetchData({ commit, state, dispatch }) {
    commit('setViewChart', false)

    axios.get(`${apiUrl}/expense-chart`, { params: state.filter })
      .then(({ data }) => {
        console.log(Object.keys(data), 'Object.keys(data)')
        console.log(Object.values(data), 'Object.values(data)')
        commit('setChartLabels', Object.keys(data))
        commit('setChartData', Object.values(data))
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
