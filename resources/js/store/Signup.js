import router from '../routes';
import { apiUrl } from '../helpers';
import { mutationMixins } from '../mixins/mutationMixins';
import { stateMixins } from '../mixins/stateMixins';
import { getterMixins } from '../mixins/getterMixins';
import { actionMixins } from '../mixins/actionMixins';

const state = () => ({
  form: new Form({
    name: null,
    email: null,
    password: null,
    password_confirmation: null
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
  ...actionMixins(),

  signup({ commit, dispatch }, form) {
    commit('app/setIsSaving', true, { root: true })

    form.post(`${apiUrl}/signup`)
      .then((data) => {
        commit('app/setIsSaving', false, { root: true })
        commit('app/setHasPage', true, { root: true })
        commit('setAccessToken', data.token || null)
        dispatch('validateUser')
        router.push('/')
      })
      .catch((response) => {
        commit('app/setIsSaving', false, { root: true })
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
