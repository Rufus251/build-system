import { defineStore } from "pinia";

import axios from "axios";

import { useLoaderStore } from "./LoaderStore";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    url: "http://localhost:3001/api/",
    // url: "http://194.87.74.11/api/",

    user: {
      role: null,
      login: null,
      name: null,
      position: null,
      phone: null,
    },
    isAuth: false,

    loaderStore: useLoaderStore(),
  }),
  getters: {},
  actions: {
    async jwtLogin() {
      try {
        this.loaderStore.isLoading = true;

        let cookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("Authorization="));
        cookie = cookie ? cookie.split("=")[1] : null;

        const token = "Bearer " + cookie;

        const url = this.url + "auth/loginJwt";
        const res = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });

        document.cookie = `Authorization=${res.data.token}`;
        delete res.data.token;

        this.user = { ...res.data };
        this.isAuth = true;
        this.loaderStore.isLoading = false;

        return res.status;
      } catch (error) {
        // console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async loginUserPassword(user) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "auth/loginPassword";

        const res = await axios.post(url, {
          ...user,
          withCredentials: true,
        });

        document.cookie = `Authorization=${res.data.token}`;
        delete res.data.token;

        this.user = { ...res.data };

        this.isAuth = true;

        console.log(this.user);

        this.loaderStore.isLoading = false;
        return res.status;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    signOut() {
      this.loaderStore.isLoading = true;

      this.user = {
        role: null,
        login: null,
        name: null,
        position: null,
        phone: null,
      };
      document.cookie = `Authorization=`;

      this.isAuth = false;

      this.loaderStore.isLoading = false;
    },
  },
});
