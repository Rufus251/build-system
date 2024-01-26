<template>
  <main>
    <v-form @submit.prevent v-model="valid">
      <textField
        labelProp="Логин"
        placeholderProp="Ivan_Ivanov1703"
        v-model="login"
        :rulesProp="loginRules"
      ></textField>
      <textField
        labelProp="Пароль"
        placeholderProp="7cWfX7bZ8iJ9KUa0"
        v-model="password"
        :rulesProp="passwordRules"
      ></textField>
      <primaryButton400 @click="send()"> Войти </primaryButton400>
    </v-form>
  </main>
</template>

<script>
export default {
  name: "AuthView",
  data() {
    return {
      valid: false,

      login: "",
      loginRules: [(v) => v.length > 0 || "Введите логин"],
      password: "",
      passwordRules: [(v) => v.length > 0 || "Введите пароль"],
    };
  },
  methods:{
    send(){
      if(this.valid){
        console.log("auth user");
      }
    }
  }
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
</style>
