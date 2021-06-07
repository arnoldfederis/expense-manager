import { apiUrl } from '../helpers'
import { mutationMixins } from '../mixins/mutationMixins'
import { getterMixins } from '../mixins/getterMixins'
import { actionMixins } from '../mixins/actionMixins'
import { stateMixins, defaultDateFilter } from '../mixins/stateMixins'

const state = () => ({
  form: new Form({
    name: null
  }),
  apiUrl: `${apiUrl}/expense-categories`,
  path: '/expense-categories',
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
