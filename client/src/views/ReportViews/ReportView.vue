<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <primaryRouterButton400 href="" @click="$router.go(-1)">
    Назад
  </primaryRouterButton400>
  <agreeButton400 href="" @click="downloadReport(report.id)">
    Скачать xlsx
  </agreeButton400>
  <main>
    <div class="objectInfo">
      <h3>{{ report.object.residentialComplex.name }}</h3>
      <h3>{{ report.object.name }}</h3>
      <h3>{{ report.object.contractName }}</h3>
    </div>
    <div class="workInfo">
      <h3>
        Дата:
        <span>
          {{
            `${report.workDate.slice(8, 10)}.${report.workDate.slice(
              5,
              7
            )}.${report.workDate.slice(0, 4)}`
          }}
        </span>
      </h3>
      <h3>
        Погода: <span> {{ report.weather }} </span>
      </h3>
      <h3>
        Температура: <span> {{ report.temperature }} </span>
      </h3>
      <h3>
        Кол-во рабочих: <span> {{ report.workersAmount }} </span>
      </h3>
      <h3>
        Кол-во ИТР: <span> {{ report.ItrAmount }} </span>
      </h3>
    </div>
    <factTable :workDone="report.workDone" />
    <planTable :workPlan="report.workPlan" />
    <problemsTable :problems="report.problems" />

    <div class="reportFooter">
      <h3>Подготовил ООО "Д5 ИНЖИНИРИНГ":</h3>
      <h3>{{ report.author.name }}</h3>
      <h3>{{ report.author.phone }}</h3>
    </div>

    <div class="btns">
      <primaryRouterButton400 href="" @click="$router.go(-1)">
        Назад
      </primaryRouterButton400>
      <agreeButton400 href="" @click="$router.go(-1)">
        Изменить
      </agreeButton400>
      <deleteButton400 href="" @click="deleteReportHandler()">
        Удалить отчёт
      </deleteButton400>
    </div>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../../store/UserStore";
import { useReportsStore } from "../../store/ReportsStore";

export default {
  name: "ReportsView",
  data() {
    return {
      report: {
        workDate: "",
        weather: "",
        temperature: "",
        workersAmount: "",
        ItrAmount: "",
        additional: "",
        createdAt: "",
        author: {
          name: "",
          phone: "",
        },
        object: {
          name: "",
          contractName: "",
          residentialComplex: {
            name: "",
          },
        },
        workDone: {
          doneDate: "",
          createdAt: "",
          rows: [],
        },
        workPlan: {
          planDate: "",
          createdAt: "",
          rows: [],
        },
        problems: {
          ProblemsRow: [],
        },
      },
    };
  },
  async created() {
    const id = +this.$route.params.id;
    this.report = await this.fetchReport(id);
  },
  methods: {
    async deleteReportHandler() {
      const conf = confirm("Вы уверены, что хотите удалить этот отчёт?");
      if (conf) {
        await this.deleteReport(this.report.id);
        this.$router.go(-1);
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useReportsStore, [
      "fetchReport",
      "downloadReport",
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
main {
  margin: 20px;

  .workInfo {
    margin-top: 20px;
    span {
      font-size: 20px;
      font-weight: 300;
    }
  }
  .btns {
    margin-top: 40px;
    margin-left: -10px;

    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.reportFooter {
  margin-top: 40px;
}
</style>
