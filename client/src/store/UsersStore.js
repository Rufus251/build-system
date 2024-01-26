import { defineStore } from "pinia";

export const useUsersStore = defineStore("UsersStore", {
  state: () => ({
    users: [
      {
        id: 2,
        login: "string",
        name: "stri2222ng",
        password: "string",
        role: "admin"
      },
      {
        id: 3,
        login: "string",
        name: "stri2222ng",
        password: "string",
        role: "user"
      },
      {
        id: 4,
        login: "string",
        name: "string",
        password: "string",
        role: "user"
      },
      
    ],
  }),
  getters: {},
  actions: {},
});
