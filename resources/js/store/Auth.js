import router from '../routes';
import { apiUrl } from '../helpers';
import { actionMixins } from '../mixins/actionMixins';
import { mutationMixins } from '../mixins/mutationMixins';
import { getterMixins } from '../mixins/getterMixins';
import { stateMixins } from '../mixins/stateMixins';

const state = () => ({
  form: new Form({
    email: null,
    password: null,
    remember: true
  }),
  ...stateMixins
})

const getters = {
  ...getterMixins
}

const mutations = {
  ...mutationMixins()
}

const actions = {
  login({ commit, dispatch, state }, form) {
    commit('app/setIsSaving', true, { root: true })

    axios.get('/sanctum/csrf-cookie').then(() => {
      form.post(`${apiUrl}/login`)
        .then((data) => {
          commit('app/setIsSaving', false, { root: true })
          commit('app/setHasPage', true, { root: true })
          commit('setAccessToken', data.token || null)
          dispatch('validateUser')
          router.push('/')
        })
        .catch((response) => {
          state.form.password = null
          commit('app/setIsSaving', false, { root: true })
          dispatch('app/openSnackbar', { message: response.data.message, type: 'is-danger' }, { root: true })
        })
    })
    .catch((response) => {
      dispatch('app/openSnackbar', { message: response.data.message, type: 'is-danger' }, { root: true })
    })
  },

  logout({ commit }) {
    axios.get(`${apiUrl}/logout`)
      .then(() => {
        commit('removeAccessToken')
        commit('app/setSidebarStatus', false, { root: true })
        router.push('/login')
      })
  },

  ...actionMixins()
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
