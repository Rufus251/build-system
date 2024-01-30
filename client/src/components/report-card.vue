<template>
  <div class="card">
    <div class="names">
      <h3>{{ authorName }}</h3>
      <h3>{{ report.createdAt }}</h3>
    </div>
    <div class="btns">
      <primaryRouterButton400 :href="'/report/' + report.id">
        Просмотреть
      </primaryRouterButton400>
      <deleteButton400 @click="deleteReport(report.id)">
        Удалить
      </deleteButton400>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useReportsStore } from "../store/ReportsStore";

export default {
  name: "reportCard",
  props: {
    report: Object,
    authorName: String,
  },
  computed: {
    ...mapState(useReportsStore, ["deleteReport"]),
  },
};
</script>

<style scoped lang="scss">
.card {
  padding: 15px;
  margin: 10px;

  border: 1px solid black;
  border-radius: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
