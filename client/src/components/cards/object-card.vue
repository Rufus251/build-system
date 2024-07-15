<template>
  <div class="card">
    <div class="names">
      <h3>{{ object.name }}</h3>
      <h3>{{ object.contractName }}</h3>
      <h3>{{ object.residentialComplex.name }}</h3>
    </div>
    <div class="btns">
      <primaryRouterButton400 :href="'/editObject/' + object.id">
        Просмотреть
      </primaryRouterButton400>
      <deleteButton400 @click="deleteObject(object.id)">
        Удалить
      </deleteButton400>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useObjectsStore } from "../../store/ObjectsStore";

export default {
  name: "objectCard",
  props: {
    object: Object,
  },

  computed: {
    ...mapState(useObjectsStore, ["deleteObject"]),
  },
};
</script>

<style scoped lang="scss">
.card {
  padding: 15px;
  margin: 10px;

  border: 3px solid black;
  border-radius: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
h3:not(:first-child) {
  margin-top: 15px;
}
</style>
