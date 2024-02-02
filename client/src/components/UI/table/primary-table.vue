<template>
  <table>
    <tr v-for="rows in table" :key="rows.id">
      <td>
        <h3>{{ rows.keyId }}</h3>
      </td>
      <td>
        <h3>{{ rows.value }}</h3>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "primaryTable",
  props: {
    table: Array,
  },
};
</script>

<style scoped lang="scss">
table,
th,
td {
  border-collapse: collapse;
  border: 1px solid black;

  padding: 10px;
}
table {
  margin: 10px;
}
tr:nth-child(even) {
  background-color: #eeeeee;
}
</style>
