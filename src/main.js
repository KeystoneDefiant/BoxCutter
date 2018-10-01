import Vue from "vue";
import App from "./App.vue";

import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

require("vue2-animate/dist/vue2-animate.min.css");

Vue.config.productionTip = false;

// import TweenMax from "gsap/TweenMax";
// import TimelineMax from "gsap/TimelineMax";

new Vue({
  render: h => h(App)
}).$mount("#app");
