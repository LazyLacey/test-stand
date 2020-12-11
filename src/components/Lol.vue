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
    <div>
      {{ bo }}
    </div>
    <div>
      {{ obj }}
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
    n: {
      type: String,
      default: 'loooooool'
    },
    bo: Boolean,
    obj: {
      type: Function, 
      default: () => ({l: 894032, m: 348329})
    }
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
