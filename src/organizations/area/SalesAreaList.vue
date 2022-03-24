<template>
	<header class="header">
		<h1 class="h1">
			Sales Areas of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<div class="div div--org-listitem" v-for="area in this.$store.state.list" :key="area.id">
		<span class="span">
			{{ area.salesOrg.salesOrg }}/{{ area.distributionChannel.distributionChannel }}/{{ area.division.division }}
		</span>
		<span class="span"> : </span>
		<span class="span">{{ area.salesOrg.salesOrgDesc }}, </span>
		<span
			>{{ area.distributionChannel.distributionChannelDesc }},
		</span>
		<span class="span">{{ area.division.divisionDesc }} </span>
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