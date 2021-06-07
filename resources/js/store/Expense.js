import { apiUrl } from '../helpers'
import { mutationMixins } from '../mixins/mutationMixins'
import { getterMixins } from '../mixins/getterMixins'
import { actionMixins } from '../mixins/actionMixins'
import { stateMixins, defaultDateFilter } from '../mixins/stateMixins'

const state = () => ({
  form: new Form({
    expense_category_id: null,
    description: null,
    amount: null,
    expense_date: moment().format('YYYY-MM-DD HH:mm')
  }),
  apiUrl: `${apiUrl}/expenses`,
  path: '/expenses',
  filter: {
    search: null,
    expense_category_id: null,
    ...defaultDateFilter
  },
  ...stateMixins
})

const getters = {
  ...getterMixins
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
