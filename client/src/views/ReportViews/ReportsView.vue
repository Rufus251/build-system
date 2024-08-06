<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <primaryRouterButton400 href="/createReport">
    Добавить отчёт
  </primaryRouterButton400>
  <main>
    <div class="cards">
      <reportCard
        v-for="report in reports"
        :key="report.id"
        :report="report"></reportCard>
    </div>
    <reportsSort
      :objectNames="objects.map((el) => el.name)"
      :workerSelects="names"
      v-model:orderSort="orderSort"
      v-model:objectId="objectId"
      v-model:worker="worker"
      v-model:dateStart="dateStart"
      v-model:dateEnd="dateEnd"
      v-model:additional="additional"
      v-model:problems="problems">
    </reportsSort>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../../store/UserStore";
import { useUsersStore } from "../../store/UsersStore";
import { useObjectsStore } from "../../store/ObjectsStore";
import { useReportsStore } from "../../store/ReportsStore";

export default {
  name: "ReportsView",
  data() {
    return {
      orderSort: "new",
      objectId: null,
      worker: null,
      dateStart: null,
      dateEnd: null,
      additional: false,
      problems: false,
    };
  },
  async mounted() {
    await this.fetchObjects();
    await this.fetchReports();
    await this.fetchAllUsernames();
  },

  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useUsersStore, ["names", "fetchAllUsernames"]),
    ...mapState(useObjectsStore, ["objects", "fetchObjects"]),
    ...mapState(useReportsStore, ["reports", "fetchReports"]),
  },
};
</script>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: space-between;
}
</style>
