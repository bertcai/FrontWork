<template>
  <div>
    <h3>父组件</h3>
    <button @click="increase">increase</button>
    <button @click="decrease">decrease</button>
    ---------{{sonMsg}} ------state-count:{{count}}
    <hr />
    <Son :msg="msg" @send="handleEvent" />
  </div>
</template>

<script>
import Son from "./Son";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Parent",
  data() {
    return {
      msg: "父组件传递的消息",
      sonMsg: ""
    };
  },
  components: {
    Son
  },
  methods: {
    handleEvent(value) {
      this.sonMsg = value;
    },
    // increase() {
    //   this.$store.commit("increase");
    // },
    // decrease() {
    //   this.$store.commit("decrease");
    // },
    ...mapMutations(["increase", "decrease"])
  },
  computed: {
    // count() {
    //   //   return this.$store.state.count;
    //   return this.$store.getters.getCount;
    // }
    ...mapGetters({
      count: "getCount"
    })
  }
};
</script>

<style>
</style>