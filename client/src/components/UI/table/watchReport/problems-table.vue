<template>
  <h3>Проблемы:</h3>
  <table>
    <thead>
      <tr>
        <td>№ п/п</td>
        <td>Вид работ</td>
        <td>Наименование работ</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in problems.ProblemsRow">
        <td>{{ i + 1 }}</td>
        <td>{{ row.description }}</td>
        <td>{{ row.takenMeasures }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "problemsTable",
  props: {
    problems: Array,
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 40px;
}
table {
  border-collapse: collapse;
  margin-top: 20px;
}
td {
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  padding: 10px;
}
thead {
  background-color: #949494;
  color: #ffffff;
  height: 80px;

  tr:nth-child(1) {
    td:nth-child(1) {
      width: 70px;
    }
    td:nth-child(2) {
      width: 660px;
    }
    td:nth-child(3) {
      width: 1135px;
    }
  }
}
tbody {
  tr:nth-child(even) {
    background-color: #e0e0e0;
  }
  tr {
    min-height: 80px;
    height: 100%;
  }
}
</style>
