<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <primaryRouterButton400 href="/createUser">
      Добавить пользователя
    </primaryRouterButton400>
    <autocompleteField
      labelProp="Имя работника"
      placeholderProp="Иванов Иван Иванович"
      :itemsProp="usersName"
      v-model="autocompleteName"></autocompleteField>
    <div class="cards">
      <userCard
        v-for="user in sortUsersByName(autocompleteName)"
        :key="user.id"
        :user="user"></userCard>
    </div>
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
      autocompleteName: undefined,
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useUsersStore, ["users", "usersName", "sortUsersByName"]),
  },
};
</script>

<style scoped lang="scss"></style>
