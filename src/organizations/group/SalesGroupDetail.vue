<template>
	<header class="header">
		<h1 class="h1">
			Sales Group > {{ this.$store.state.org.salesGroup }}
		</h1>
	</header>
	<Navigation />
	<main class="main">
		<DetailAttribute name="Code" :value="this.$store.state.org.salesGroup" />
		<DetailAttribute name="Description" :value="this.$store.state.org.salesGroupDesc" />
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