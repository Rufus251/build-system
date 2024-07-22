import { defineStore } from "pinia";

import axios from "axios";

import { useMainStore } from "./MainStore";
import { useLoaderStore } from "./LoaderStore";
import { useComplexesStore } from "./ComplexesStore";

export const useObjectsStore = defineStore("ObjectsStore", {
  state: () => ({
    mainStore: useMainStore(),
    loaderStore: useLoaderStore(),
    complexesStore: useComplexesStore(),

    url: useMainStore().url,

    objects: [],
    sortedObjects: [],
    objectNames: [],
    sortedObjectNames: [],
  }),
  getters: {},
  actions: {
    async fetchObjects() {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "object";
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
        });

        this.objects = res.data;
        this.sortedObjects = res.data;
        this.objectNames = res.data.map((el) => el.name);
        this.sortedObjectNames = res.data.map((el) => el.name);

        this.loaderStore.isLoading = false;

        return this.objects;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async createObject(complexId, object, smeta) {
      try {
        this.loaderStore.isLoading = true;

        let url = this.url + `object/${complexId}`;

        let res = await axios.post(url, object, {
          headers: {
            Authorization: this.mainStore.token,
          },
          params: {
            smetaName: smeta.name,
          },
        });

        const smetaId = res.data.smeta.id;
        url = this.url + `main-works-name/uploadXlsx/${smetaId}`;

        let formData = new FormData();
        formData.append("file", smeta.smetaFile[0]);
        res = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.mainStore.token,
          },
        });

        await this.fetchObjects();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },
    async updateObject(id, object, smeta) {
      try {
        this.loaderStore.isLoading = true;

        let url = this.url + "object/" + id;

        let res = await axios.patch(
          url,
          { ...object },
          {
            headers: {
              Authorization: this.mainStore.token,
            },
          }
        );

        url = this.url + "smeta/update/" + smeta.id;

        res = await axios.patch(
          url,
          { name: smeta.name },
          {
            headers: {
              Authorization: this.mainStore.token,
            },
          }
        );

        await this.fetchObjects();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },
    async deleteObject(id) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "object/" + id;

        let res = await axios.delete(url, {
          headers: {
            Authorization: this.mainStore.token,
          },
        });

        await this.fetchObjects();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },

    async uploadSmeta(smeta) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + `main-works-name/uploadXlsx/${smeta.id}`;

        let formData = new FormData();
        formData.append("file", smeta.smetaFile[0]);
        const res = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.mainStore.token,
          },
        });

        await this.fetchObjects();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },

    async getMainWorkById(id) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "main-works-name/" + id;
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
        });

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async addMainWork(smetaId, mainWork) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "main-works-name/addOne/" + smetaId;

        let res = await axios.post(url, mainWork, {
          headers: {
            Authorization: this.mainStore.token,
          },
        });

        await this.fetchObjects();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },
    async updateMainWork(id, mainWork) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "main-works-name/" + id;

        let res = await axios.patch(url, mainWork, {
          headers: {
            Authorization: this.mainStore.token,
          },
        });

        await this.fetchObjects();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },
    async deleteMainWork(id) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "main-works-name/" + id;

        let res = await axios.delete(url, {
          headers: {
            Authorization: this.mainStore.token,
          },
        });

        await this.fetchObjects();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },
    async deleteMainWorks(smetaId) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "main-works-name/smeta/" + smetaId;

        let res = await axios.delete(url, {
          headers: {
            Authorization: this.mainStore.token,
          },
        });

        await this.fetchObjects();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },

    async getAdditionalWorkById(id) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "additional-works-name/getOne/" + id;
        const res = await axios.get(url, {
          headers: { Authorization: this.mainStore.token },
        });

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async addAdditionalWork(smetaId, additionalWork) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "additional-works-name/" + smetaId;

        let res = await axios.post(url, additionalWork, {
          headers: {
            Authorization: this.mainStore.token,
          },
        });

        await this.fetchObjects();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },
    async updateAdditionalWork(id, additionalWork) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "additional-works-name/" + id;

        let res = await axios.patch(url, additionalWork, {
          headers: {
            Authorization: this.mainStore.token,
          },
        });

        await this.fetchObjects();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },
    async deleteAdditionalWork(id) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "additional-works-name/" + id;

        let res = await axios.delete(url, {
          headers: {
            Authorization: this.mainStore.token,
          },
        });

        await this.fetchObjects();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },
    async deleteMainWorks(smetaId) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "additional-works-name/smeta/" + smetaId;

        let res = await axios.delete(url, {
          headers: {
            Authorization: this.mainStore.token,
          },
        });

        await this.fetchObjects();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },

    sortObjectsByComplexes(selectedComplex) {
      if (!selectedComplex.length || selectedComplex === "Без фильтра") {
        this.sortedObjectNames = this.objectNames;
        return this.sortedObjectNames;
      }
      let sortedObjects = [];
      let complexes = this.complexesStore.complexes;
      complexes.forEach((complex) => {
        if (selectedComplex === complex.name) {
          sortedObjects.push(...complex.objects);
          sortedObjects = sortedObjects.map((el) => (el.name ? el.name : el));
        }
      });

      this.sortedObjectNames = sortedObjects;
      return this.sortedObjectNames;
    },
    sortObjects(selectedObjectName) {
      if (!selectedObjectName.length || selectedObjectName === "Без фильтра") {
        this.sortedObjects = this.objects;
        return this.sortedObjects;
      }
      let sortedObjects = [];
      this.objects.forEach((object) => {
        if (selectedObjectName === object.name) {
          sortedObjects.push(object);
        }
      });

      this.sortedObjects = sortedObjects;
      return this.sortedObjects;
    },
    getObjectById(id) {
      return this.objects.find((el) => el.id == id);
    },
  },
});
