<template>
	<header class="header">
		<h1 class="h1">
			Distribution Channels of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<div class="div div--org-listitem" v-for="channel in this.$store.state.list" :key="channel.distributionChannel">
		<span class="span">{{ channel.distributionChannel }}</span>
		<span class="span"> : </span>
		<span class="span">{{ channel.distributionChannelDesc }}</span>
	</div>
	<footer class="footer">
		© 2022 Jongkil Park.
	</footer>
</template>
<script>
export default {
	data() {
		return {
		}
	},
	created() {
	},
	mounted() {
	}
}
</script>