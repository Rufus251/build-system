<template>
  <h3>
    Факт выполненных работ на:
    {{
      `${workDone.doneDate.slice(8, 10)}.${workDone.doneDate.slice(
        5,
        7
      )}.${workDone.doneDate.slice(0, 4)}`
    }}
  </h3>
  <table>
    <thead>
      <tr>
        <td rowspan="2">№ п/п</td>
        <td rowspan="2">Вид работ</td>
        <td rowspan="2">Наименование работ</td>
        <td rowspan="2">Ед. изм.</td>
        <td rowspan="2">
          Помещение <br />
          (МОП / Помещения / Квартиры)
        </td>
        <td colspan="3">План</td>
        <td colspan="3">Факт</td>
        <td rowspan="2">Бригада</td>
        <td rowspan="2">Кол-во человек в бригаде</td>
        <td rowspan="2">Комментарий</td>
      </tr>
      <tr>
        <td>Кол-во этажей</td>
        <td>Кол-во на 1 этаж</td>
        <td>Всего</td>

        <td>Кол-во этажей</td>
        <td>Кол-во на 1 этаж</td>
        <td>Всего</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in workDone.rows">
        <td>{{ i + 1 }}</td>

        <td v-if="row.workType === 'additional'">Доп</td>
        <td v-if="row.workType === 'additional'">
          {{ row.AdditionalWorksName.name }}
        </td>
        <td v-if="row.workType === 'additional'">
          {{ row.AdditionalWorksName.unit }}
        </td>

        <td v-if="row.workType === 'main'">По смете</td>
        <td v-if="row.workType === 'main'">{{ row.MainWorksName.name }}</td>
        <td v-if="row.workType === 'main'">{{ row.MainWorksName.unit }}</td>

        <td>{{ row.room }}</td>

        <td>{{ row.planNumberOfFloor }}</td>
        <td>{{ row.planQuantityPerFloor }}</td>
        <td>{{ row.planTotal }}</td>

        <td>{{ row.factNumberOfFloor }}</td>
        <td>{{ row.factQuantityPerFloor }}</td>
        <td>{{ row.factTotal }}</td>

        <td>{{ row.brigade }}</td>
        <td>{{ row.workersAmount }}</td>
        <td>{{ row.comment }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "factTable",
  props: {
    workDone: Array,
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
      width: 100px;
    }
    td:nth-child(3) {
      width: 440px;
    }
    td:nth-child(4) {
      width: 75px;
    }
    td:nth-child(5) {
      width: 190px;
    }
    td:nth-child(6),
    td:nth-child(7) {
      width: 300px;
    }
    td:nth-child(8) {
      width: 125px;
    }
    td:nth-child(9) {
      width: 100px;
    }
    td:nth-child(10) {
      width: 200px;
    }
  }
  tr:nth-child(2) {
    td {
      width: 100px;
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
