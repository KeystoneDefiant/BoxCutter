<template>
  <div class="logo">
    <span class="logo__box">Box</span><span class="logo__cutter">Cutter</span>
  </div>
</template>

<script>
export default {
  name: "Logo",
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
</style>
