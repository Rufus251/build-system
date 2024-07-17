<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <primaryRouterButton400 href="/objects"> Назад </primaryRouterButton400>
    <v-form @submit.prevent v-model="valid">
      <div class="mainData">
        <autocompleteField
          labelProp="Жилой комплекс"
          placeholderProp="Название комплекса"
          v-model="complexName"
          :itemsProp="complexNames"
          :rulesProp="complexNameRules"></autocompleteField>
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
        <fileInput
          labelProp="Файл сметы"
          v-model="smeta"
          :rulesProp="smetaRules"></fileInput>
        <p>{{ statusMessage }}</p>
      </div>

      <agreeButton400 @click="checkValid(valid)">
        Создать объект
      </agreeButton400>
    </v-form>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useComplexesStore } from "../store/ComplexesStore";
import { useObjectsStore } from "../store/ObjectsStore";

export default {
  name: "CreateObjectView",
  data() {
    return {
      valid: false,

      statusMessage: "",

      complexName: [],
      objectName: "",
      contractName: "",
      smetaName: "",
      smeta: "",

      complexNameRules: [
        (v) => v.length > 0 || "Выберите комплекс для привязки",
      ],
      objectNameRules: [(v) => v.length > 0 || "Введите название объекта"],
      contractNameRules: [(v) => v.length > 0 || "Введите номер договора"],
      smetaNameRules: [(v) => v.length > 0 || "Введите название сметы"],
      smetaRules: [(v) => v.length > 0 || "Загрузите файл сметы"],
    };
  },
  methods: {
    async checkValid(valid) {
      if (valid) {
        const complex = this.getComplexByName(this.complexName);
        const object = {
          name: this.objectName,
          contractName: this.contractName,
        };
        const smeta = {
          name: this.smetaName,
          smetaFile: this.smeta,
        };
        const res = await this.createObject(complex.id, object, smeta);
        if (res.data.length) {
          this.$router.push("/objects");
        } else {
          this.statusMessage = "Ошибка при создании, попробуйте ещё раз.";
        }
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useComplexesStore, ["complexNames", "getComplexByName"]),
    ...mapState(useObjectsStore, ["createObject"]),
  },
};
</script>

<style scoped lang="scss">
main {
  width: 100%;
  height: calc(100vh - 80px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.mainData {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
}
p {
  text-align: center;
  color: red;
}
</style>
