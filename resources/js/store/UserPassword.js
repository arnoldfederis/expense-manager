import { apiUrl } from '../helpers'
import { mutationMixins } from '../mixins/mutationMixins'
import { getterMixins } from '../mixins/getterMixins'
import { actionMixins } from '../mixins/actionMixins';

const state = () => ({
  form: new Form({
    old_password: null,
    password: null,
    password_confirmation: null
  }),
  apiUrl: `${apiUrl}/settings/change-password`,
  path: '/settings'
})

const getters = {
  ...getterMixins,
}

const mutations = {
  ...mutationMixins()
}

const actions = {
  ...actionMixins()
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
