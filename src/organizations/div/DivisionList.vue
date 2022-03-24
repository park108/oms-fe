<template>
	<header class="header">
		<h1 class="h1">
			Divisions of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<div class="div div--org-listitem" v-for="div in this.$store.state.list" :key="div.division">
		<span class="span">{{ div.division }}</span>
		<span class="span"> : </span>
		<span class="span">{{ div.divisionDesc }}</span>
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