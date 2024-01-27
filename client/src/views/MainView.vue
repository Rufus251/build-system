<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <div class="btns">
      <primaryRouterButton400 href="/users" v-if="user.role === 'admin'">
        Учётные записи
      </primaryRouterButton400>

      <primaryRouterButton400
        href="/reports"
        v-if="user.role === 'admin' || user.role === 'manager'">
        Просмотреть отчёты
      </primaryRouterButton400>

      <primaryRouterButton400
        href="/technical"
        v-if="user.role === 'admin' || user.role === 'manager'">
        Технический каталог
      </primaryRouterButton400>

      <primaryRouterButton400 href="/myReports" v-if="user.role === 'user'">
        Мои отчёты
      </primaryRouterButton400>

      <primaryRouterButton400 href="/createReport">
        Создать отчёт
      </primaryRouterButton400>
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
