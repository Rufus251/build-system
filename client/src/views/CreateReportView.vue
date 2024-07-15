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

    <router-link to="/main">
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
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useObjectsStore } from "../store/ObjectsStore";
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
    ...mapState(useObjectsStore, ["techNames"]),
    ...mapState(useReportsStore, ["createReport"]),
  },
  methods: {
    async createReportHandler(report) {
      await this.createReport(report);
      this.$router.push('/main');
    },
  },
};
</script>

<style scoped lang="scss"></style>