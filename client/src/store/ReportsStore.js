import { defineStore } from "pinia";

import { useMainStore } from "./MainStore";

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
        const res = await axios.get(url);

        this.reports = res.data;

        return this.reports;
      } catch (error) {
        console.log(error);
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
        const url = this.url + "report/" + id;
        const res = await axios.delete(url);

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
