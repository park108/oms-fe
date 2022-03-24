<template>
	<header class="header">
		<h1 class="h1">
			Sales Organizations of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<div class="div div--org-listitem" v-for="org in this.$store.state.list" :key="org.salesOrg">
		<span class="span">{{ org.salesOrg }}</span>
		<span class="span"> : </span>
		<span class="span">{{ org.salesOrgDesc }}</span>
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