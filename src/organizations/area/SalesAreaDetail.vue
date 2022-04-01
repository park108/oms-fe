<template>
	<header class="header">
		<h1 class="h1">
			Sales Area > {{ this.$store.state.org.salesOrg.salesOrg }}/{{ this.$store.state.org.distributionChannel.distributionChannel }}/{{ this.$store.state.org.division.division }}
		</h1>
	</header>
	<Navigation :enableDelete="true" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<DetailAttribute name="salesOrg" attribute-name="Sales Organization" :value="this.$store.state.org.salesOrg.salesOrg + ', ' + this.$store.state.org.salesOrg.salesOrgDesc" />
		<DetailAttribute name="distributionChannel" attribute-name="Distiribution Channel" :value="this.$store.state.org.distributionChannel.distributionChannel + ', ' + this.$store.state.org.distributionChannel.distributionChannelDesc" />
		<DetailAttribute name="division" attribute-name="Division" :value="this.$store.state.org.division.division + ', ' + this.$store.state.org.division.divisionDesc" />
		<DetailAttribute name="id" attribute-name="id" :value="this.$store.state.org.id"/>
	</main>
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import DetailAttribute from "../DetailAttribute.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import { log, confirmDeleteItem } from "@/common.js";

	export default {
		data() {
			return {
			}
		},
		components: {
			Navigation,
			DetailAttribute,
			Footer,
			EventButtons
		},
		created() {
		},
		mounted() {
		},
		methods: {
			deleteItem: function() {
				if(!confirmDeleteItem()) return;

				log("Yes delete it!");

				// TODO: make item delete logic

				this.$router.go(-1);
			},
		}
	}
</script>