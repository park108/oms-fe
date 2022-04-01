<template>
	<header class="header">
		<h1 class="h1">
			Sales Office > {{ this.$store.state.org.salesOffice }}
		</h1>
	</header>
	<Navigation :enableDelete="true" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<DetailAttribute name="salesOffice" attribute-name="Sales Office" :value="this.$store.state.org.salesOffice"/>
		<DetailAttribute name="salesOfficeDesc" attribute-name="Description" :value="this.$store.state.org.salesOfficeDesc" :editable="true" />
		<DetailAttribute name="id" attribute-name="id" :value="this.$store.state.org.id"/>
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="saveItem" saveButtonText="Update Office" /> />
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