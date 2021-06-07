import { remove, set } from '../helpers';

export const mutationMixins = () => {
  return {
    setPaginatedData(state, paginatedData) {
      state.paginatedData = paginatedData || []
    },

    setAllData(state, allData) {
      state.allData = allData || []
    },

    setForm(state, data) {
      state.form = Object.assign(state.form, data)
    },

    setName(state, name) {
      state.name = name
    },

    setTotal(state, total) {
      state.total = total
    },

    setSearch(state, search) {
      state.filter.search = search || undefined
    },

    setFilter(state, data) {
      state.filter = Object.assign(state.filter, data)
    },

    resetFilter(state) {
      const filters = _.pickBy(state.filter, (value, key) => (key !== 'from' && key !== 'to'))
      Object.keys(filters).forEach(index => state.filter[index] = null);
    },

    setAccessToken(state, accessToken) {
      set('access_token', accessToken);
      state.accessToken = accessToken;
    },

    setAuthUser(state, user) {
      state.user = user
    },

    removeAccessToken(state) {
      remove('access_token')
      remove('permissions')
      state.access_token = null;
    },

    setPermissions(state, permissions) {
      set('permissions', JSON.stringify(permissions))
    },

    setRole(state, role) {
      state.role = role
    }
  }
}
