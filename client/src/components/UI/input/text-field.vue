<template>
  <v-text-field
    variant="outlined"
    :label="labelProp"
    :placeholder="placeholderProp"
    :type="typeProp"
    hide-details
    v-model="model"
  >
  </v-text-field>
</template>

<script>
export default {
  name: "textField",
  props: {
    labelProp: String,
    placeholderProp: String,
    typeProp: String,
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
