<template>
	<nav class="nav">
		<span class="span span--navbutton-back" @click="goBack">&lt; Back</span>
		<span v-if="enableDelete" class="span span--navbutton-delete" @click="deleteEventFunc">Delete</span>
	</nav>
</template>
<script>
	export default {
		props: {
			enableDelete: false,
			deleteEventFunc: null,
		},
		methods: {
			goBack: function() {
				this.$router.go(-1);
			},
		}
	}
</script>