<template>
	<header class="header">
		<h1 class="h1">
			Sales Areas of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<Navigation />
	<main class="main">
		<div class="div div--org-listitem" v-for="(area, index) in this.$store.state.list" :key="area.id">
			<span class="span span--detail-attributename span--button-detail" @click="moveDetail" :index="index">
				{{ area.salesOrg.salesOrg }}/{{ area.distributionChannel.distributionChannel }}/{{ area.division.division }}
			</span>
			<span class="span">{{ area.salesOrg.salesOrgDesc }}, {{ area.distributionChannel.distributionChannelDesc }}, {{ area.division.divisionDesc }} </span>
		</div>
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="createItem" saveButtonText="Create New Area" />
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
				const area = this.$store.state.list[index];
				const routeTo = "/areas/"
					+ area.salesOrg.salesOrg + "/"
					+ area.distributionChannel.distributionChannel + "/"
					+ area.division.division
				this.$store.state.org = area;
				this.$router.push(routeTo);
			},
			createItem: function() {
				log("CREATE ITEM!!");
			},
		}
	}
</script>