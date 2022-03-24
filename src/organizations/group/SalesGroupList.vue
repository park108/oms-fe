<template>
	<header class="header">
		<h1 class="h1">
			Sales Groups of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<div class="div div--org-listitem" v-for="group in this.$store.state.list" :key="group.id">
		<span class="span">{{ group.salesGroup }}</span>
		<span class="span"> : </span>
		<span class="span">{{ group.salesGroupDesc }}</span>
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