import { defineStore } from "pinia";

import { useUsersStore } from "./UsersStore";

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
            id: 1,
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
        this.authors.push(user)
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
        const usersStore = useUsersStore()
        const user = usersStore.getUserByName(autocompleteName)
        console.log(user);
        const result = this.reports.filter((el) => el.authorId === user.id);
        return result;
      }
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
