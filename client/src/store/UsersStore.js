import { defineStore } from "pinia";

import axios from "axios";

import { useMainStore } from "./MainStore";
import { useLoaderStore } from "./LoaderStore";

export const useUsersStore = defineStore("UsersStore", {
  state: () => ({
    mainStore: useMainStore(),
    loaderStore: useLoaderStore(),

    url: useMainStore().url,

    users: [],

    logins: [],
    names: [],
    roles: ["admin", "manager", "user", "norole"],
    position: [],
    complexes: [],
    complexNames: [],
    objects: [],
    objectNames: [],
    sortedObjectNames: [],
  }),
  getters: {},
  actions: {
    async fetchUsers() {
      try {
        this.loaderStore.isLoading = true;

        const urlUsers = this.url + "user/getAll";
        const resUsers = await axios.get(urlUsers, {
          headers: { Authorization: this.mainStore.token },
        });

        this.users = resUsers.data;
        this.loaderStore.isLoading = false;

        return this.users;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    // Запрос для сортировки
    async fetchUsersWithParams(
      login = undefined,
      name = undefined,
      role = undefined,
      position = undefined,
      complexName = undefined,
      objectName = undefined
    ) {
      try {
        this.loaderStore.isLoading = true;

        let complexId = undefined;
        if (complexName) {
          complexId = this.complexes.find((el) => el.name == complexName);
          complexId = complexId.id;
        }

        let objectId = undefined;
        if (objectName) {
          objectId = this.objects.find((el) => el.name == objectName);
          objectId = objectId.id;
        }

        const urlUsers = this.url + "user/getAll";
        const resUsers = await axios.get(urlUsers, {
          headers: { Authorization: this.mainStore.token },
          params: {
            login,
            name,
            role,
            position,
            complexId,
            objectId,
          },
        });

        this.users = resUsers.data;
        this.loaderStore.isLoading = false;

        return this.users;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async deleteUser(id) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "user/delUser/" + id;
        const res = await axios.delete(url, {
          headers: { Authorization: this.mainStore.token },
        });

        await this.fetchUsers();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },

    async updateUserObjects(user, objectNames) {
      try {
        const userObjects = user.objects.map((el) => el.objectId);

        const objects = objectNames.map(
          (el) => (el = this.objects.find((obj) => obj.name == el))
        );
        const objectIds = objects.map((el) => el.id);

        for await (const uObj of userObjects) {
          const url = `${this.url}user/delObject/${user.id}/${uObj}`;
          await axios.patch(
            url,
            {},
            {
              headers: {
                Authorization: this.mainStore.token,
              },
            }
          );
        }
        for await (const newObj of objectIds) {
          const url = `${this.url}user/addObject/${user.id}/${newObj}`;
          await axios.patch(
            url,
            {},
            {
              headers: {
                Authorization: this.mainStore.token,
              },
            }
          );
        }

        const url = `${this.url}user/getOne/${user.id}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: this.mainStore.token,
          },
        });
        return res;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async createUser(user, objectsNames) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "user/addUser";

        let res = await axios.post(
          url,
          { ...user },
          {
            headers: {
              Authorization: this.mainStore.token,
            },
          }
        );

        res = await this.updateUserObjects(res.data, objectsNames);

        await this.fetchUsers();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },
    async updateUser(userId, user, objectsNames) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "user/data/" + userId;
        let res = await axios.patch(
          url,
          { ...user },
          {
            headers: {
              Authorization: this.mainStore.token,
            },
          }
        );
        res = await this.updateUserObjects(res.data, objectsNames);

        await this.fetchUsers();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },


    // Для сортировки
    async fetchAllLogins() {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "user/getAllLogins";
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
        });

        this.logins = res.data.map((el) => el.login);

        this.loaderStore.isLoading = false;

        return this.logins;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async fetchAllUsernames() {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "user/getAllUsernames";
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
        });

        this.names = res.data.map((el) => el.name);

        this.loaderStore.isLoading = false;

        return this.names;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async fetchAllPosition() {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "user/getAllPositions";
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
        });

        this.position = res.data.map((el) => el.position);

        this.loaderStore.isLoading = false;

        return this.position;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async fetchAllComplexes() {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "residential-complex";
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
        });

        this.complexes = res.data;
        this.complexNames = res.data.map((el) => el.name);

        this.loaderStore.isLoading = false;

        return this.complexes;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async fetchAllObjectNames() {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "object/names";
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
        });

        this.objects = res.data;
        this.objectNames = res.data.map((el) => el.name);
        this.sortedObjectNames = res.data.map((el) => el.name);

        this.loaderStore.isLoading = false;

        return this.objectNames;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },

    // Сортирую объекты в сортировке
    sortObjectsByComplexes(selectedComplexes) {
      if (!selectedComplexes.length) {
        this.sortedObjectNames = this.objectNames;
        return this.sortedObjectNames;
      }
      let sortedObjects = [];
      this.complexes.forEach((complex) => {
        if (selectedComplexes.includes(complex.name)) {
          sortedObjects.push(...complex.objects);
          sortedObjects = sortedObjects.map((el) => (el.name ? el.name : el));
        }
      });

      this.sortedObjectNames = sortedObjects;
      return this.sortedObjectNames;
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
