<template>
  <div class="base-content">
    <div class="card" :class="{ 'is-visible': !isLoading }">
      <div class="card-content">
        <div class="card-header-content">
          <h1 class="title has-text-weight-bold">Users</h1>
          <div>
            <b-button rounded :icon-left="showFilter ? 'times' : 'search'" class="button-icon" @click="toggleFilter"></b-button>
            <router-link class="button is-primary" :to="{ name: 'createUser' }">Create</router-link>
          </div>
        </div>

        <table-filter
            search-place-holder="User"
            store-module="user"
            :filter="filter"
            :view-clear-filter="filter.status"
            :set-filter="setFilter"
            :set-search="setSearch"
            :fetch-data="fetchData"
            >

          <template v-slot:left>
            <b-field>
              <b-select placeholder="Select Status" :value="filter.status" class="base-form" name="status" @input.native="updateFilter">
                <option
                    v-for="(status, index) in userStatus"
                    :value="status.value"
                    :key="status.id">
                  {{ status.value.toUpperCase() }}
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

            <b-table-column field="name" label="Name" v-slot="props">
              {{ props.row.name | truncateString(30) }}
            </b-table-column>

            <b-table-column field="email" label="Email" v-slot="props">
              {{ props.row.email | truncateString(30) }}
            </b-table-column>

            <b-table-column field="status" label="Status" v-slot="props">
              <b-tag v-if="props.row.status === 'active'" type="is-primary" class="has-text-weight-bold is-uppercase">Active</b-tag>
              <b-tag v-else :type="theme === 'dark' ? 'is-dark' : 'is-light'" class="has-text-weight-bold is-uppercase">Inactive</b-tag>
            </b-table-column>

            <b-table-column field="role_name" label="Role" v-slot="props">
              <b-tag :type="theme === 'dark' ? 'is-dark' : 'is-light'" class="has-text-weight-bold is-uppercase">{{ props.row.role_name }}</b-tag>
            </b-table-column>

            <b-table-column field="updated_at" label="Updated Date" v-slot="props">
              {{ props.row.updated_at | toDate }}
            </b-table-column>

            <b-table-column v-slot="props">
              <div>
                <router-link class="button is-info is-light" :to="{ name: 'editUser', params: { id: props.row.id } }">Edit</router-link>
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
import { tableMixins } from '../../../mixins/tableMixins';

export default {
  computed: {
    ...mapGetters({
      data: 'user/getPaginatedData',
      total: 'user/getTotal',
      filter: 'user/getFilter',
      userStatus: 'user/getUserStatus',
      theme: 'app/getTheme',
    })
  },

  mixins: [tableMixins],

  mounted() {
    this.fetchData(1)
  },

  methods: {
    ...mapActions({
      fetchData: 'user/fetchPaginatedData'
    }),

    ...mapMutations({
      setSearch: 'user/setSearch',
      setFilter: 'user/setFilter'
    })
  }
}
</script>
