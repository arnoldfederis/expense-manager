import router from '../routes';
import { apiUrl } from '../helpers';

export const actionMixins = () => {
  return {
    fetchPaginatedData({ state, commit }, page) {
      axios.get(state.apiUrl, { params: { page, per_page: state.perPage, ...state.filter }})
      .then(({ data }) => {
        commit('setPaginatedData', data.data)
        commit('setTotal', data.total)
        commit('app/setIsLoading', false, { root: true })
      })
    },

    fetchAllData({ state, commit }, filter) {
      axios.get(state.apiUrl, { params: { ...filter }})
      .then(({ data }) => {
        commit('setAllData', data)
        commit('app/setIsLoading', false, { root: true })
      })
    },

    fetchSingleData({ state, commit }, payload) {
      let { param, nameColumn, setDataMutation } = payload

      axios.get(`${state.apiUrl}/${param}/edit`)
      .then(({ data }) => {
        if (setDataMutation) {
          commit(setDataMutation, data)
        } else {
          commit('setForm', data)
        }
        commit('setName', data[nameColumn])
        commit('app/setIsLoading', false, { root: true })
      })
      .catch(() => router.push(state.path))
    },

    saveData({ state, dispatch }, form) {
      dispatch('app/saveData', { form, url: state.apiUrl, path: state.path }, { root: true })
    },

    deleteData({ state, commit, dispatch }, row) {
      axios.delete(`${state.apiUrl}/${row.id}`)
      .then(() => {
        commit('setPaginatedData', state.paginatedData.filter((curr) => curr.id !== row.id))
        dispatch('app/openSnackbar', { message: 'Successfully Deleted' }, { root: true })
      })
      .catch(() => dispatch('app/openSnackbar', { message: "There's something wrong. Please try again.", type: 'is-danger' }, { root: true }))
    },

    validateUser({ state, commit }) {
      if (!state.accessToken) {
        return
      }

      axios.get(`${apiUrl}/me`)
        .then(({data}) => {
          commit('setAuthUser', data.user)
          commit('setRole', data.role)
          commit('setPermissions', data.permissions)
        })
        .catch(error => {
          if (error.response.status === 401 || error.response.status === 403) {
            commit('removeAccessToken');
            commit('app/setIsLoading', false, { root: true })
            if (window.location.pathname !== '/login') {
              router.push('/login');
            }
          }
        })
    }
  }
}
