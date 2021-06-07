<template>
  <div class="filter-content" :class="{ 'is-visible': showFilter }">
    <hr>

    <div class="columns">
      <div class="column filter-column is-half" :class="{ 'is-visible': !filterResult }">
        <b-field>
          <b-input class="base-form" type="search" name="search" :placeholder="`Search ${searchPlaceHolder}`" @input.native="updateSearch"></b-input>
        </b-field>

        <b-field>
          <button class="button is-light is-fullwidth" @click="toggleFilterResult">
            Filter Results
          </button>
        </b-field>
      </div>

      <div class="column filter-column is-half" :class="{ 'is-visible': filterResult }">
        <div class="columns">
          <div class="column is-full">
            <b-field>
              <date-pick
                @input="updateDateFilter($event, 'from')"
                class="base-form"
                :inputAttributes="{ readonly: true }"
                :value="filter.from"
                :format="'YYYY-MM-DD'"
              ></date-pick>
            </b-field>

            <slot name="left"></slot>
          </div>

          <div class="column is-full">
            <b-field>
              <date-pick
                  @input="updateDateFilter($event, 'to')"
                  class="base-form"
                  :inputAttributes="{readonly: true}"
                  :value="filter.to"
                  :format="'YYYY-MM-DD'"
                  :isDateDisabled="minDate"
              ></date-pick>
            </b-field>

            <slot name="right"></slot>
          </div>
        </div>

        <b-field>
          <button class="button is-light is-fullwidth" v-if="viewClearFilter" @click="clearFilter(`${storeModule}/resetFilter`)">
            Clear Filter
          </button>
        </b-field>

        <b-field>
          <button class="button is-light is-fullwidth" @click="toggleFilterResult">
            Close Filter
          </button>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import { tableMixins } from '../mixins/tableMixins';

export default {
  props: {
    searchPlaceHolder: {
      type: String,
      required: true
    },

    viewClearFilter: {
      type: Boolean,
      required: false
    },

    storeModule: {
      type: String,
      required: true
    },

    filter: {
      type: Object,
      required: true
    },

    setFilter: {
      type: Function,
      required: true
    },

    setSearch: {
      type: Function,
      required: true
    },

    fetchData: {
      type: Function,
      required: true
    }
  },

  mixins: [tableMixins]
}
</script>
