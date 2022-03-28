<template>
	<header class="header">
		<h1 class="h1">
			Division > {{ this.$store.state.org.division }}
		</h1>
	</header>
	<Navigation />
	<main class="main">
		<DetailAttribute name="division" attribute-name="Division" :value="this.$store.state.org.division"/>
		<DetailAttribute name="divisionDesc" attribute-name="Description" :value="this.$store.state.org.divisionDesc" :editable="true" />
		<DetailAttribute name="id" attribute-name="id" :value="this.$store.state.org.id"/>
	</main>
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
		}
	}
</script>