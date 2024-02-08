import { defineStore } from "pinia";

import axios from "axios";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    // url: "http://localhost:3001/api/", 
    url: "http://45.132.18.153/api/",

    user: {
      login: null,
      password: null,
      name: null,
      role: null,
    },
    isAuth: false,
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
        this.isAuth = true;
        console.log("Authorized!");
        return res.status;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    signOut() {
      this.user = { login: null, password: null, name: null, role: null };
      this.isAuth = false;
    },
  },
});
