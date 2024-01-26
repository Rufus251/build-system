<template>
  <nav>
    <ul>
      <li>
        <router-link to="/main"> Главная </router-link>
      </li>
      <li v-if="roleProp === 'admin'">
        <router-link to="/users"> Пользователи </router-link>
      </li>
      <li v-if="roleProp === 'admin'">
        <router-link to="/technical"> Технический </router-link>
      </li>
      <li v-if="roleProp === 'admin' || roleProp === 'manager'">
        <router-link to="/reports"> Все отчёты </router-link>
      </li>
      <li v-if="roleProp === 'user'">
        <router-link to="/my-reports"> Мои отчёты </router-link>
      </li>
    </ul>
    <p v-if="roleProp">{{ nameProp }}</p>
  </nav>
</template>

<script>
export default {
  name: "navbarComp",
  props: {
    roleProp: String,
    nameProp: String,
  },
  data() {
    return {
      model: undefined,
    };
  },
};
</script>

<style scoped lang="scss">
nav {
  width: 100%;
  height: 80px;

  padding-left: 40px;
  padding-right: 40px;

  background-color: #5ea0ea;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
ul {
  list-style: none;

  display: flex;
  align-items: center;
  gap: 50px;
}
ul li a {
  color: white;
  font-size: 24px;
  font-weight: bold;
}
ul li:first-child a {
  font-size: 36px;
}

nav p {
  color: white;
}
</style>
