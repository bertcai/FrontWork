<template>
  <div>
    <h3>子组件</h3>
    -----{{msg}}
    -----
    <button @click="sendMsg()">点击给父组件传递信息</button>
    ------state-count:{{count}}
    <button @click="increase">increase</button>
    <button @click="decrease">decrease</button>
  </div>
</template>

<script>
export default {
  name: "Son",
  props: {
    msg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      Message: "子组件传递的信息"
    };
  },
  methods: {
    sendMsg() {
      this.$emit("send", this.Message);
    },
    increase() {
      this.$store.commit("increase");
    },
    decrease() {
      this.$store.commit("decrease");
    }
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
};
</script>

<style>
</style>