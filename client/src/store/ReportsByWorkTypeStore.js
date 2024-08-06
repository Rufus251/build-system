import { defineStore } from "pinia";

import { useMainStore } from "./MainStore";
import { useLoaderStore } from "./LoaderStore";

import axios from "axios";

export const useReportsByWorkTypeStore = defineStore("ReportsByWorkTypeStore", {
  state: () => ({
    mainStore: useMainStore(),
    loaderStore: useLoaderStore(),

    url: useMainStore().url,

    reports: [],
    authors: [],
  }),
  getters: {},
  actions: {
    async fetchReportsByWorkType(workType, workId) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "report";
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
          params: {
            workType,
            worksNameId: workId,
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
    async fetchReportsWorkTypeWithParams(
      workType,
      worksNameId,
      ascending,
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

        const url = this.url + "report";
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
          params: {
            workType,
            worksNameId,
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

        return this.users;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },

    async deleteReport(id) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "report/del/" + id;
        const res = await axios.delete(url, {
          headers: { Authorization: this.mainStore.token },
        });

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
  },
});
