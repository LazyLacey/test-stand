<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="25%" @click="lol" />

    <div id="lol"></div>

    <div class="props-inputs--wrapper">
      <ul class="props-inputs">
        <li v-for="prop in Object.keys(propsToPass)" :key="prop" class="list-item">
          <div class="prop-wrapper">
            <div class="prop-name">{{ prop }}</div>
            <div class="prop-label">{{propTypes[prop]}}</div>
            <input type="text" :readonly="propTypes[prop]=='function'" v-model="propsToShow[prop]" />
          </div>
        </li>
      </ul>
    </div>
    
    <div class="data-inputs--wrapper">
      <ul class="data-inputs">
        <li v-for="data in Object.keys(dataToPass)" :key="data" class="list-item">
          <div class="data-wrapper">
            <div class="data-name">{{ data }}</div>
            <div class="data-label">{{dataTypes[data]}}</div>
            <input type="text" :readonly="dataTypes[data]=='function'" v-model="dataToShow[data]" />
          </div>
        </li>
      </ul>
    </div>
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
      propTypes: {},
      dataTypes: {},
    };
  },
  created() {

    Object.keys(Lol.props).forEach((element) => {
      this.propsToPass[element] = Lol.props[element].default;
      this.propsToShow[element] = typeof Lol.props[element].default === "object"
      ? exts.objToInput(Lol.props[element].default)
          : Lol.props[element].default;
    });

    Object.keys(Lol.data()).forEach((element) => {
      this.dataToPass[element] = Lol.data()[element];
      this.dataToShow[element] =
        typeof Lol.data()[element] === "object"
          ? exts.objToInput(Lol.data()[element])
          : Lol.data()[element];
    });
     Object.keys(Lol.props).forEach((element) => {
      this.propTypes[element] = typeof Lol.props[element].type();
    });
    Object.keys(Lol.data()).forEach((element) => {
      this.dataTypes[element] = typeof Lol.data()[element];
    });
  },
  mounted() {
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
    },
    checkDataAndPropType() {
      Object.keys(this.dataToPass).forEach((element) => {
        this.dataToPass[element] = exts[this.dataTypes[element]](this.dataToShow[element]);
      });
      Object.keys(this.propsToPass).forEach((element) => {
        this.propsToPass[element] = exts[this.propTypes[element]](
          this.propsToShow[element]
        );
      });
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
 
.list-item {
  list-style: none;
}
</style>
