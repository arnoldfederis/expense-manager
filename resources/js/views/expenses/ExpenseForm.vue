<template>
  <div class="base-content">
    <div class="card" :class="{ 'is-visible': !isLoading }">
      <div class="card-content">
        <div class="card-header-content">
          <h1 class="title has-text-weight-bold">
            <span v-if="action === 'create'">Create Expense</span>
            <span v-if="action === 'edit'">Edit {{ name }}</span>
          </h1>
        </div>

        <hr>

        <form @submit.prevent="save('expense')">
          <div class="columns">
            <div class="column is-half">
              <b-field label="Expense Category" :message="form.errors.inputMessage('expense_category_id')" :type="form.errors.inputType('expense_category_id')">
                <b-select placeholder="Select Expense Category" :value="form.expense_category_id" class="base-form" name="expense_category_id" @input.native="updateForm">
                  <option
                      v-for="expenseCategory in expenseCategories"
                      :value="expenseCategory.id"
                      :key="expenseCategory.id">
                    {{ expenseCategory.name }}
                  </option>
                </b-select>
              </b-field>

              <b-field label="Description" :message="form.errors.inputMessage('description')" :type="form.errors.inputType('description')">
                <b-input class="base-form" name="description" :value="form.description" @input.native="updateForm" placeholder="Input Description"></b-input>
              </b-field>
            </div>

            <div class="column is-half">
              <b-field label="Amount" :message="form.errors.inputMessage('amount')" :type="form.errors.inputType('amount')">
                <b-input class="base-form" name="amount" :value="form.amount" @input.native="updateForm" placeholder="Input Amount" @keypress.native="numberOnly"></b-input>
              </b-field>

              <b-field label="Expense Date" :message="form.errors.inputMessage('expense_date')" :type="form.errors.inputType('expense_date')">
                <date-pick
                    @input="updateDateForm($event, 'expense_date')"
                    class="base-form base-datepicker"
                    :inputAttributes="{readonly: true}"
                    :value="form.expense_date"
                    :pickTime="true"
                    :format="'YYYY-MM-DD HH:mm'"
                    :displayFormat="'YYYY-MM-DD HH:mm:ss'"
                ></date-pick>
              </b-field>
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click="save('expense')">Save</a>
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
import { formMixins } from '../../mixins/formMixins';

export default {
  props: ['action'],

  computed: {
    ...mapGetters({
      expenseCategories: 'expenseCategory/getAllData',
      form: 'expense/getForm',
      name: 'expense/getName',
      path: 'expense/getPath'
    })
  },

  mixins: [formMixins],

  mounted() {
    this.$store.dispatch('expenseCategory/fetchAllData', { order: 'asc', column: 'name', get_all: true })

    if (this.action === 'edit') {
      this.$store.dispatch('expense/fetchSingleData', { param: this.$route.params.id, nameColumn: 'description' })
    }
  },

  methods: {
    ...mapMutations({
      setForm: 'expense/setForm'
    })
  }
}
</script>
