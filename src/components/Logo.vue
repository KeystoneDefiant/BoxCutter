<template>
  <div class="logo">
    <span class="logo__box">Box</span><span class="logo__cutter">Cutter</span>
  </div>
</template>

<script>
export default {
  name: "logo",
  created: function() {
    // var tl = new TimelineMax();
    // tl.set(".logo", {y:"+=50", opacity: 0})
    //   .to(".logo", .5, {y:"-=50", opacity: 1})
    //   .delay(.5)
    // .add(animationDone)
  },
  methods: {},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.logo {
  font-size: 500%;

  > span {
    width: 50%;
	display: inline-block;
	margin: 0px;
	padding: 0px;
  }
  &__box {
    background: $color-shadeDark;
    color: $color-textLight;
    text-align: right;
  }
  &__cutter {
    background: $color-accentLight;
    color: $color-textDark;
    text-align: left;
  }
}
</style>
