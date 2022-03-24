<template>
	<header class="header">
		<h1 class="h1">
			Sales Offices of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<div class="div div--org-listitem" v-for="office in this.$store.state.list" :key="office.id">
		<span class="span">{{ office.salesOffice }}</span>
		<span class="span"> : </span>
		<span class="span">{{ office.salesOfficeDesc }}</span>
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