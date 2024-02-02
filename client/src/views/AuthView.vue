<template>
  <main>
    <v-form @submit.prevent v-model="valid">
      <textField
        labelProp="Логин"
        placeholderProp="Ivan_Ivanov1703"
        v-model="login"
        :rulesProp="loginRules"></textField>
      <textField
        labelProp="Пароль"
        placeholderProp="7cWfX7bZ8iJ9KUa0"
        v-model="password"
        :rulesProp="passwordRules"></textField>
      <p>{{ loginMessage }}</p>
      <primaryButton400 @click="loginHandler({ login, password })">
        Войти
      </primaryButton400>
    </v-form>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";

export default {
  name: "AuthView",
  data() {
    return {
      valid: false,

      login: "",
      loginRules: [(v) => v.length > 0 || "Введите логин"],
      password: "",
      passwordRules: [(v) => v.length > 0 || "Введите пароль"],

      loginMessage: null,
    };
  },
  methods: {
    async loginHandler(user) {
      this.loginMessage = "Авторизация...";

      const res = await this.loginUser(user);
      if (res === 201) {
        this.loginMessage = "Успешно!";
        this.$router.push("/main");
      } else {
        this.loginMessage = "Попытайтесь ещё раз";
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ["loginUser"]),
  },
};
</script>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
p {
  margin: 10px;
}
</style>
