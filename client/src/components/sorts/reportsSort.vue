<template>
  <div class="sort">
    <autocompleteField
      labelProp="Сортировка"
      :itemsProp="['Сначала новые', 'Сначала старые']"
      v-model="orderSort"></autocompleteField>
    <autocompleteField
      labelProp="Объекты"
      :itemsProp="['Без фильтра', ...objectNames]"
      v-model="objectName"></autocompleteField>
    <autocompleteField
      labelProp="Имя сотрудника"
      :itemsProp="['Без фильтра', ...workerSelects]"
      v-model="worker"></autocompleteField>
    <div class="datepickers">
      <label>
        Дата начало <br />
        <input type="date" v-model="dateStart" />
      </label>
      <label>
        Дата конец <br />
        <input type="date" v-model="dateEnd" />
      </label>
    </div>
    <v-select
      label="Есть дополнительные работы"
      :items="['-', 'Есть', 'Нет']"
      variant="outlined"
      density="compact"
      v-model="additional" />
    <v-select
      label="Есть проблемные вопросы"
      :items="['-', 'Есть', 'Нет']"
      variant="outlined"
      density="compact"
      v-model="problems" />
    <primaryButton400
      @click="
        fetchHandle(
          orderSort,
          objectName,
          worker,
          dateStart,
          dateEnd,
          additional,
          problems
        )
      ">
      Найти
    </primaryButton400>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useReportsStore } from "../../store/ReportsStore";
import { useObjectsStore } from "../../store/ObjectsStore";

export default {
  name: "reportsSort",
  props: {
    objectNames: Array,
    workerSelects: Array,
  },
  data() {
    return {
      orderSort: "Сначала новые",
      objectName: null,
      worker: null,
      dateStart: null,
      dateEnd: null,
      additional: "-",
      problems: "-",
    };
  },
  methods: {
    async fetchHandle(
      orderSort,
      objectName,
      worker,
      dateStart,
      dateEnd,
      additional,
      problems
    ) {
      let objectId = null;
      if (objectName) {
        const object = this.objects.find((el) => el.name == objectName);
        if (object) {
          objectId = object.id;
        }
      }

      await this.fetchReportsWithParams(
        orderSort,
        objectId,
        worker,
        dateStart,
        dateEnd,
        additional,
        problems
      );
    },
  },
  computed: {
    ...mapState(useReportsStore, ["fetchReportsWithParams"]),
    ...mapState(useObjectsStore, ["objects"]),
  },
  watch: {
    orderSort: {
      handler(value) {
        if (value == "Сначала новые") this.$emit("update:orderSort", "new");
        if (value == "Сначала старые") this.$emit("update:orderSort", "old");
      },
      deep: true,
    },
    worker: {
      handler(value) {
        if (value === "Без фильтра") {
          this.worker = null;
          value = "";
        }
        this.$emit("update:worker", value || []);
      },
      deep: true,
    },
    objects: {
      handler(value) {
        if (value === "Без фильтра") {
          this.objects = null;
          value = "";
        }
        this.$emit("update:objects", value || []);
      },
      deep: true,
    },
    // dateStart: {
    //   handler(value) {
    //     const date = new Date(Date.parse(`${value}T10:00:00`));
    //     this.$emit("update:dateStart", date.toISOString() || []);
    //   },
    //   deep: true,
    // },
    // dateEnd: {
    //   handler(value) {
    //     const date = new Date(Date.parse(`${value}T10:00:00`));
    //     this.$emit("update:dateEnd", date.toISOString() || []);
    //   },
    //   deep: true,
    // },
    additional: {
      handler(value) {
        this.$emit("update:additional", value);
      },
      deep: true,
    },
    problems: {
      handler(value) {
        this.$emit("update:problems", value);
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.sort {
  max-height: 702px;

  border: 3px solid black;
  border-radius: 15px;

  padding: 20px;
  margin: 10px;

  display: flex;
  flex-direction: column;
  gap: 15px;
}
.datepickers {
  max-width: 400px;
  margin: 10px;

  display: flex;
  justify-content: space-between;
  gap: 20px;

  input {
    padding: 10px;
    margin-top: 10px;

    font-size: 20px;

    border: 1px solid black;
    border-radius: 5px;
  }
}
div.v-input {
  max-width: 400px;
  margin: 10px;
}
</style>
