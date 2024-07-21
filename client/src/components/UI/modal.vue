<template>
  <div v-if="isOpen" @click="closeModal()" class="modalBg">
    <div class="modalBody">
      <deleteCrossButton
        class="closeBtn"
        @click="closeModal()"></deleteCrossButton>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    isOpen: Boolean,
  },
  methods: {
    closeModal(event) {
      console.log(event);
      this.$emit("update:isOpen", false);
    },
  },
};
</script>

<style scoped>
.modalBg {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.2);
}
.modalBody {
  position: relative;

  background-color: white;
  border: 3px solid black;
  border-radius: 10px;

  padding: 50px;
}
.closeBtn {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
