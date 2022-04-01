<template>
	<header class="header">
		<h1 class="h1">
			Sales Organization > {{ this.$store.state.org.salesOrg }}
		</h1>
	</header>
	<Navigation :enableDelete="true" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<DetailAttribute name="salesOrg" attribute-name="Sales Org" :value="this.$store.state.org.salesOrg"/>
		<DetailAttribute name="salesOrgDesc" attribute-name="Description" :value="this.$store.state.org.salesOrgDesc" :editable="true" />
		<DetailAttribute name="id" attribute-name="id" :value="this.$store.state.org.id"/>
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="saveItem" saveButtonText="Update Org." /> />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import DetailAttribute from "../DetailAttribute.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";

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
			saveItem: function() {
				console.log("SAVE!");
			},
			deleteItem: function() {
				console.log("DELETE!");
			},
		}
	}
</script>