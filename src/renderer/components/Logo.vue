<template>
  <div class="logo">
    <span class="logo__box">Box<i class="fas fa-dice-d6"></i></span><span class="logo__cutter"><i class="fas fa-cut"></i>Cutter</span>
  </div>
</template>

<script>
import {TweenMax, Power2, TimelineMax} from "gsap/TweenMax";

export default {
  name: "Logo",
  mounted: function() {
	var me = this;
	var tl = new TimelineMax();
    tl.set(".logo", {x:"+=50", opacity: 0})
      .to(".logo", 2, {x:"-=50", opacity: 1})
      .delay(.5)
    .add(me.animationDone)
  },
  methods: {
	  animationDone: function(){
		  
	  }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
	