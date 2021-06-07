import { get } from "../helpers"

export const permissionMixins = {
  methods: {
    can(permission) {
      const permissions = get('permissions') ? JSON.parse(get('permissions')) : []
      return permissions.indexOf(permission) !== -1
    }
  }
};
