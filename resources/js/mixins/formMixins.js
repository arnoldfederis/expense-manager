import { mapGetters } from 'vuex';

export const formMixins = {
  computed: {
    ...mapGetters({
      isLoading: 'app/getIsLoading',
      isSaving: 'app/getIsSaving'
    })
  },

  methods: {
    updateForm(e) {
      const { name, value } = e.target;
      this.form.errors.clear(name)
      this.setForm({
        ...this.form, [name]: value
      })
    },

    updateDateForm(value, name) {
      this.form.errors.clear(name)
      this.setForm({
        ...this.form, [name]: value
      })
    },

    cancel() {
      this.$store.dispatch('app/cancelCreate', { path: this.path, form: this.form })
    },

    save(module) {
      this.$store.dispatch(`${module}/saveData`, this.form)
    },

    numberOnly(e) {
      let keyCode = (e.keyCode ? e.keyCode : e.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        e.preventDefault();
      }
    }
  },

  async beforeDestroy() {
    await this.$store.dispatch('app/resetForm', this.form)
  }
};
