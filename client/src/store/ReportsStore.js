import { defineStore } from "pinia";

import { useUsersStore } from "./UsersStore";
import { useTechnicalStore } from "./TechnicalStore";

export const useReportsStore = defineStore("ReportsStore", {
  state: () => ({
    reports: [
      {
        id: 1,
        authorId: 8,
        objectId: 1,
        createdAt: "10.08.2004",
        additional: "Дополнительное поле отчёта",
        reportRows: [
          {
            id: 1,
            reportId: 2,
            keyId: 1,
            value: "Ну хначение отчёта",
          },
          {
            id: 2,
            reportId: 2,
            keyId: 1,
            value: "Ну хначение отчёта",
          },
        ],
      },
      {
        id: 2,
        authorId: 8,
        objectId: 1,
        createdAt: "10.08.2004",
        additional: "Дополнительное поле отчёта2",
        reportRows: [
          {
            id: 3,
            reportId: 2,
            keyId: 1,
            value: "Ну хначение отчёта",
          },
          {
            id: 4,
            reportId: 2,
            keyId: 1,
            value: "Ну хначение отчёта",
          },
        ],
      },
    ],
    authors: [],
  }),
  getters: {
    getAuthors() {
      const usersStore = useUsersStore();
      const users = usersStore.users;

      // reports[i].authorId === authors[i].id
      // arrays sort, author[i] get report[i]
      this.reports.forEach((report) => {
        const user = users.find((user) => user.id === report.authorId);
        this.authors.push(user);
      });

      return this.authors;
    },
    getAuthorsName() {
      const authors = this.getAuthors;
      const authorsName = authors.map((author) => author.name);
      return authorsName;
    },
  },
  actions: {
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
      const report = this.reports.find((el) => el.id === id)
      return report.additional;
    },
    getReportRowsById(id) {
      const report = this.reports.find((el) => el.id === id);

      const technicalStore = useTechnicalStore();

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
    deleteReport(id) {
      const result = this.reports.filter((el) => el.id !== id);
      this.reports = result;
    },
    createReport(report) {
      this.reports.push({ ...report });
    },
  },
});
