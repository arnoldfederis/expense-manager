<template>
  <div class="base-content">
    <div class="card" :class="{ 'is-visible': !isLoading }">
      <div class="card-content">
        <div class="card-header-content">
          <h1 class="title has-text-weight-bold">Settings</h1>
        </div>

        <hr>

        <div>
          <div v-if="can('view_permission')">
            <router-link to="/settings/permissions" class="listing">
              <h1 class="title">Permissions</h1>
              <h3 class="subtitle">List of Permissions</h3>
            </router-link>
            <hr>
          </div>
          <div v-if="can('view_role')">
            <router-link to="/settings/roles" class="listing">
              <h1 class="title">Roles</h1>
              <h3 class="subtitle">List of Roles</h3>
            </router-link>
            <hr>
          </div>
          <div v-if="can('view_user')">
            <router-link to="/settings/users" class="listing">
              <h1 class="title">Users</h1>
              <h3 class="subtitle">List of Users</h3>
            </router-link>
            <hr>
          </div>
          <div v-if="can('edit_password')">
            <router-link to="/settings/change-password" class="listing">
              <h1 class="title">Change Password</h1>
              <h3 class="subtitle">Set your new password here</h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tableMixins } from '../../mixins/tableMixins';

export default {
  mixins: [tableMixins],

  mounted() {
    setTimeout(() => this.$store.commit('app/setIsLoading', false), 300)
  }
}
</script>

<style lang="scss">
  .listing {
    &:first-child {
      padding-top: 0;
    }
    display: block;
    padding: 1em 0;
  }
</style>
