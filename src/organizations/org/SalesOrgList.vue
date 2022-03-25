<template>
	<header class="header">
		<h1 class="h1">
			Sales Organizations of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<Navigation />
	<main class="main">
		<div class="div div--org-listitem" v-for="(org, index) in this.$store.state.list" :key="org.salesOrg">
			<span class="span span--button-detail" @click="moveDetail" :index="index">{{ org.salesOrg }}</span>
			<span class="span"> : </span>
			<span class="span">{{ org.salesOrgDesc }}</span>
		</div>
	</main>
	<Footer />
</template>
<script>
	import Navigation from "../../Navigation.vue";
	import Footer from "../../Footer.vue";
	
	export default {
		data() {
			return {
			}
		},
		components: {
			Navigation,
			Footer,
		},
		created() {
		},
		mounted() {
		},
		methods: {
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