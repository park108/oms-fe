<template>
	<nav class="nav">
		<span class="span span--button-back" @click="goBack">&lt; Back</span>
	</nav>
</template>
<script>
	export default {
		methods: {
			goBack: function() {
				this.$router.go(-1);
			},
		}
	}
</script>