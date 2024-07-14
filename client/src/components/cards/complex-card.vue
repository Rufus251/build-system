<template>
    <div class="card">
      <div class="names">
        <h3>Название: {{ complex.name }}</h3>
      </div>
      <div class="btns">
        <primaryRouterButton400 :href="`/editComplex/${complex.id}`">
          Изменить
        </primaryRouterButton400>
        <deleteButton400 @click="deleteComplex(complex.id)"> Удалить </deleteButton400>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from "pinia";
  import { useComplexesStore} from "../../store/ComplexesStore";
  
  export default {
    name: "complexCard",
    props: {
      complex: Object,
    },
    computed: {
      ...mapState(useComplexesStore, ["deleteComplex"]),
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
  </style>