import VueScrollTo from 'vue-scrollto';
import { mapActions, mapGetters } from 'vuex';


export const tableMixins = {
  computed: {
    ...mapGetters({
      isLoading: 'app/getIsLoading',
      showFilter: 'app/getShowFilter',
      filterResult: 'app/getFilterResult'
    })
  },

  data() {
    return {
      currentPage: 1,
      perPage: 25
    }
  },

  methods: {
    ...mapActions({
      deleteRecord: 'app/deleteRecord',
      openDialog: 'app/openDialog',
      toggleFilter: 'app/toggleFilter',
    }),

    updateSearch: _.debounce(function (e) {
      this.setSearch(e.target.value)
      this.fetchData(1)
    }, 500),

    handlePagination(page) {
      VueScrollTo.scrollTo('.navbar')
      this.fetchData(page)
    },

    async toggleFilterResult() {
      await this.$store.dispatch('app/toggleFilterResult')
    },

    minDate(date) {
      const minDate = new Date(this.filter.from);
      return date < minDate;
    },

    updateFilter(e) {
      const { name, value } = e.target;
      this.setFilter({
        ...this.filterResult, [name]: value
      })

      this.fetchData(1)
    },

    clearFilter(module) {
      this.$store.commit(module)
      this.fetchData(1)
    },

    updateDateFilter(value, name) {
      this.setFilter({
        ...this.filter, [name]: value
      })

      this.fetchData(1)

      if (this.filter.from > this.filter.to) {
        this.updateDateFilter(this.filter.from, 'to')
      }
    },
  },

  async beforeDestroy() {
    await this.$store.commit('app/setFilterResult', false)
  }
};
