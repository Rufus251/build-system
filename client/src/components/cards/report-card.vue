<template>
  <div class="card">
    <div class="names">
      <h3>{{ report.author.name }}</h3>
      <h3>{{ report.object.name }}</h3>
      <h3>
        <!-- 2024-02-03T14:21:15.645Z -->
        {{
          `${report.workDate.slice(8, 10)}.${report.workDate.slice(
            5,
            7
          )}.${report.workDate.slice(0, 4)}`
        }}
      </h3>

      <div class="problems" v-if="report.problems !== null">
        <h3 style="color: red">Проблемы:</h3>
        <ol>
          <li v-for="(problem, i) in report.problems.ProblemsRow">
            <h3>{{ i + 1 }}. {{ problem.description }}</h3>
          </li>
        </ol>
      </div>
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
import { useReportsByWorkTypeStore } from "../../store/ReportsByWorkTypeStore";

export default {
  name: "reportCard",
  props: {
    report: Object,
  },
  computed: {
    ...mapState(useReportsByWorkTypeStore, ["deleteReport"]),
  },
};
</script>

<style scoped lang="scss">
.card {
  padding: 15px;
  margin: 10px;

  border: 3px solid black;
  border-radius: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.problems ol {
  list-style: none;
}
</style>
