import { defineStore } from "pinia";

import { useMainStore } from "./MainStore";
import { useLoaderStore } from "./LoaderStore";

import { useUsersStore } from "./UsersStore";
import { useUserStore } from "./UserStore";
import { useObjectsStore } from "./ObjectsStore";

import axios from "axios";

export const useReportsStore = defineStore("ReportsStore", {
  state: () => ({
    mainStore: useMainStore(),
    loaderStore: useLoaderStore(),

    url: useMainStore().url,

    reports: [],
    authors: [],
  }),
  getters: {},
  actions: {
    async fetchReports() {
      try {
        const url = this.url + "report";
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
        });

        this.reports = res.data;

        return this.reports;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchReport(id) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "report/findOne/" + id;
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
        });

        const report = res.data;

        this.loaderStore.isLoading = false;

        return report;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async fetchReportsWithParams(
      ascending,
      objectId,
      username,
      dateStart,
      dateEnd,
      additional,
      problems
    ) {
      try {
        this.loaderStore.isLoading = true;

        if (ascending === "Сначала новые") {
          ascending = "new";
        } else {
          ascending = "old";
        }

        if (additional === "-") additional = null;
        if (additional === "Есть") additional = true;
        if (additional === "Нет") additional = false;

        if (problems === "-") problems = null;
        if (problems === "Есть") problems = true;
        if (problems === "Нет") problems = false;

        dateStart = dateStart
          ? new Date(Date.parse(`${dateStart}T10:00:00`))
          : null;
        dateEnd = dateEnd ? new Date(Date.parse(`${dateEnd}T10:00:00`)) : null;

        console.log(
          ascending,
          objectId,
          username,
          dateStart,
          dateEnd,
          additional,
          problems
        );

        const url = this.url + "report";
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
          params: {
            objectId,
            ascending,
            username,
            dateStart,
            dateEnd,
            additional,
            problems,
          },
        });

        this.reports = res.data;

        this.loaderStore.isLoading = false;

        return this.reports;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async fetchMyReports() {
      try {
        const userStore = useUserStore();
        const url = this.url + "report/myReports/" + userStore.user.id;
        console.log(url);
        const res = await axios.get(url);

        this.reports = res.data;

        return this.reports;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async deleteReport(id) {
      try {
        const url = this.url + "report/del/" + id;
        const res = await axios.delete(url, {
          headers: { Authorization: this.mainStore.token },
        });

        const userStore = useUserStore();
        if (userStore.user.role === "user") {
          await this.fetchMyReports();
        } else {
          await this.fetchReports();
        }

        return res;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async createReport(report) {
      const objectId = 1;
      const urlReport = this.url + "report/" + report.authorId + "/" + objectId;
      const resReport = await axios.post(urlReport, {
        additional: report.additional,
      });

      for await (const row of report.reportRows) {
        const technicalStore = useObjectsStore();
        const tech = technicalStore.getTechByName(row.key);

        const urlRow =
          this.url + "report-row/" + resReport.data.id + "/" + tech.id;
        await axios.post(urlRow, {
          value: row.value,
        });
      }

      const userStore = useUserStore();
      if (userStore.user.role === "user") {
        await this.fetchMyReports();
      } else {
        await this.fetchReports();
      }

      return this.reports;
    },

    async downloadReport(id) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + `report/downloadXlsxReport/${id}`;

        const res = await axios
          .get(url, {
            responseType: "blob",
            headers: {
              Authorization: this.mainStore.token,
              Accept: "application/octet-stream",
            },
          })
          .then((res) => {
            const type = res.headers["content-type"];
            const blob = new Blob([res.data], {
              type: type,
            });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "report.xlsx";
            link.click();
            link.remove();
          });

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },

    sortReportByName(autocompleteName) {
      if (!autocompleteName) {
        return this.reports;
      } else {
        const usersStore = useUsersStore();
        const user = usersStore.getUserByName(autocompleteName);
        console.log(user);
        const result = this.reports.filter((el) => el.authorId === user.id);
        return result;
      }
    },
    getReportById(id) {
      return this.reports.find((el) => el.id === id);
    },
    getReportTextareaById(id) {
      const report = this.reports.find((el) => el.id === id);
      return report.additional;
    },
    getReportRowsById(id) {
      const report = this.reports.find((el) => el.id === id);

      const technicalStore = useObjectsStore();

      // making object and array links different, becouse func getReportRowsById trigger twice
      let reportRows = [...report.reportRows];
      reportRows.forEach((row, i) => {
        let rowCopy = {};
        reportRows[i] = Object.assign(rowCopy, row);
      });

      reportRows.map(
        (row) => (row.keyId = technicalStore.getTechNameById(row.keyId))
      );

      return reportRows;
    },
  },
});
