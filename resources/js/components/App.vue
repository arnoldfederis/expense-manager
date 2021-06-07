<template>
  <div class="app" :class="{ 'remove-margin': !sidebarStatus }" v-if="isLoggedIn && hasPage">
    <navbar></navbar>
    <sidebar></sidebar>

    <div class="is-relative">
      <b-loading :is-full-page="false" :active="isLoading"></b-loading>
      <router-view></router-view>
    </div>

    <scroll-to-top></scroll-to-top>
  </div>

  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { get, can } from '../helpers'

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      sidebarStatus: 'app/getSidebarStatus',
      isLoading: 'app/getIsLoading',
      hasPage: 'app/getHasPage'
    })
  },

  mounted() {
    this.$store.dispatch('auth/validateUser')

    if (get('theme')) {
      this.$store.commit('app/setTheme', get('theme'))
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.$store.commit('app/setTheme', 'dark')
    }
  },

  watch: {
    isLoggedIn(newVal) {
      if (newVal) {
        setTimeout(() => this.$store.commit('app/setIsLoading', false), 300)
      } else {
        this.$store.commit('app/setIsLoading', true)
      }
    },

    $route(to) {
      if (to.path !== '/' && to.path !== '/login' && to.path !== '/signup') {
        if (!can(to.meta.permission)) {
          this.$router.push('/');
        }
      }
    }
  }
}
</script>

<style lang="scss">
.app {
  &.remove-margin {
    margin-left: 0;
  }

  margin-left: 260px;
  transition: margin-left 300ms;
}

@media (max-width: 1023px) {
  .app {
    margin-left: 0 !important;
  }
}

</style>
