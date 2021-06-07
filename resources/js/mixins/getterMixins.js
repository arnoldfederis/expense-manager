export const getterMixins = {
  getPaginatedData: state => state.paginatedData,
  getAllData: state => state.allData,
  getTotal: state => state.total,
  getFilter: state => state.filter,
  getForm: state => state.form,
  getName: state => state.name,
  getPath: state => state.path,
  isLoggedIn: state => !!state.accessToken || false,
  getRole: state => state.role
}
