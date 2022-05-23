<template>
	<Header title="Management Console" routeName="Index" />
	<main class="main">
		<section class="section section--split-one">
			<Corporation />
		</section>
		<div class="div div--dashboard-box">
			<section class="section section--index-menu section--dashboard-linktodetail section--split-two" @click="moveOrganizationManager">
				<h1 class="h1">Organization</h1>
			</section>
			<section class="section section--index-menu section--dashboard-linktodetail section--split-two" @click="moveCustomerManager">
				<h1 class="h1">Customer</h1>
			</section>
			<section class="section section--index-menu section--dashboard-linktodetail section--split-two" @click="moveProductManager">
				<h1 class="h1">Product</h1>
			</section>
			<section class="section section--index-unavailable section--index-menu section--split-two">
				<h1 class="h1">Pricing</h1>
			</section>
			<section class="section section--index-unavailable section--index-menu section--split-two">
				<h1 class="h1">Sales Order</h1>
			</section>
			<section class="section section--index-unavailable section--index-menu section--split-two">
				<h1 class="h1">Order Confirmation</h1>
			</section>
		</div>
	</main>
	<Footer />
</template>
<script>
	import Header from "@/common/Header.vue";
	import Corporation from "@/organizations/Corporation.vue";
	import Footer from "@/common/Footer.vue";

	export default {
		data() {
			return {
			}
		},
		components: {
			Header,
			Corporation,
			Footer,
		},
		created() {
			document.title = "Management Console - OMS";
		},
		methods: {
			moveOrganizationManager: function() {
				this.$router.push({name: "orgDashboard"});
			},
			moveCustomerManager: function() {
				this.$router.push({name: "customerList"});
			},
			moveProductManager: function() {
				this.$router.push({name: "productList"});
			},
		}
	};
</script>
