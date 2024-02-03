<template>
  <RouterView></RouterView>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "./store/UserStore";
import { useUsersStore } from "./store/UsersStore";
export default {
  computed: {
    ...mapState(useUserStore, ["user", "isAuth"]),
    ...mapState(useUsersStore, ["fetchUsers"]),
  },
  watch: {
    async isAuth(value) {
      if (value) {
        await this.fetchUsers();
      }
    },
  },
};
</script>
<style>
@import url(./styles/main.scss);
</style>
