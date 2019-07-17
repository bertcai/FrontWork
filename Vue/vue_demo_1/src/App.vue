<template>
  <div>
    <div>n:{{n}}</div>
    <div class="row">
      <Cell @click="onClickCell(0, $event)" v-bind:n="n"></Cell>
      <Cell @click="onClickCell(1, $event)" v-bind:n="n"></Cell>
      <Cell @click="onClickCell(2, $event)" v-bind:n="n"></Cell>
    </div>
    <div class="row">
      <Cell @click="onClickCell(3, $event)" v-bind:n="n"></Cell>
      <Cell @click="onClickCell(4, $event)" v-bind:n="n"></Cell>
      <Cell @click="onClickCell(5, $event)" v-bind:n="n"></Cell>
    </div>
    <div class="row">
      <Cell @click="onClickCell(6, $event)" v-bind:n="n"></Cell>
      <Cell @click="onClickCell(7, $event)" v-bind:n="n"></Cell>
      <Cell @click="onClickCell(8, $event)" v-bind:n="n"></Cell>
    </div>
    <div>map:{{map}}</div>
    <div>result:{{result}}</div>
  </div>
</template>

<script>
import Cell from "./Cell";

export default {
  components: {
    Cell
  },
  data: () => {
    return {
      flag: false,
      n: 0,
      map: [[null, null, null], [null, null, null], [null, null, null]],
      result: false
    };
  },
  methods: {
    onClickCell(i, text) {
      console.log(i);
      console.log(text);
      this.n++;
      this.map[Math.floor(i / 3)][i % 3] = text;
      this.test();
    },
    test() {
      const map = this.map;
      for (let i = 0; i < 2; i++) {
        if (
          map[i][0] !== null &&
          map[i][0] === map[i][1] &&
          map[i][1] === map[i][2]
        ) {
          this.result = true;
        }
      }
      for (let j = 0; j < 2; j++) {
        if (
          map[0][j] !== null &&
          map[0][j] === map[1][j] &&
          map[1][j] === map[2][j]
        ) {
          this.result = true;
        }
      }
      if (
        map[1][1] !== null &&
        map[0][0] === map[1][1] &&
        map[1][1] === map[2][2]
      ) {
        this.result = true;
      }
      if (
        map[1][1] !== null &&
        map[0][2] === map[1][1] &&
        map[1][1] === map[2][0]
      ) {
        this.result = true;
      }
    }
  }
};
</script>

<style>
.row {
  display: flex;
  width: 305px;
  justify-content: space-between;
}
</style>
