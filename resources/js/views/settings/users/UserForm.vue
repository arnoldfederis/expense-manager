<template>
  <div class="base-content">
    <div class="card" :class="{ 'is-visible': !isLoading }">
      <div class="card-content">
        <div class="card-header-content">
          <h1 class="title has-text-weight-bold">
            <span v-if="action === 'create'">Create User</span>
            <span v-if="action === 'edit'">Edit {{ name }}</span>
          </h1>
        </div>

        <hr>

        <form @submit.prevent="save('user')" @keydown="form.errors.clear($event.target.name)">
          <div class="columns">
            <div class="column is-half">
              <b-field label="Name" :message="form.errors.inputMessage('name')" :type="form.errors.inputType('name')">
                <b-input class="base-form" name="name" :value="form.name" @input.native="updateForm" placeholder="Input Name"></b-input>
              </b-field>
            </div>

            <div class="column is-half">
              <b-field label="Email" :message="form.errors.inputMessage('email')" :type="form.errors.inputType('email')">
                <b-input class="base-form" name="email" :value="form.email" @input.native="updateForm" placeholder="Input Email"></b-input>
              </b-field>
            </div>
          </div>

          <b-field label="Password" :message="form.errors.inputMessage('password')" :type="form.errors.inputType('password')">
            <b-input class="base-form" name="password" :value="form.password" @input.native="updateForm" placeholder="Input Password"></b-input>
          </b-field>

          <div class="columns">
            <div class="column is-half">
              <div class="field">
                <label class="label">Role</label>
                <div class="field" v-for="role in roles" :key="role.id">
                  <div class="control">
                    <b-radio name="role" :value="form.role" :native-value="role.id" @input.native="updateForm" class="has-text-weight-bold">{{ role.name.toUpperCase() }}</b-radio>
                  </div>
                </div>
                <p class="help is-danger" v-if="form.errors.has('role')">{{ form.errors.get('role') }}</p>
              </div>
            </div>

            <div class="column is-half">
              <div class="field">
                <label class="label">Status</label>
                <div class="field" v-for="(status, index) in userStatus" :key="index">
                  <div class="control">
                    <b-radio name="status" :value="form.status" :native-value="status.value" @input.native="updateForm" class="has-text-weight-bold">{{ status.value.toUpperCase() }}</b-radio>
                  </div>
                </div>
                <p class="help is-danger" v-if="form.errors.has('status')">{{ form.errors.get('status') }}</p>
              </div>
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click="save('user')" :class="{ 'is-loading': isSaving }">Save</a>
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
      form: 'user/getForm',
      name: 'user/getName',
      path: 'user/getPath',
      userStatus: 'user/getUserStatus',
      roles: 'role/getAllData'
    })
  },


  mixins: [formMixins],

  mounted() {
    this.$store.dispatch('role/fetchAllData', { order: 'asc', column: 'name', get_all: true })

    if (this.action === 'edit') {
      this.$store.dispatch('user/fetchSingleData', { param: this.$route.params.id, nameColumn: 'name' })
    }
  },

  methods: {
    ...mapMutations({
      setForm: 'user/setForm'
    }),
  },
}
</script>
