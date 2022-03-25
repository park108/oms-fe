<template>
	<header class="header">
		<h1 class="h1">
			Sales Area > {{ this.$store.state.org.salesOrg.salesOrg }}
			/{{ this.$store.state.org.distributionChannel.distributionChannel }}
			/{{ this.$store.state.org.division.division }}
		</h1>
	</header>
	<Navigation />
	<main class="main">
		<DetailAttribute name="Sales Organization" :value="this.$store.state.org.salesOrg.salesOrg + ', ' + this.$store.state.org.salesOrg.salesOrgDesc" />
		<DetailAttribute name="Distiribution Channel" :value="this.$store.state.org.distributionChannel.distributionChannel + ', ' + this.$store.state.org.distributionChannel.distributionChannelDesc" />
		<DetailAttribute name="Division" :value="this.$store.state.org.division.division + ', ' + this.$store.state.org.division.divisionDesc" />
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