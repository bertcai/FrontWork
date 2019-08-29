<template>
  <div>
    Out ------state-count:{{count}}
    <button @click="increase">increase</button>
    <button @click="decrease">decrease</button>
  </div>
</template>

<script>
export default {
  name: "Out",
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  methods: {
    increase() {
      this.$store.commit("increase");
    },
    decrease() {
      this.$store.commit("decrease");
    }
  }
};
</script>

<style>
</style>