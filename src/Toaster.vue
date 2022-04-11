<template>
	<section class="section section--toaster-box" :class="{
		'section--toaster-activate': isActivated,
		'section--toaster-info': isInfo,
		'section--toaster-success': isSuccess,
		'section--toaster-warning': isWarning,
		'section--toaster-error': isError,
	}">
		<div class="div" >
			{{ this.$store.state.toast.message }}
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				isActivated: false,
				isInfo: false,
				isSuccess: false,
				isWarning: false,
				isError: false,
			}
		},
		watch: {
			'$store.state.toast.message': function() {
				console.log(this.$store.state.toast)
				if("" === this.$store.state.toast.message) {
					this.isActivated = false;
				}
				else {
					this.isActivated = true;
					this.isInfo = "INFO" === this.$store.state.toast.type;
					this.isSuccess = "SUCCESS" === this.$store.state.toast.type;
					this.isWarning = "WARNING" === this.$store.state.toast.type;
					this.isError = "ERROR" === this.$store.state.toast.type;

					setTimeout(() => {
						this.isInfo = this.isSuccess = this.isWarning = this.isError = false;
						this.$store.state.toast.message = "";
					}, 3000);
				}
			}
		}
	}
</script>