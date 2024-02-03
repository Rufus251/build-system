<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <createReportTable
      :keysProp="techNames"
      v-model="reportRows"></createReportTable>
    <textareaField
      labelProp="Дополнительно"
      placeholderProp="Завтра доделаю"
      v-model="additional"></textareaField>

    <router-link to="/reports">
      <agreeButton400
        @click="
          createReportHandler({
            reportRows: [...reportRows],
            additional,
            authorId: user.id,
          })
        ">
        Создать отчёт
      </agreeButton400>
    </router-link>
    {{ reportRows }}
    {{ additional }}
    {{ user.id }}
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useTechnicalStore } from "../store/TechnicalStore";
import { useReportsStore } from "../store/ReportsStore";

export default {
  name: "CreateReportView",
  data() {
    return {
      reportRows: {},
      additional: undefined,
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useTechnicalStore, ["techNames"]),
    ...mapState(useReportsStore, ["createReport"]),
  },
  methods: {
    async createReportHandler(report) {
      await this.createReport(report);
      this.$router.push("/reports");
    },
  },
};
</script>

<style scoped lang="scss"></style>
