import { apiUrl } from '../helpers'
import { mutationMixins } from '../mixins/mutationMixins'
import { getterMixins } from '../mixins/getterMixins'
import { actionMixins } from '../mixins/actionMixins'
import { stateMixins, defaultDateFilter } from '../mixins/stateMixins'

const state = () => ({
  form: new Form({
    name: null,
    permissions: []
  }),
  apiUrl: `${apiUrl}/settings/roles`,
  path: '/settings/roles',
  filter: defaultDateFilter,
  ...stateMixins
})

const getters = {
  ...getterMixins
}

const mutations = {
  ...mutationMixins(),

  setWithDefaultPermission(state, data) {
    data.permissions = data.permissions.map(permission => permission.id);
    state.form = Object.assign(state.form, data)
  }
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
