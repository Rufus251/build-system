<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <div class="createButton">
    <primaryRouterButton400 href="/createUser">
      Добавить пользователя
    </primaryRouterButton400>
  </div>
  <main>
    <div class="cards">
      <userCard
        v-for="user in this.users"
        :key="user.id"
        :user="user"
      ></userCard>
    </div>
    <userSort
      class="sort"
      :loginSelects="logins"
      :nameSelects="names"
      :roleSelects="roles"
      :positionSelects="position"
      :complexSelects="complexNames"
      :objectSelects="sortedObjectNames"
      v-model:userLogin="loginSort"
      v-model:userName="nameSort"
      v-model:userRole="roleSort"
      v-model:userPosition="positionSort"
      v-model:userComplexes="complexesSort"
      v-model:userObjects="objectSort"
    ></userSort>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useUsersStore } from "../store/UsersStore";

export default {
  name: "UsersView",
  data() {
    return {
      loginSort: null,
      nameSort: null,
      roleSort: null,
      positionSort: null,
      complexesSort: null,
      objectSort: null,
    };
  },
  async mounted() {
    await this.fetchUsers();
    await this.fetchAllLogins();
    await this.fetchAllUsernames();
    await this.fetchAllPosition();
    await this.fetchAllComplexes();
    await this.fetchAllObjectNames();
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useUsersStore, [
      "users",
      "fetchUsers",
      "fetchAllLogins",
      "fetchAllUsernames",
      "fetchAllPosition",
      "fetchAllComplexes",
      "fetchAllObjectNames",
      "logins",
      "names",
      "roles",
      "position",
      "complexNames",
      "sortedObjectNames",
      "sortObjectsByComplexes",
    ]),
  },
  watch: {
    complexesSort: {
      handler(value) {
        this.sortObjectsByComplexes(value);
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: space-between;
}
.cards {
  min-width: 1200px;
}
</style>
