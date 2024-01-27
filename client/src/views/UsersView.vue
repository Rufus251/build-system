<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    users
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";

export default {
  name: "MainView",
  computed: {
    ...mapState(useUserStore, ["user"]),
  },
};
</script>

<style scoped lang="scss">
main {
  width: 100%;
  height: calc(100vh - 80px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
