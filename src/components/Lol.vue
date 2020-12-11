<template>
  <div id="lol">
    <div>
      {{ n }}
    </div>
    <div>
      {{ a }}
    </div>
    <div>
      {{ b }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Lol",
  components: {},
  data() {
    return {
      a: {
        m: 11,
      },
      b: 11,
    };
  },
  props: {
    n: String,
  },
  methods: {
    lol() {
      console.log(this.$data, this.$props);
    },
  },
};
</script>

<style>
#lol {
  color: black;
}
</style>
