<template>
  <table>
    <tr v-for="rows in model" :key="rows">
      <td>
        <autocompleteField
          :items="keysProp"
          v-model="rows.key"
        ></autocompleteField>
      </td>
      <td>
        <textField v-model="rows.value"></textField>
      </td>
    </tr>
  </table>
  <primaryButton400 @click="model.push({ key: '', value: '' })">
    Добавить строку
  </primaryButton400>
</template>

<script>
export default {
  name: "primaryTable",
  props: {
    keysProp: Array,
  },
  data() {
    return {
      model: [
        {
          key: "",
          value: "",
        },
      ],
    };
  },
  watch: {
    model: {
      handler(value) {
        this.$emit("update:modelValue", value || undefined);
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
table,
th,
td {
  border-collapse: collapse;
  border: 1px solid black;
}
table {
  margin: 10px;
}
tr:nth-child(even) {
  background-color: #eeeeee;
}
</style>
