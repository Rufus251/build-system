import { defineStore } from "pinia";

export const useReportsStore = defineStore("ReportsStore", {
  state: () => ({
    reports: [
      {
        id: 1,
        authorId: 8,
        objectId: 1,
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
  }),
  getters: {},
  actions: {},
  // actions
  // getters
});
