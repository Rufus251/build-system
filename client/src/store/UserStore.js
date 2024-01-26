import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    user: {
      id: 2,
      login: "string",
      name: "stri2222ng",
      password: "string",
      role: "admin",
    },
  }),
  getters: {},
  actions: {},
  // actions
  // getters
});
