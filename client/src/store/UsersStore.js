import { defineStore } from "pinia";

import axios from "axios";

export const useUsersStore = defineStore("UsersStore", {
  state: () => ({
    // url: "http://localhost:3001/api/",
    url: "http://194.87.74.11/api/",

    users: [],
    roles: [],
  }),
  getters: {
    usersName(state) {
      return state.users.map((el) => el.name);
    },
    rolesName(state) {
      return state.roles.map((el) => el.name);
    },
  },
  actions: {
    async fetchUsers() {
      try {
        const urlUsers = this.url + "user";
        const resUsers = await axios.get(urlUsers);
        const urlRoles = this.url + "role";
        const resRoles = await axios.get(urlRoles);

        this.users = resUsers.data;
        this.roles = resRoles.data;
        return this.users;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async deleteUser(id) {
      try {
        const url = this.url + "user/" + id;
        const res = await axios.delete(url);

        await this.fetchUsers();

        return res;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async createUser(user) {
      try {
        const role = this.roles.find((role) => role.name === user.role);
        const url = this.url + "user/" + role.id;

        delete user.role;
        const res = await axios.post(url, {
          ...user,
        });

        await this.fetchUsers();
        return res;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    sortUsersByName(autocompleteName) {
      if (!autocompleteName) {
        return this.users;
      } else {
        const result = this.users.filter((el) => el.name === autocompleteName);
        return result;
      }
    },
    getUserById(id) {
      return this.users.find((el) => el.id === id);
    },
    getUsernameById(id) {
      const user = this.users.find((el) => el.id === id);
      if (!user) {
        return "";
      } else {
        return user.name;
      }
    },
    getUserByName(name) {
      return this.users.find((el) => el.name === name);
    },
  },
});
