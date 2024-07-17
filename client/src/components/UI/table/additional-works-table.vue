<template>
  <table>
    <thead>
      <tr>
        <td>№</td>
        <td>Наименование работы</td>
        <td>Ед. изм.</td>
        <td>Выполнено</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows">
        <td v-if="row.id != -1">{{ i + 1 }}</td>
        <td v-if="row.id != -1">{{ row.name }}</td>
        <td v-if="row.id != -1">{{ row.unit }}</td>
        <td v-if="row.id != -1">{{ row.total }}</td>

        <td v-if="row.id == -1">{{ i + 1 }}</td>
        <td v-if="row.id == -1">
          <textField
            labelProp="Название работы"
            placeholderProp="Работа номер 1"
            v-model="row.name">
          </textField>
        </td>
        <td v-if="row.id == -1">
          <textField
            labelProp="Ед. Изм."
            placeholderProp="м2"
            v-model="row.unit">
          </textField>
        </td>
        <td v-if="row.id == -1">
          <textField
            labelProp="Всего выполнено"
            placeholderProp="1000"
            v-model="row.total">
          </textField>
        </td>

        <td>
          <deleteCrossButton @click="deleteRow(row.id, i)"></deleteCrossButton>
        </td>
        <td>
          <agreeButton200 v-if="row.id == -1" @click="fetchNewRow(i)">
            Добавить
          </agreeButton200>
          <primaryButton200 v-else @click="">Подробнее</primaryButton200>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4">
          <primaryButton400 id="add" @click="addRow()">
            Добавить строку
          </primaryButton400>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { mapState } from "pinia";
import { useObjectsStore } from "../../../store/ObjectsStore";

export default {
  name: "additionalWorksTable",
  props: {
    additionalWorks: Array,
    smetaId: Number,
  },
  data() {
    return {
      rows: [],
    };
  },
  methods: {
    async deleteRow(rowId, i) {
      const conf = confirm("Вы точно хотите удалить эту работу?");
      if (conf) {
        if (rowId != -1) {
          const res = await this.deleteAdditionalWork(rowId);
          if (res.status === 200) {
            this.rows.splice(i, 1);
            this.emitAdditionalWorks();
          }
        } else {
          this.rows.splice(i, 1);
        }
      }
    },
    addRow() {
      this.rows.push({
        id: -1,
        name: "",
        unit: "",
        total: "",
      });
    },
    async fetchNewRow(rowIndex) {
      let newRow = { ...this.rows[rowIndex] };
      newRow = {
        ...newRow,
        total: +newRow.total,
      };
      delete newRow.id;
      const res = await this.addAdditionalWork(this.smetaId, newRow);
      if (res.status === 201) {
        alert("Работа добавлена!");
        this.rows[rowIndex] = res.data;
        this.emitAdditionalWorks();
      } else {
        alert("Ошибка при добавлении работы");
      }
    },
    async emitAdditionalWorks() {
      this.$emit("update:additionalWorks", this.rows || []);
    },
  },
  computed: {
    ...mapState(useObjectsStore, ["deleteAdditionalWork", "addAdditionalWork"]),
  },
  watch: {
    additionalWorks: {
      handler(value) {
        this.rows = [...value];
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  margin: 10px;
}
thead {
  background-color: #949494;
  color: #ffffff;
  height: 80px;
}
tr {
  min-height: 80px;
  height: 100%;
}
tr:nth-child(even) {
  background-color: #e0e0e0;
}
td {
  border: 1px solid black;
  text-align: center;
  font-size: 20px;
  padding: 10px;
}
td:nth-child(1) {
  width: 80px;
}
td:nth-child(2) {
  width: 840px;
  text-align: left;
}
td:nth-child(3) {
  width: 180px;
}
td:nth-child(4) {
  width: 360px;
}
td:nth-child(5),
td:nth-child(6) {
  height: 100%;
  background: #ffffff;
  border: none;
}
tfoot tr td button.v-btn#add {
  margin: 0 auto;
}
table tbody tr td div.v-input {
  min-width: 0px;
}
</style>
