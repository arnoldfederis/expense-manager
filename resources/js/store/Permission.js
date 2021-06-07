import { apiUrl } from '../helpers'
import { mutationMixins } from '../mixins/mutationMixins'
import { getterMixins } from '../mixins/getterMixins'
import { actionMixins } from '../mixins/actionMixins'
import { stateMixins, defaultDateFilter } from '../mixins/stateMixins'

const state = () => ({
  form: new Form({
    name: null,
    email: null,
    password: null,
    role: null
  }),
  apiUrl: `${apiUrl}/settings/permissions`,
  path: '/settings/permissions',
  filter: defaultDateFilter,
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
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
