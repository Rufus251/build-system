<template>
  <div class="sort">
    <autocompleteField
      labelProp="Логин сотрудника"
      placeholderProp="Ivanov_Ivan"
      :itemsProp="['Без фильтра', ...loginSelects]"
      v-model="userLogin"
    ></autocompleteField>
    <autocompleteField
      labelProp="Имя сотрудника"
      placeholderProp="Иванов Иван Иванович"
      :itemsProp="['Без фильтра', ...nameSelects]"
      v-model="userName"
    ></autocompleteField>
    <autocompleteField
      labelProp="Роль сотрудника"
      placeholderProp="Иванов Иван Иванович"
      :itemsProp="['Без фильтра', ...roleSelects]"
      v-model="userRole"
    ></autocompleteField>
    <autocompleteField
      labelProp="Должность сотрудника"
      placeholderProp="Иванов Иван Иванович"
      :itemsProp="['Без фильтра', ...positionSelects]"
      v-model="userPosition"
    ></autocompleteField>
    <autocompleteField
      labelProp="Жилые комплексы"
      :itemsProp="['Без фильтра', ...complexSelects]"
      v-model="userComplexes"
    ></autocompleteField>
    <autocompleteField
      labelProp="Объекты"
      :itemsProp="['Без фильтра', ...objectSelects]"
      v-model="userObjects"
    ></autocompleteField>
    <primaryButton400
      @click="
      fetchUsersWithParams(
          userLogin,
          userName,
          userRole,
          userPosition,
          userComplexes,
          userObjects
        )
      "
    >
      Найти
    </primaryButton400>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useUsersStore } from "../../store/UsersStore";

export default {
  name: "userSort",
  props: {
    loginSelects: Array,
    nameSelects: Array,
    roleSelects: Array,
    positionSelects: Array,
    complexSelects: Array,
    objectSelects: Array,
  },
  data() {
    return {
      userLogin: null,
      userName: null,
      userRole: null,
      userPosition: null,
      userComplexes: null,
      userObjects: null,
    };
  },
  computed: {
    ...mapState(useUsersStore, ["fetchUsersWithParams"]),
  },
  watch: {
    userLogin: {
      handler(value) {
        if (value === "Без фильтра") {
          this.userLogin = null;
          value = "";
        }
        this.$emit("update:userLogin", value || "");
      },
    },
    userName: {
      handler(value) {
        if (value === "Без фильтра") {
          this.userName = null;
          value = "";
        }
        this.$emit("update:userName", value || "");
      },
    },
    userRole: {
      handler(value) {
        if (value === "Без фильтра") {
          this.userRole = null;
          value = "";
        }
        this.$emit("update:userRole", value || "");
      },
    },
    userPosition: {
      handler(value) {
        if (value === "Без фильтра") {
          this.userPosition = null;
          value = "";
        }
        this.$emit("update:userPosition", value || "");
      },
    },
    userComplexes: {
      handler(value) {
        if (value === "Без фильтра") {
          this.userComplexes = null;
          value = "";
        }
        this.$emit("update:userComplexes", value || []);
      },
      deep: true,
    },
    userObjects: {
      handler(value) {
        if (value === "Без фильтра") {
          this.userObjects = null;
          value = "";
        }
        this.$emit("update:userObjects", value || []);
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.sort {
  max-height: 700px;
  
  border: 3px solid black;
  border-radius: 15px;

  padding: 20px;
  margin: 10px;

  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
