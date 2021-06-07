<template>
  <nav class="navbar has-shadow base-navbar" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
      <div class="left-icon">
        <router-link to="/" class="navbar-icon" :class="{ 'show': !sidebar }">
          <img src="https://laravel.com/img/logomark.min.svg">
        </router-link>
      </div>
      <div class="right-icon">
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="openSidebar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

        <theme-button></theme-button>
      </div>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item navbar-icon" :class="{ 'show': !sidebar }">
          <img src="https://laravel.com/img/logomark.min.svg">
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <theme-button></theme-button>
        </div>

        <a role="button" class="navbar-item navbar-burger" aria-label="menu" aria-expanded="false" @click="openSidebar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      sidebar: 'app/getSidebarStatus'
    })
  },

  methods: {
    ...mapActions({
      openSidebar: 'app/openSidebar',
    })
  }
}
</script>

<style lang="scss">
.base-navbar {
  background-color: whitesmoke !important;
  .navbar-burger {
    color: black !important;
  }

  .navbar-brand {
    align-items: center;
    justify-content: space-between;
    .right-icon {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
    }
    .navbar-burger {
      margin-left: unset !important;
      color: black !important;
    }
  }
}

@media screen and (min-width: 1024px) {
  .base-navbar {
    .navbar-brand {
      .button-icon, .navbar-icon {
        display: none;
      }
    }
  }
}
</style>
