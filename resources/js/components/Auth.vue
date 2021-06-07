<template>
  <div class="base-content">
    <div class="login-container">
      <div class="card is-visible">
        <div class="card-content">
          <div class="card-header-content">
            <div>
              <img class="brand-icon" src="https://laravel.com/img/logomark.min.svg">
              <h1 class="title">Expense Manager App</h1>
            </div>
          </div>

          <form @submit.prevent="login" @keydown="form.errors.clear($event.target.name)">
            <b-field label="Email" :message="this.form.errors.inputMessage('email')" :type="this.form.errors.inputType('email')">
              <b-input class="base-form" name="email" v-model="form.email"></b-input>
            </b-field>

            <b-field label="Password" :message="this.form.errors.inputMessage('password')" :type="this.form.errors.inputType('password')">
              <b-input class="base-form" type="password" name="password" v-model="form.password"></b-input>
            </b-field>

            <b-field class="py-4">
              <a class="button is-primary is-block" @click="login" :class="{ 'is-loading': isSaving }">Login</a>
            </b-field>
          </form>

          <div class="hr-content">
            <hr>
            <div class="hr-or">
              <p>OR</p>
            </div>
          </div>

          <b-field class="py-4">
            <router-link class="button is-light is-block" to="/signup">Signup</router-link>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { get } from '../helpers';

export default {
  computed: {
    ...mapGetters({
      form: 'auth/getForm',
      isSaving: 'app/getIsSaving'
    })
  },

  mounted() {
    this.$store.commit('app/setHasPage', false)

    if (get('theme')) {
      this.$store.commit('app/setTheme', get('theme'))
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.$store.commit('app/setTheme', 'dark')
    }
  },

  methods: {
    ...mapMutations({
      setForm: 'auth/setForm',
    }),

    updateForm(e) {
      const { name, value } = e.target;
      this.setForm({
        ...this.form, [name]: value
      })
    },

    login() {
      this.$store.dispatch('auth/login', this.form)
    }
  },

  beforeDestroy() {
    this.$store.dispatch('app/resetForm', this.form)
  }
}
</script>

<style lang="scss" scoped>
  .base-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .login-container {
    display: flex;
    justify-content: center;
    align-content: center;

    .card {
      max-width: 400px !important;
      width: 100%;
      margin: 0 0.75rem;

      &-header-content {
        text-align: center;
        margin-bottom: 1rem;
        justify-content: center !important;
        img {
          width: 25%;
        }
      }
    }

    .hr-content {
      position: relative;
      .hr-or {
        top: -17px;
        position: absolute;
        left: 44.5%;
        border: 2px solid whitesmoke;
        border-radius: 50%;
        padding: 10px;
        font-size: 10px;
        font-weight: bold;
        color: #363636;
        background-color: white;
        user-select: none;
      }
    }
  }
</style>
