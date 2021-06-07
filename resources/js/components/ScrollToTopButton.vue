<template>
  <b-button rounded icon-left="chevron-up" class="button-icon is-primary scroll-to-top" :class="{ 'show': fixedButton }" v-scroll-to="{ element: '.navbar' }"></b-button>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  data() {
    return {
      fixedButton: false
    }
  },

  methods: {
    handleScroll() {
      this.fixedButton = window.scrollY >= 160
    }
  }
}
</script>
