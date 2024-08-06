<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <div class="createButton">
    <primaryRouterButton400 href="/createObject">
      Добавить объект
    </primaryRouterButton400>
  </div>
  <main>
    <div class="cards">
      <objectCard
        v-for="object in this.sortedObjects"
        :key="object.id"
        :object="object"
      ></objectCard>
    </div>
    <objectSort
      class="sort"
      :complexSelects="complexNames"
      :objectSelects="sortedObjectNames"
      v-model:complexes="complexesSort"
      v-model:objects="objectSort"
    ></objectSort>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../../store/UserStore";
import { useObjectsStore } from "../../store/ObjectsStore";
import { useComplexesStore } from "../../store/ComplexesStore";

export default {
  name: "UsersView",
  data() {
    return {
      complexesSort: null,
      objectSort: null,
    };
  },
  async mounted() {
    await this.fetchObjects();
    await this.fetchAllComplexes();
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useComplexesStore, ["fetchAllComplexes", "complexNames"]),
    ...mapState(useObjectsStore, [
      "fetchObjects",
      "objects",
      "sortedObjects",
      "sortedObjectNames",
      "sortObjectsByComplexes",
      "sortObjects",
    ]),
  },
  watch: {
    complexesSort: {
      handler(value) {
        this.sortObjectsByComplexes(value);
      },
      deep: true,
    },
    objectSort: {
      handler(value) {
        this.sortObjects(value);
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: space-between;
}
.cards {
  min-width: 1200px;
}
</style>
