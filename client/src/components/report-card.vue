<template>
  <div class="card">
    <div class="names">
      <h3>{{ getUsernameById(report.authorId) }}</h3>
      <h3>
        {{
          `${ report.createdAt.slice(8, 10) }.${ report.createdAt.slice(5,7
          ) }.${ report.createdAt.slice(0, 4) }`
        }}
      </h3>
      <!-- 2024-02-03T14:21:15.645Z -->
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
import { useUsersStore } from "../store/UsersStore";

export default {
  name: "reportCard",
  props: {
    report: Object,
  },
  computed: {
    ...mapState(useReportsStore, ["deleteReport"]),
    ...mapState(useUsersStore, ["getUsernameById"]),
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
