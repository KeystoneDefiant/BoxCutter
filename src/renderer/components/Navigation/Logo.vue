<template>
	<div class="logo row">
		<div class="logo__image col-4">
			<imgLogo />
		</div>

		<div class="logo__section col-8">
			<transition	name="headerTransition" enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
				<span>{{header}}</span>
			</transition>
		</div>
	</div>
</template>

<script>
import {TweenMax, Power2, TimelineMax} from "gsap/TweenMax";
import imgLogo from '../../assets/logo.svg';
export default {
	name: "Logo",
	components: {
		imgLogo
	},
	// mounted: function() {
	// 	var me = this;
	// 	var tl = new TimelineMax();
	// 	tl.set(".logo", {x:"+=50", opacity: 0})
	// 		.to(".logo", 2, {x:"-=50", opacity: 1})
	// 		.delay(.5)
	// 	.add(me.animationDone)
	// },
	computed: {
		header(){
			return this.$store.getters.header;
		},
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
	