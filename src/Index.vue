<template>
	<Header title="Management Console" routeName="Index" />
	<main class="main">
		<section class="section section--dashboard-linktodetail section--split-one" @click="moveOrganizationManager">
			<h1 class="h1">Organization Manager</h1>
		</section>
		<section class="section section--dashboard-linktodetail section--split-one">
			<h1 class="h1">Customer Manager</h1>
		</section>
		<div class="div div--dashboard-box">
			<section class="section section--dashboard-linktodetail section--split-two">
				<h1 class="h1">Product Manager</h1>
			</section>
			<section class="section section--dashboard-linktodetail section--split-two">
				<h1 class="h1">Pricing Manager</h1>
			</section>
		</div>
		<div class="div div--dashboard-box">
			<section class="section section--dashboard-linktodetail section--split-two">
				<h1 class="h1">Sales Order</h1>
			</section>
			<section class="section section--dashboard-linktodetail section--split-two">
				<h1 class="h1">Confirmation</h1>
			</section>
		</div>
	</main>
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Footer from "@/Footer.vue";

	export default {
		data() {
			return {
			}
		},
		components: {
			Header,
			Footer,
		},
		methods: {
			moveOrganizationManager: function() {
				this.$router.push({name: "orgDashboard"});
			},
		}
	};
</script>
