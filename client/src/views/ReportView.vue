<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>

  <main>
    <primaryTable :table="getReportRowsById(id)"></primaryTable>
    <p>{{ getReportTextareaById(id) }}</p>

    <router-link to="/main">
      <deleteButton400 @click="deleteReport(id)">
        Удалить отчёт
      </deleteButton400>
    </router-link>
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
      id: +this.$route.params.id,
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useReportsStore, [
      "getReportTextareaById",
      "getReportRowsById",
      "getAuthorsName",
      "deleteReport",
    ]),
  },
};
</script>

<style scoped lang="scss">
p {
  max-width: 1000px;

  margin: 10px;
}
</style>
