<template>
  <section>
    <b-sidebar type="is-light" :fullheight="true" v-model="sidebarStatus" :can-cancel="false">
      <div class="p-1">
        <div class="sidebar-link">
          <router-link class="has-text-weight-bold" to="/">
            <img src="https://laravel.com/img/logomark.min.svg" />
          </router-link>
        </div>
        <b-menu>
          <b-menu-list>
            <b-menu-item v-for="(menu, index) in menus" :key="index" :label="menu.label" tag="router-link" :to="menu.path" v-if="can(menu.permission)"></b-menu-item>
            <b-menu-item label="Logout" @click="logout" class="logout-link"></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      sidebarStatus: 'app/getSidebarStatus'
    })
  },

  data() {
    return {
      menus: [
        {
          label: 'Expenses',
          path: '/expenses',
          permission: 'view_expense'
        },
        {
          label: 'Expense Categories',
          path: '/expense-categories',
          permission: 'view_expense_category'
        },
        {
          label: 'Settings',
          path: '/settings',
          permission: 'view_setting'
        }
      ]
    }
  },

  mounted() {
    this.closeSidebar()
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),

    closeSidebar() {
      if (window.innerWidth <= 1024) {
        this.$store.commit('app/setSidebarStatus', false)
      }
    },

    watchRoute() {
      this.closeSidebar()
    }
  },

  watch: {
    '$route': 'watchRoute'
  }
}
</script>

<style lang="scss">
.sidebar-content {
  background-color: white !important;
  .sidebar-link {
    text-align: center;
    a {
      display: block;
    }

    img {
      width: 18%;
    }
  }

  .menu-list {
    a {
      padding: 1rem;
      font-weight: bold;
      &:hover, &.is-active {
        background-color: #eeeeee;
        border-radius: 5px;
        color: #363636;
      }

      &:focus {
        outline: none !important;
      }
    }
  }
}
</style>
