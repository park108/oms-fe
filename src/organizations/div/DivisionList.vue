<template>
	<header class="header">
		<h1 class="h1">
			Divisions of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<Navigation />
	<main class="main">
		<div class="div div--org-listitem" v-for="(div, index) in this.$store.state.list" :key="div.division">
			<span class="span span--detail-attributename span--button-detail" @click="moveDetail" :index="index">{{ div.division }}</span>
			<span class="span">{{ div.divisionDesc }}</span>
		</div>
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="saveItem" saveButtonText="Create New Division" />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	
	export default {
		data() {
			return {
			}
		},
		components: {
			Navigation,
			Footer,
			EventButtons,
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