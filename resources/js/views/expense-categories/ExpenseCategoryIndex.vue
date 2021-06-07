<template>
  <div class="base-content">
    <div class="card" :class="{ 'is-visible': !isLoading }">
      <div class="card-content">
        <div class="card-header-content">
          <h1 class="title has-text-weight-bold">Expense Categories</h1>
          <div>
            <b-button rounded :icon-left="showFilter ? 'times' : 'search'" class="button-icon" @click="toggleFilter"></b-button>
            <router-link class="button is-primary" :to="{ name: 'createExpenseCategory' }">Create</router-link>
          </div>
        </div>

        <table-filter
            search-place-holder="Expense Category"
            store-module="expenseCategory"
            :filter="filter"
            :set-filter="setFilter"
            :set-search="setSearch"
            :fetch-data="fetchData"
        ></table-filter>

        <hr>

        <div v-if="data.length > 0">
          <b-table
              :data="data"
              :narrowed="true"
              :loading="false"
              :mobile-cards="true">

            <b-table-column field="name" label="Name" v-slot="props">
              {{ props.row.name | truncateString(30) }}
            </b-table-column>

            <b-table-column field="updated_at" label="Updated Date" v-slot="props">
              {{ props.row.updated_at | toDate }}
            </b-table-column>

            <b-table-column v-slot="props">
              <div>
                <router-link class="button is-info is-light" :to="{ name: 'editExpenseCategory', params: { id: props.row.id } }">Edit</router-link>
                <button @click="deleteRecord({row: props.row, action: 'expenseCategory/deleteData'})" class="button is-danger is-light">Delete</button>
              </div>
            </b-table-column>
          </b-table>

          <hr>

          <b-pagination
              :total="total"
              v-model="currentPage"
              order="is-right"
              :simple="true"
              :rounded="true"
              :per-page="perPage"
              class="base-simple-pagination"
              @change="handlePagination">
          </b-pagination>
        </div>

        <div class="base-color has-text-centered has-text-weight-bold" v-else>
          No Records Found.
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { tableMixins } from '../../mixins/tableMixins';

export default {
  computed: {
    ...mapGetters({
      data: 'expenseCategory/getPaginatedData',
      total: 'expenseCategory/getTotal',
      filter: 'expenseCategory/getFilter',
    })
  },

  mixins: [tableMixins],

  mounted() {
    this.fetchData(1)
  },

  methods: {
    ...mapActions({
      fetchData: 'expenseCategory/fetchPaginatedData'
    }),

    ...mapMutations({
      setSearch: 'expenseCategory/setSearch',
      setFilter: 'expenseCategory/setFilter'
    })
  }
}
</script>
