<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="25%" @click="lol" />
    <!-- <component :is="'Lol'" :data="dataN" v-bind="propsToPass"></component> -->

    <div id="lol"></div>
    
    <ul id="props-inputs">
      <li v-for="prop in Object.keys(propsToPass)" :key="prop">
        <input type="text" v-model="propsToShow[prop]" />
      </li>
    </ul>

    <ul id="data-inputs">
      <li v-for="data in Object.keys(dataToPass)" :key="data">
        <input type="text" v-model="dataToShow[data]" />
      </li>
    </ul>
  </div>
</template>

<script>
import Lol from "./components/Lol";
import exts from "./components/exts";
import Vue from "vue";
var ComponentClass = Vue.extend(Lol);

export default {
  name: "App",
  components: {},
  data() {
    return {
      propsToPass: {},
      dataToPass: {},
      propsToShow: {},
      dataToShow: {},
      propsTypes: {},
      dataTypes: {},
      show: true,
      dataN: null,
    };
  },
  beforeMount() {
    var instance = new ComponentClass({
      data: function() {
        return {
          
        }
      },
    });
    console.log(instance)

    Object.keys(Lol.props).forEach((element) => {
      this.propsToPass[element] = null;
      this.propsToShow[element] = null;
    });

    Object.keys(Lol.data()).forEach((element) => {
      this.dataToPass[element] = Lol.data()[element];
      this.dataToShow[element] =
        typeof Lol.data()[element] === "object"
          ? exts.objToInput(Lol.data()[element])
          : Lol.data()[element];
    });
  },
  mounted() {
    Object.keys(Lol.props).forEach((element) => {
      this.propsTypes[element] = typeof Lol.props[element].type();
    });
    Object.keys(Lol.data()).forEach((element) => {
      this.dataTypes[element] = typeof Lol.data()[element];
    });
    this.lol();
  },

  methods: {
    lol() {
      this.checkDataAndPropType();

      // 1 вариант - дату менять можно, но только значения, изначальные пункты даты не удалятся
      // например, если в изначальной дате есть а: {m:11}, то а нельзя назначить пустой объект или объект
      // без свойства m, что не особо удобно

      // let need = this.dataToPass
      // var instance = new ComponentClass({
      //   propsData: this.propsToPass,
      //   data: function () {
      //     return need;
      //   },
      // });

      // конец 1 варианта


      // 2 вариант, меняем дату по пунктам в уже созданном инстансе

      var instance = new ComponentClass({
        propsData: this.propsToPass,
      });
      Object.keys(this.dataToPass).forEach((el) => {
        instance[el] = this.dataToPass[el]
      })


      //конец 2 варианта


      instance.$mount("#lol"); 
      // this.$forceUpdate();
    },
    checkDataAndPropType() {
            let vm = this;

      Object.keys(this.dataToPass).forEach((element) => {
        console.log(vm.dataToPass[element]);
        console.log(vm.dataToShow[element]);
        vm.dataToPass[element] = null;
        console.log(vm.dataToPass[element]);

        var temp = exts[vm.dataTypes[element]](vm.dataToShow[element]);

        console.log();

        vm.dataToPass[element] = temp;

        console.log("--------");
        console.log(vm.dataToPass[element]);
        console.log(vm.dataToShow[element]);
      });
      Object.keys(this.propsToPass).forEach((element) => {
        this.propsToPass[element] = exts[this.propsTypes[element]](
          this.propsToShow[element]
        );
      });
      // console.log(this.dataToPass, this.dataToShow);
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
