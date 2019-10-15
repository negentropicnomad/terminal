import Vue from "vue";

import Terminal from "./Terminal.vue";

const Components = {
  Terminal
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;