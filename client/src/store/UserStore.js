import { defineStore } from "pinia";

import axios from "axios";

import { useMainStore } from "./MainStore";
import { useLoaderStore } from "./LoaderStore";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    mainStore: useMainStore(),
    loaderStore: useLoaderStore(),

    url: useMainStore().url,

    user: {
      role: null,
      login: null,
      name: null,
      position: null,
      phone: null,
    },
    isAuth: false,
  }),
  getters: {},
  actions: {
    async jwtLogin() {
      try {
        this.loaderStore.isLoading = true;

        const token = this.mainStore.setJwtToken();

        const url = this.url + "auth/loginJwt";
        const res = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });

        document.cookie = `Authorization=${res.data.token}`;
        this.mainStore.setJwtToken();

        delete res.data.token;

        this.user = { ...res.data };
        this.isAuth = true;
        this.loaderStore.isLoading = false;

        return res.status;
      } catch (error) {
        console.log(error);
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
        this.mainStore.setJwtToken();

        delete res.data.token;

        this.user = { ...res.data };
        this.isAuth = true;

        this.loaderStore.isLoading = false;
        return res.status;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async signOut() {
      this.loaderStore.isLoading = true;

      this.user = {
        role: null,
        login: null,
        name: null,
        position: null,
        phone: null,
      };

      document.cookie = `Authorization=; Max-Age=-1;`;
      this.mainStore.setJwtToken();

      this.isAuth = false;

      this.loaderStore.isLoading = false;
    },
  },
});
