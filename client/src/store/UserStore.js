import { defineStore } from "pinia";

import axios from "axios";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    url: "http://localhost:3000/",
    user: {
      login: null,
      password: null,
      name: null,
      role: null,
    },
  }),
  getters: {},
  actions: {
    async loginUser(user) {
      try {
        const url = this.url + "auth/loginUser";
        const res = await axios.post(url, {
          ...user,
        });
        this.user = { ...res.data.user, role: res.data.roleName };
        console.log("Authorized!");
        return res.status;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});
