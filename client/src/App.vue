<template>
  <RouterView></RouterView>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "./store/UserStore";
import { useUsersStore } from "./store/UsersStore";
import { useTechnicalStore } from "./store/TechnicalStore";
import { useReportsStore } from "./store/ReportsStore";
export default {
  computed: {
    ...mapState(useUserStore, ["user", "isAuth"]),
    ...mapState(useUsersStore, ["fetchUsers"]),
    ...mapState(useTechnicalStore, ["fetchTech"]),
    ...mapState(useReportsStore, ["fetchReports", "fetchMyReports"]),
  },
  watch: {
    async isAuth(value) {
      if (
        value &&
        (this.user.role === "admin" || this.user.role === "manager")
      ) {
        await this.fetchUsers();
        await this.fetchTech();
        await this.fetchReports();
      } else if (value && this.user.role === "user") {
        await this.fetchTech();
        await this.fetchMyReports();
      }
    },
  },
};
</script>
<style>
@import url(./styles/main.scss);
</style>
