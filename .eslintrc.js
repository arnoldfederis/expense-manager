module.exports = {
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential"
  ],
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "vue/html-indent": ["error", 2],
    "camelcase": ["warn", { properties: "never" , "ignoreDestructuring": true, "ignoreImports": true, ignoreGlobals: true }],
    "object-curly-spacing": ["error", "always", { "objectsInObjects": false }],
    "vue/mustache-interpolation-spacing": ["error", "always"],
    "key-spacing": ["error", { "beforeColon": false }]
  },
  "globals": {
    "axios": true,
    "process": true,
    "Vue": true,
    "moment": true,
    "Form": true,
    "VueRouter": true,
    "_": true
  }
};
