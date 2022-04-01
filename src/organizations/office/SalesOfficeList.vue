<template>
	<header class="header">
		<h1 class="h1">
			Sales Offices of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<Navigation />
	<main class="main">
		<div class="div div--org-listitem" v-for="(office, index) in this.$store.state.list" :key="office.salesOffice">
			<span class="span span--detail-attributename span--button-detail" @click="moveDetail" :index="index">{{ office.salesOffice }}</span>
			<span class="span">{{ office.salesOfficeDesc }}</span>
		</div>
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="createItem" saveButtonText="Create New Office" />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import { log } from "@/common.js";
	
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
				const office = this.$store.state.list[index];
				const routeTo = "/offices/" + office.salesOffice;
				this.$store.state.org = office;
				this.$router.push(routeTo);
			},
			createItem: function() {
				log("CREATE ITEM!!");
			},
		}
	}
</script>