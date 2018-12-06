<template>
	<div class="logo row">
		<div class="logo__image">
			<imgLogo />
		</div>

		<div class="logo__section">
			<transition	name="headerTransition" enter-active-class="fadeInRight" leave-active-class="fadeOutLeft">
				<span v-bind:key="header">{{header}}</span>
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
	mounted: function() {
		// var me = this;
		// var tl = new TimelineMax();
		// tl
		// 	.set(".logo", {height:"90vh"})
		// 	.set(".logo__image", {width:"100%"})
		// 	.set(".logo__image svg", {opacity: 1})
		// 	.set(".logo__section", {width:"0%"})
		// 	// .to(".logo__image svg", 2, {x:"-=50", opacity: 1})
			
		// 	.delay(2)

		// 	.to(".logo, .logo__image, .logo__section", .5, {clearProps:"width, height"})

	},
	computed: {
		header(){
			return this.$store.getters.header;
		},
	},
	methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
	