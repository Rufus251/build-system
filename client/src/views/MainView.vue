<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <div class="btns">
      <primaryButton400 href="/users">
        Учётные записи 
      </primaryButton400>
      <primaryButton400 href="/reports">
        Просмотреть отчёты 
      </primaryButton400>
      <primaryButton400 href="/technical">
        Технический каталог 
      </primaryButton400>
      <primaryButton400 href="/createReport">
        Создать отчёт 
      </primaryButton400>
    </div>
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
