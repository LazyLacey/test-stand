export default {
  string: function (param) {
    return param;
  },
  number: function (param) {
    if (param === undefined || param === '') {
      return null;
    } else return parseFloat(param);
  },
  boolean: function (param) {
    if (param === '0' || param === 'false' || param === 'null' ) return false 
    else return Boolean(param)
  },
  object: function (param) {
    if (param === undefined || param === '') {
      return null;
    } else return JSON.parse(param);
  },
  undefined: function (param) {
    if (param === undefined || param === '') {
      return null;
    } else return JSON.parse(param);
  },
  objToInput: function (param) {
    return JSON.stringify(param);
  }
};
