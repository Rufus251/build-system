<template>
  <div class="sort">
    <autocompleteField
      labelProp="Название комплекса"
      placeholderProp="ЖК номер 1"
      :itemsProp="complexNames"
      v-model="complexNameSort"
    ></autocompleteField>
  </div>
</template>

<script>
export default {
  name: "complexSort",
  props: {
    complexNames: Array,
  },
  data() {
    return {
      complexNameSort: null,
    };
  },
  watch: {
    complexNameSort: {
      handler(value) {
        this.$emit("update:complexName", value || "");
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.sort {
  max-height: 123px;

  border: 3px solid black;
  border-radius: 15px;

  padding: 20px;
  margin: 10px;

  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
