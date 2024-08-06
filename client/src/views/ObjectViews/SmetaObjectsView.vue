<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <div class="backButton">
    <primaryRouterButton400 href="" @click="$router.back()">
      Назад
    </primaryRouterButton400>
  </div>
  <main>
    <div class="cards">
      <reportCard
        v-for="report in reports"
        :key="report.id"
        :report="report"></reportCard>
    </div>
    <reportsByWorkTypeSort
      :workerSelects="names"
      v-model:orderSort="orderSort"
      v-model:worker="worker"
      v-model:dateStart="dateStart"
      v-model:dateEnd="dateEnd"
      v-model:additional="additional"
      v-model:problems="problems">
    </reportsByWorkTypeSort>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../../store/UserStore";
import { useReportsByWorkTypeStore } from "../../store/ReportsByWorkTypeStore";
import { useUsersStore } from "../../store/UsersStore";

export default {
  name: "SmetaObjectsView",
  data() {
    return {
      orderSort: "new",
      worker: null,
      dateStart: null,
      dateEnd: null,
      additional: false,
      problems: false,
    };
  },
  async mounted() {
    const workType = this.$route.params.workType;
    const workId = this.$route.params.workId;
    await this.fetchReportsByWorkType(workType, workId);
    await this.fetchAllUsernames();
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useUsersStore, ["names", "fetchAllUsernames"]),
    ...mapState(useReportsByWorkTypeStore, [
      "reports",
      "fetchReportsByWorkType",
    ]),
  },
};
</script>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: space-between;
}
</style>
