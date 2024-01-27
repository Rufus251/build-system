<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useUsersStore } from "../store/UsersStore";

export default {
  name: "CreateUserView",
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

<style scoped lang="scss">
main {
}
</style>
