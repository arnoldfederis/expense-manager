<template>
  <div class="base-content">
    <div class="card" :class="{ 'is-visible': !isLoading }">
      <div class="card-content">
        <div class="card-header-content">
          <h1 class="title has-text-weight-bold">
            <span v-if="action === 'create'">Create Role</span>
            <span v-if="action === 'edit'">Edit {{ name }}</span>
          </h1>
        </div>

        <hr>

        <form @submit.prevent="save('role')" @keydown="form.errors.clear($event.target.name)">
          <b-field label="Role" :message="form.errors.inputMessage('name')" :type="form.errors.inputType('name')">
            <b-input class="base-form" name="name" :value="form.name" @input.native="updateForm" placeholder="Input Role"></b-input>
          </b-field>

          <div class="field">
            <label class="label">Permissions</label>
            <div class="checkbox-group">
              <div class="is-size-5 field">
                <b-checkbox type="checkbox" @input="selectAll($event)">Select All</b-checkbox>
              </div>
              <div class="field columns is-multiline">
                <div class="column is-one-quarter-tablet is-half-mobile" v-for="permission in permissions" :key="permission.id">
                  <b-checkbox name="permissions[]" v-model="form.permissions" :native-value="permission.id" @input.native="updateForm">
                    {{ permission.name }}
                  </b-checkbox>
                </div>
              </div>
              <p class="help is-danger" v-if="form.errors.has('permissions')">{{ form.errors.get('permissions') }}</p>
              <hr>
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click="save('role')" :class="{ 'is-loading': isSaving }">Save</a>
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
      form: 'role/getForm',
      name: 'role/getName',
      path: 'role/getPath',
      permissions: 'permission/getAllData'
    }),
  },

  mixins: [formMixins],

  mounted() {
    this.$store.dispatch('permission/fetchAllData', { get_all: true })

    if (this.action === 'edit') {
      this.$store.dispatch('role/fetchSingleData', { param: this.$route.params.id, nameColumn: 'name', setDataMutation: 'setWithDefaultPermission' })
    }
  },

  methods: {
    ...mapMutations({
      setForm: 'role/setForm'
    }),

    selectAll(isChecked) {
      let permissionIds = this.permissions.map(permission => permission.id);
      if(isChecked) {
        this.form.permissions = [...this.form.permissions, ...permissionIds];
        this.form.permissions = [...new Set(this.form.permissions)];
      } else {
        this.form.permissions = this.form.permissions.filter(permission => permissionIds.indexOf(permission) === -1);
      }
    },
  },
}
</script>
