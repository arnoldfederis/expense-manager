<template>
  <div class="base-content">
    <div class="card" :class="{ 'is-visible': !isLoading }">
      <div class="card-content">
        <div class="card-header-content">
          <h1 class="title has-text-weight-bold">
            <span v-if="action === 'create'">Create Permission</span>
            <span v-if="action === 'edit'">Edit {{ name }}</span>
          </h1>
        </div>

        <hr>

        <form @submit.prevent="save('permission')" @keydown="form.errors.clear($event.target.name)">
          <b-field label="Permission" :message="form.errors.inputMessage('name')" :type="form.errors.inputType('name')">
            <b-input class="base-form" name="name" :value="form.name" @input.native="updateForm" placeholder="Input Permission"></b-input>
          </b-field>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click="save('permission')" :class="{ 'is-loading': isSaving }">Save</a>
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
      form: 'permission/getForm',
      name: 'permission/getName',
      path: 'permission/getPath'
    })
  },

  mixins: [formMixins],

  mounted() {
    setTimeout(() => this.$store.commit('app/setIsLoading', false), 300)

    if (this.action === 'edit') {
      this.$store.dispatch('permission/fetchSingleData', { param: this.$route.params.id, nameColumn: 'name' })
    }
  },

  methods: {
    ...mapMutations({
      setForm: 'permission/setForm'
    }),
  },
}
</script>
