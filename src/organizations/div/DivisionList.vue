<template>
	<header class="header">
		<h1 class="h1">
			Divisions of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<Navigation />
	<div class="div div--org-listitem" v-for="(div, index) in this.$store.state.list" :key="div.division">
		<span class="span span--button-detail" @click="moveDetail" :index="index">{{ div.division }}</span>
		<span class="span"> : </span>
		<span class="span">{{ div.divisionDesc }}</span>
	</div>
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
				const div = this.$store.state.list[index];
				const routeTo = "/divs/" + div.division;
				this.$store.state.org = div;
				this.$router.push(routeTo);
			}
		}
	}
</script>