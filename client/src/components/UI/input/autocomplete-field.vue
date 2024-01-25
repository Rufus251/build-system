<template>
  <v-autocomplete
    variant="outlined"
    :label="labelProp"
    :placeholder="placeholderProp"
    :items="itemsProp"
    hide-details
    v-model="model"
  >
  </v-autocomplete>
</template>

<script>
export default {
  name: "autocompleteField",
  props: {
    labelProp: String,
    placeholderProp: String,
    itemsProp: Array
  },
  data() {
    return {
      model: undefined,
    };
  },
  watch: {
    model(value) {
      this.$emit("update:modelValue", value || undefined);
    },
  },
};
</script>

<style scoped lang="scss">
.v-text-field {
  min-width: 400px;
  max-width: 400px;

  margin: 10px;
}
</style>
