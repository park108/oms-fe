<template>
	<header class="header">
		<h1 class="h1">
			Sales Group > {{ this.$store.state.org.salesGroup }}
		</h1>
	</header>
	<Navigation :enableDelete="true" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<DetailAttribute name="salesGroup" attribute-name="Sales Group" :value="this.$store.state.org.salesGroup"/>
		<DetailAttribute name="salesGroupDesc" attribute-name="Description" :value="this.$store.state.org.salesGroupDesc" :editable="true" />
		<DetailAttribute name="id" attribute-name="id" :value="this.$store.state.org.id"/>
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="saveItem" saveButtonText="Update Group" /> />
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