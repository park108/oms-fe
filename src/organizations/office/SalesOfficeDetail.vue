<template>
	<header class="header">
		<h1 class="h1">
			Sales Office > {{ this.$store.state.org.salesOffice }}
		</h1>
	</header>
	<Navigation />
	<main class="main">
		<DetailAttribute name="Code" :value="this.$store.state.org.salesOffice" />
		<DetailAttribute name="Description" :value="this.$store.state.org.salesOfficeDesc" />
		<DetailAttribute name="id" :value="this.$store.state.org.id" />
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