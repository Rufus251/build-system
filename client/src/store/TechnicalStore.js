import { defineStore } from "pinia";

export const useTechnicalStore = defineStore("TechnicalStore.js", {
  state: () => ({
    user: [
      {
        id: 1,
        name: "шифер",
      },
      {
        id: 1,
        name: "бетон",
      },
    ],
  }),
  getters: {},
  actions: {},
  // actions
  // getters
});
