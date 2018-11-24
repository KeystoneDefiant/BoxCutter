<template>
  <section id="navigation" class="container-fluid">
	  
	  <div class="row">
			<div class="navLeft navSection col-6 d-flex flex-row align-items-stretch">
				<transition	name="buttonTransitionLeft" enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
					<b-button v-for="elements in leftNav" v-on:click="elements.click" v-show="elements.show" v-bind:key="elements.id" :to="elements.link">
						<div :class="'btn__icon fas fa-'+elements.icon"></div>
						<div class="btn__text">{{elements.text}}</div>
					</b-button>
				</transition>
			</div>

			<div class="navRight navSection col-6 d-flex flex-row-reverse align-items-stretch">
				<transition	name="buttonTransitionRight" enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
					<b-button v-for="elements in rightNav" v-on:click="`{{elements.click}}`" v-show="elements.show" v-bind:key="elements.id" :to="elements.link">
						<div :class="'btn__icon fas fa-'+elements.icon"></div>
						<div class="btn__text">{{elements.text}}</div>
					</b-button>
				</transition>
			</div>
	  </div>

  </section>
</template>

<script>
import {TweenMax, Power2, TimelineMax} from "gsap/TweenMax";

export default {
	name: "Navigation",
	computed: {
		leftNav(){
			return this.$store.getters.leftNav;
		},

		rightNav(){
			return this.$store.getters.rightNav;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
	