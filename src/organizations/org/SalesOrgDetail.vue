<template>
	<header class="header">
		<h1 class="h1">
			Sales Organization > {{ this.$store.state.org.salesOrg }}
		</h1>
	</header>
	<nav class="nav">
		<span class="span span--button-back" @click="goBack">&lt; Back</span>
	</nav>
	<div class="div div--org-listitem">
		<span class="span">Code: </span><span class="span">{{ this.$store.state.org.salesOrg }}</span>
	</div>
	<div class="div div--org-listitem">
		<span class="span">Description: </span><span class="span">{{ this.$store.state.org.salesOrgDesc }}</span>
	</div>
	<div class="div div--org-listitem">
		<span class="span">id: </span><span class="span">{{ this.$store.state.org.id }}</span>
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
		},
		methods: {
			goBack: function() {
				this.$router.go(-1);
			},
		}
	}

	const orgUri = "orgs";
</script>