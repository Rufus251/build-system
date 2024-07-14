<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <div class="btns">
      <primaryRouterButton400
        href="/complexes"
        v-if="user.role === 'admin' || user.role === 'manager'"
      >
        Жилые комплексы
      </primaryRouterButton400>
      <primaryRouterButton400
        href="/objects"
        v-if="user.role === 'admin' || user.role === 'manager'"
      >
        Объекты
      </primaryRouterButton400>

      <primaryRouterButton400
        href="/reports"
        v-if="user.role === 'admin' || user.role === 'manager'"
      >
        Все отчёты
      </primaryRouterButton400>

      <primaryRouterButton400 href="/users" v-if="user.role === 'admin'">
        Сотрудники
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
