<template>
	<transition name="bounce"
				enter-active-class="bounceInLeft"
				leave-active-class="bounceOutRight">
		<div class="FilePaths">
		
		<section class="hero is-primary">
			<div class="hero-body">
				<div class="container">
				<h1 class="title">
					Let's get started!
				</h1>
				<h2 class="subtitle">
					First, let's talk about where your LaunchBox install is.
				</h2>
				</div>
			</div>
		</section>

			<section class="filepath container">

				<b-field grouped>
					<b-input placeholder="Location of your LaunchBox directory" value="I:\Emulation\LaunchBox" expanded></b-input>
					<p class="control">
						<button v-on:click="browsePath" class="button is-secondary">Browse...</button>
					</p>

					<p class="control">
						<a class="button is-primary" v-on:click="setPaths">
						OK
						</a>
					</p>
				</b-field>
			</section>

		</div>
	</transition>
</template>

<script>
export default {
  name: "FilePaths",
  created: function() {
    // `this` points to the vm instance
  },
  methods: {
    setPaths: function() {
      //alert(this.$settings.test)
      // this.$snackbar.open({
      // message: this.$settings.test,
      // type: 'is-info',
      // position: 'is-top',
      // })

      this.$settings.activeState = "ExportType";
      console.log(this.$settings.activeState);
    },

    browsePath: function() {
      alert("browsing Paths");

      //We should save this somehow
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
