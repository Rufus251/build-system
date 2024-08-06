<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <primaryRouterButton400 href="/objects"> Назад </primaryRouterButton400>
    <v-form @submit.prevent v-model="valid">
      <div class="mainData">
        <textField
          labelProp="Название объекта"
          placeholderProp="Объект номер 1"
          v-model="objectName"
          :rulesProp="objectNameRules">
        </textField>
        <textField
          labelProp="Название договора"
          placeholderProp="Договор номер 1"
          v-model="contractName"
          :rulesProp="contractNameRules"></textField>
        <textField
          labelProp="Название сметы"
          placeholderProp="Смета номер 1"
          v-model="smetaName"
          :rulesProp="smetaNameRules"></textField>
      </div>
      <agreeButton400 @click="checkValid(valid)">
        Обновить данные
      </agreeButton400>
      <br />
      <fileInput
        labelProp="Файл сметы"
        v-model="smeta"
        :rulesProp="smetaRules"></fileInput>
      <agreeButton400 @click="addSmeta()"> Добавить смету </agreeButton400>
    </v-form>

    <h2>Основные работы</h2>
    <deleteButton400 @click="deleteAllMainWorks()">
      Удалить все основные работы
    </deleteButton400>
    <mainWorksTable
      v-model:mainWorks="mainWorks"
      :smetaId="smetaId"></mainWorksTable>

    <h2>Дополнительные работы</h2>
    <agreeButton400 @click="getAdditionalSmeta(smetaId)">
        Скачать xlsx
      </agreeButton400>
    <additionalWorksTable
      v-model:additionalWorks="additionalWorks"
      :smetaId="smetaId"></additionalWorksTable>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useComplexesStore } from "../store/ComplexesStore";
import { useObjectsStore } from "../store/ObjectsStore";

export default {
  name: "EditObjectView",
  data() {
    return {
      valid: false,

      statusMessage: "",

      objectName: "",
      contractName: "",
      smetaName: "",
      smeta: "",

      objectNameRules: [(v) => v.length > 0 || "Введите название объекта"],
      contractNameRules: [(v) => v.length > 0 || "Введите номер договора"],
      smetaNameRules: [(v) => v.length > 0 || "Введите название сметы"],
      smetaRules: [],

      object: null,
      smetaId: null,
      mainWorks: [],
      additionalWorks: [],
    };
  },
  mounted() {
    const id = this.$route.params.id;
    const object = this.getObjectById(+id);

    this.objectName = object.name;
    this.contractName = object.contractName;
    this.smetaName = object.smeta.name;

    this.object = object;
    this.smetaId = object.smeta.id;
    this.mainWorks = object.smeta.mainWorksName;
    this.additionalWorks = object.smeta.additionalWorksName;
  },
  methods: {
    async checkValid(valid) {
      if (valid) {
        let object = {
          name: this.objectName,
          contractName: this.contractName,
        };
        let smeta = {
          id: this.smetaId,
          name: this.smetaName,
        };

        const res = await this.updateObject(this.object.id, object, smeta);

        if (res.status === 200) {
          alert("Данные обновлены");
        } else {
          alert("Ошибка при обновлении данных");
        }
      }
    },
    async addSmeta() {
      if (this.smeta) {
        const smeta = {
          id: this.smetaId,
          smetaFile: this.smeta,
        };
        const res = await this.uploadSmeta(smeta);
        console.log(res);
        if (res.status === 201) {
          alert("Смета загружена!");
          this.mainWorks.push(...res.data);
        }
      } else {
        alert("Нет файла для загрузки!");
      }
    },
    async deleteAllMainWorks() {
      const conf = confirm(
        "Вы уверены что хотите удалить все основные работы?"
      );
      if (conf) {
        const res = await this.deleteMainWorks(this.smetaId);
        if (res.data.count != 0) {
          alert("Основные работы удалены!");
          this.mainWorks = [];
          this.$router.push("/objects");
        } else {
          alert("Ошибка при удалении!");
        }
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useObjectsStore, [
      "getObjectById",
      "updateObject",
      "uploadSmeta",
      "getAdditionalSmeta",
      "deleteMainWorks",
    ]),
  },
  watch: {},
};
</script>

<style scoped lang="scss">
main {
  width: 100%;
}
.mainData {
  display: flex;
}
h2 {
  margin: 10px;
  margin-top: 30px;
}
p {
  text-align: center;
  color: red;
}
</style>
