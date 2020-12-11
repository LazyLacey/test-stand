export default {
  string: function (param) {
    return param;
  },
  number: function (param) {
    return parseFloat(param);
  },
  boolean: function (param) {
    return !!param;
  },
  object: function (param) {
    return JSON.parse(param);
  },
  undefined: function (param) {
    return JSON.parse(param);
  },
  objToInput: function (param) {
    return JSON.stringify(param);
  }
};
