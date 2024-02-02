<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <createReportTable :keysProp="techNames" v-model="report"></createReportTable>
    <textareaField
      labelProp="Дополнительно"
      placeholderProp="Завтра доделаю"
      v-model="additional"></textareaField>

    <agreeButton400
      @click="
        createReport({
          reportRows: [...report],
          additional,
          authorId: user.id,
        })
      ">
      Создать отчёт
    </agreeButton400>
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
      report: {},
      additional: undefined,
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useTechnicalStore, ["techNames"]),
    ...mapState(useReportsStore, ["createReport"]),
  },
};
</script>

<style scoped lang="scss"></style>
