<template>
  <b-button rounded :icon-left="theme === 'dark' ? 'sun' : 'moon'" class="button-icon toggle-theme" :class="{ 'is-dark': theme === 'dark', 'is-light': theme === 'light' }" @click="toggleTheme"></b-button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      theme: 'app/getTheme'
    })
  },

  methods: {
    ...mapActions({
      toggleTheme: 'app/toggleTheme'
    })
  }
}
</script>
