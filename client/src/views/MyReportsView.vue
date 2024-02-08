<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <primaryRouterButton400 href="/createReport">
      Добавить отчёт
    </primaryRouterButton400>

    <div class="cards">
      <reportCard
        v-for="(report, i) in reports"
        :key="i"
        :report="report"></reportCard>
    </div>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useReportsStore } from "../store/ReportsStore";

export default {
  name: "ReportsView",
  data() {
    return {
      autocompleteName: undefined,
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useReportsStore, ["reports"]),
  },
};
</script>

<style scoped lang="scss"></style>
