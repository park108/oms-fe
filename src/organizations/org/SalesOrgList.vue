<template>
	<header class="header">
		<h1 class="h1">
			Sales Organizations of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<nav class="nav">
		<span class="span span--button-back" @click="goBack">&lt; Back</span>
	</nav>
	<div class="div div--org-listitem" v-for="(org, index) in this.$store.state.list" :key="org.salesOrg">
		<span class="span span--button-detail" @click="moveDetail" :index="index">{{ org.salesOrg }}</span>
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
		},
		methods: {
			goBack: function() {
				this.$router.go(-1);
			},
			moveDetail: function(e) {
				const index = e.target.getAttribute("index") * 1;
				const org = this.$store.state.list[index];
				const routeTo = "/orgs/" + org.salesOrg;
				this.$store.state.org = org;
				this.$router.push(routeTo);
			}
		}
	}
</script>