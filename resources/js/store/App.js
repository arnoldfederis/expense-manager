import {
  DialogProgrammatic as Dialog,
  SnackbarProgrammatic as Snackbar
} from 'buefy'

import router from '../routes'
import { get, remove, set } from '../helpers'

const state = () => ({
  sidebar: get('active_sidebar'),
  showFilter: true,
  filterResult: false,
  theme: null,
  isSaving: false,
  isLoading: true,
  hasPage: true
});

const getters = {
  getSidebarStatus: state => state.sidebar,
  getShowFilter: state => state.showFilter,
  getFilterResult: state => state.filterResult,
  getTheme: state => state.theme,
  getIsSaving: state => state.isSaving,
  getIsLoading: state => state.isLoading,
  getHasPage: state => state.hasPage
}

const mutations = {
  setSidebarStatus(state, toggled) {
    if (toggled) {
      set('active_sidebar', toggled)
    } else {
      remove('active_sidebar')
    }

    state.sidebar = toggled
  },

  setShowFilter(state, toggled) {
    state.showFilter = toggled
  },

  setFilterResult(state, toggled) {
    state.filterResult = toggled
  },

  setTheme(state, theme) {
    state.theme = theme
    set('theme', theme)

    _.first(document.getElementsByTagName('html')).setAttribute('data-theme', theme)
  },

  setIsSaving(state, saving) {
    state.isSaving = saving
  },

  setIsLoading(state, loading) {
    state.isLoading = loading
  },

  setHasPage(state, hasPage) {
    state.hasPage = hasPage
  }
}

const actions = {
  openDialog(context, payload) {
    const { options, edit, row, name } = payload

    Dialog.confirm({
      ...options,
      confirmText: edit ? 'Edit' : 'Done',
      type: 'is-primary',
      onConfirm: () => {
        if (!edit) {
          return
        }

        return router.push({ name, params: { id: row.id }})
      }
    });
  },

  cancelCreate(context, payload) {
    const { path } = payload

    Dialog.confirm({
      message: `Are you sure you want to cancel?`,
      confirmText: 'Yes',
      type: 'is-primary',
      onConfirm: () => router.push(path)
    });
  },

  deleteRecord({ dispatch }, payload) {
    const { action, row } = payload
    Dialog.confirm({
      message: `Are you sure you want to delete this?`,
      confirmText: 'Yes',
      type: 'is-danger',
      onConfirm: () => dispatch(action, row, { root: true })
    });
  },

  openSnackbar(context, options) {
    Snackbar.open({
      ...options,
      position: 'is-bottom-right'
    })
  },

  openSidebar({ commit, state }) {
    commit('setSidebarStatus', !state.sidebar)

    if (state.sidebar) {
      set('active_sidebar', true)
    } else {
      remove('active_sidebar')
    }
  },

  saveData({ dispatch, commit }, payload) {
    const { form, url } = payload
    const idParam = router.currentRoute.params.id;
    commit('setIsSaving', true)

    if (idParam) {
      form.put(`${url}/${idParam}`)
        .then(() => dispatch('onSavingSuccess', { ...payload, message: 'Successfully Updated' }))
        .catch((response) => dispatch('onSavingError', response))
    } else {
      form.post(url)
        .then(() => dispatch('onSavingSuccess', { ...payload, message: 'Successfully Added' }))
        .catch((response) => dispatch('onSavingError', response))
    }
  },

  onSavingSuccess({ dispatch, commit }, payload) {
    const { path, message } = payload

    commit('setIsSaving', false)
    dispatch('openSnackbar', { message })
    return router.push(path)
  },

  onSavingError({ dispatch, commit }, response) {
    commit('setIsSaving', false)

    if (response.status !== 422) {
      dispatch('openSnackbar', { message: "There's something wrong. Please try again.", type: 'is-danger' })
    }
  },

  resetForm(context, form) {
    form.reset()
  },

  toggleFilter({ state, commit }) {
    commit('setShowFilter', !state.showFilter)
  },

  toggleFilterResult({ state, commit }) {
    commit('setFilterResult', !state.filterResult)
  },

  toggleTheme({ commit }) {
    let html = _.first(document.getElementsByTagName('html'))
    let theme = html.dataset.theme === 'dark' ? 'light' : 'dark'
    commit('setTheme', theme)
    html.setAttribute('data-theme', theme);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
