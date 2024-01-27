import { defineStore } from "pinia";

export const useUsersStore = defineStore("UsersStore", {
  state: () => ({
    users: [
      {
        id: 2,
        login: "string",
        name: "stri2222ng",
        password: "string",
        role: "admin",
      },
      {
        id: 3,
        login: "string",
        name: "stri2222ng",
        password: "string",
        role: "user",
      },
      {
        id: 4,
        login: "string",
        name: "string",
        password: "string",
        role: "user",
      },
    ],
    autocompleteName: undefined,
  }),
  getters: {
    usersName(state) {
      return state.users.map((el) => el.name);
    },
  },
  actions: {
    sortUsersByName(autocompleteName) {
      if (!autocompleteName) {
        return this.users;
      } else {
        const result = this.users.filter((el) => el.name === autocompleteName);
        return result;
      }
    },
    deleteUser(id) {
      const result = this.users.filter((el) => el.id !== id);
      this.users = result;
    },
  },
});
