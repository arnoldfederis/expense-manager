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
    role: null,
    status: null
  }),
  apiUrl: `${apiUrl}/settings/users`,
  path: '/settings/users',
  filter: {
    ...defaultDateFilter,
    authenticated_user: true
  },
  userStatus: [
    { value: 'active' },
    { value: 'inactive' }
  ],
  ...stateMixins,
})

const getters = {
  ...getterMixins,
  getUserStatus: state => state.userStatus
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
