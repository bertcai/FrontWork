<template>
  <div class="cell" @click="onClickSelf">
    <template v-if="flag">{{text}}</template>
    <template v-else></template>
  </div>
</template>

<script>
export default {
  props: ["n"],
  data() {
    return {
      flag: false,
      text: ""
    };
  },
  methods: {
    onClickSelf() {
      if (this.text !== "") {
        return;
      }
      this.flag = true;
      this.text = this.n % 2 === 0 ? "x" : "o";
      this.$emit("click", this.text);
    }
  }
};
</script>

<style>
.cell {
  border: 1px solid black;
  width: 100px;
  height: 100px;
  font-size: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


