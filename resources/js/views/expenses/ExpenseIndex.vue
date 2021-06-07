<template>
  <div class="base-content">
    <div class="card" :class="{ 'is-visible': !isLoading }">
      <div class="card-content">
        <div class="card-header-content">
          <h1 class="title has-text-weight-bold">Expenses</h1>
          <div>
            <b-button rounded :icon-left="showFilter ? 'times' : 'search'" class="button-icon" @click="toggleFilter"></b-button>
            <router-link class="button is-primary" :to="{ name: 'createExpense' }">Create</router-link>
          </div>
        </div>

        <table-filter
            search-place-holder="Expense"
            store-module="expense"
            :filter="filter"
            :view-clear-filter="filter.expense_category_id"
            :set-filter="setFilter"
            :set-search="setSearch"
            :fetch-data="fetchData"
        >
          <template v-slot:left>
            <b-field>
              <b-select placeholder="Select Category" :value="filter.expense_category_id" class="base-form" name="expense_category_id" @input.native="updateFilter">
                <option
                    v-for="expenseCategory in expenseCategories"
                    :value="expenseCategory.id"
                    :key="expenseCategory.id">
                  {{ expenseCategory.name }}
                </option>
              </b-select>
            </b-field>
          </template>
        </table-filter>

        <hr>

        <div v-if="data.length > 0">
          <b-table
            :data="data"
            :narrowed="true"
            :loading="false"
            :mobile-cards="true">

            <b-table-column field="user_id" label="User" v-slot="props">
              {{ props.row.user.name | truncateString(30) }}
            </b-table-column>

            <b-table-column field="description" label="Description" v-slot="props">
              {{ props.row.description | truncateString(30) }}
            </b-table-column>

            <b-table-column field="expense_category_id" label="Expense Category" v-slot="props">
              {{ props.row.expense_category.name | truncateString(30) }}
            </b-table-column>

            <b-table-column field="amount" label="Amount" v-slot="props">
              P{{ props.row.amount | truncateString(30) }}
            </b-table-column>

            <b-table-column label="Details" v-slot="props">
              <a class="view-details has-text-weight-bold" @click="openDialog({ options: { message: dialogMessage(props.row), cancelText: 'Done' }, edit: true, row: props.row, name: 'editExpense' })">View</a>
            </b-table-column>

            <b-table-column field="updated_at" label="Updated Date" v-slot="props">
              {{ props.row.updated_at | toDate }}
            </b-table-column>

            <b-table-column v-slot="props">
              <div>
                <router-link class="button is-info is-light" :to="{ name: 'editExpense', params: { id: props.row.id } }">Edit</router-link>
                <button @click="deleteRecord({row: props.row, action: 'expense/deleteData'})" class="button is-danger is-light">Delete</button>
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
      data: 'expense/getPaginatedData',
      total: 'expense/getTotal',
      filter: 'expense/getFilter',
      expenseCategories: 'expenseCategory/getAllData'
    })
  },

  mixins: [tableMixins],

  mounted() {
    this.fetchData(1)
    this.$store.dispatch('expenseCategory/fetchAllData', { order: 'asc', column: 'name', get_all: true })
  },

  methods: {
    ...mapActions({
      fetchData: 'expense/fetchPaginatedData'
    }),

    ...mapMutations({
      setSearch: 'expense/setSearch',
      setFilter: 'expense/setFilter'
    }),

    dialogMessage(payload) {
      const { description, amount, expense_category: expenseCategory, expense_date: expenseDate, user } = payload

      return `
        <div style='line-break: anywhere; font-weight: normal'>
          <div class='field'>
            <h1 class='has-text-weight-bold is-capitalized'>User:</h1>
            ${user.name}
          </div>
          <div class='field'>
            <h1 class='has-text-weight-bold is-capitalized'>Description:</h1>
            ${description}
          </div>
          <div class='field'>
            <h1 class='has-text-weight-bold'>Expense Category:</h1>
            ${expenseCategory.name}
          </div>
          <div class='field'>
            <h1 class='has-text-weight-bold'>Amount:</h1>
            P${amount}
          </div>
          <div class='field'>
            <h1 class='has-text-weight-bold'>Expense Date:</h1>
            ${expenseDate}
          </div>
        </div>
      `;
    }
  }
}
</script>
