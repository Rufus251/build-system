<template>
  <header>
    <h1>
      hi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
      quod.
    </h1>
    <p>
      hi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam cum
      itaque possimus ex eum consequuntur voluptas libero maiores, perferendis
      provident sit fugiat debitis eligendi, temporibus dolorum necessitatibus
      vero quo dicta. Commodi totam, ullam impedit dolorem, illo expedita
      suscipit et consectetur quod repudiandae numquam quia sit quidem doloribus
      incidunt a veniam eligendi, in corporis! Voluptatibus, possimus ipsam
      libero natus, explicabo blanditiis fugiat repellendus harum quos at animi
      atque cum sunt! Ut corrupti maxime earum nostrum dignissimos ipsa?
      Explicabo labore placeat reiciendis fugiat voluptatum. Quam, nobis
      laudantium. Nisi, magnam perferendis totam quae, exercitationem mollitia
      earum inventore facere magni nobis error deserunt nesciunt.fff
    </p>
    <textField
      labelProp="giaeirg"
      placeholderProp="123123"
      typeProp="email"
      v-model="variable"
    ></textField>
    <autocompleteField
      labelProp="giaeirg"
      placeholderProp="123123"
      :itemsProp="itemsArr"
      v-model="variable"
    >
    </autocompleteField>
    <primaryTable :keysProp="keys" v-model="table"></primaryTable>
    <primaryButton400 href="/auth">Кнопка</primaryButton400>
    <textareaField labelProp="agra" placeholderProp="1234"></textareaField>
  </header>
</template>

<script>
export default {
  name: "AuthView",
  data() {
    return {
      variable: undefined,
      itemsArr: [
        "California",
        "Colorado",
        "Florida",
        "Georgia",
        "Texas",
        "Wyoming",
      ],
      keys: ["Бетон заливка", "Монтажный кабель"],
      table: undefined
    };
  },
};
</script>
