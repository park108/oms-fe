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
	<section class="section section--event-buttons">
		<button class="button button--data-save">Save</button>
	</section>
	<Footer />
</template>
<script>
	import Navigation from "../../Navigation.vue";
	import DetailAttribute from "../DetailAttribute.vue";
	import Footer from "../../Footer.vue";

	export default {
		data() {
			return {
			}
		},
		components: {
			Navigation,
			DetailAttribute,
			Footer,
		},
		created() {
		},
		mounted() {
		},
		methods: {
			goBack: function() {
				this.$router.go(-1);
			},
			deleteItem: function() {
				console.log("DELETE!");
			},
		}
	}
</script>