<template>
  <div class="base-content">
    <div class="card" :class="{ 'is-visible': !isLoading }">
      <div class="card-content">
        <div class="card-header-content">
          <h1 class="title has-text-weight-bold">Change Password</h1>
        </div>

        <hr>

        <form @submit.prevent="save('userPassword')" @keydown="form.errors.clear($event.target.name)">
          <b-field label="Old Password" :message="form.errors.inputMessage('old_password')" :type="form.errors.inputType('old_password')">
            <b-input class="base-form" type="password" name="old_password" :value="form.old_password" @input.native="updateForm" placeholder="Input Old Password"></b-input>
          </b-field>

          <b-field label="New Password" :message="form.errors.inputMessage('password')" :type="form.errors.inputType('password')">
            <b-input class="base-form" type="password" name="password" :value="form.password" @input.native="updateForm" placeholder="Input New Password"></b-input>
          </b-field>

          <b-field label="Confirm Password" :message="form.errors.inputMessage('password_confirmation')" :type="form.errors.inputType('password_confirmation')">
            <b-input class="base-form" type="password" name="password_confirmation" :value="form.password_confirmation" @input.native="updateForm" placeholder="Input Confirm Password"></b-input>
          </b-field>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click="save('userPassword')" :class="{ 'is-loading': isSaving }">Save</a>
            </p>
            <p class="control">
              <a class="button is-light" @click="cancel">Cancel</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { formMixins } from '../../../mixins/formMixins';

export default {
  props: ['action'],

  computed: {
    ...mapGetters({
      form: 'userPassword/getForm',
      path: 'userPassword/getPath'
    })
  },

  mixins: [formMixins],

  mounted() {
    setTimeout(() => this.$store.commit('app/setIsLoading', false), 300)
  },

  methods: {
    ...mapMutations({
      setForm: 'userPassword/setForm'
    }),
  },
}
</script>
