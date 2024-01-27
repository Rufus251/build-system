<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <primaryRouterButton400 href="/createTech"> Добавить материал </primaryRouterButton400>
    <autocompleteField
      labelProp="Название материала"
      placeholderProp="Шифер"
      :itemsProp="techNames"
      v-model="autocompleteValue"></autocompleteField>
    <div class="cards">
      <techCard
        v-for="tech in sortTechByValue(autocompleteValue)"
        :tech="tech"></techCard>
    </div>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useTechnicalStore } from "../store/TechnicalStore";

export default {
  name: "UsersView",
  data() {
    return {
      autocompleteValue: undefined,
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useTechnicalStore, ["tech", "techNames", "sortTechByValue"]),
  },
};
</script>

<style scoped lang="scss">
</style>
