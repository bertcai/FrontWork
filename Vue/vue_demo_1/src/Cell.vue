<template>
  <div class="cell" @click="onClickSelf">
    <template v-if="flag">{{text}}</template>
    <template v-else></template>
  </div>
</template>

<script>
export default {
  props: ["n", "result"],
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
      if (this.result) {
        return;
      }
      this.flag = true;
      this.text = this.n % 2 === 0 ? "x" : "o";
      let a = this.$emit("click", this.text);
      console.log(a)
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


