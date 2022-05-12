<template>
	<Header title="Orgnanization Manager" routeName="orgDashboard" />
	<main class="main">
		<div class="div div--dashboard-box">
			<DashboardItemLoading v-if="isLoading" :isSplitThree="true" />
			<DashboardItem v-else :isSplitThree="true" orgDesc="Sales Orgs" orgName="salesOrg" :list="overview.orgs" />
			<DashboardItemLoading v-if="isLoading" :isSplitThree="true" />
			<DashboardItem v-else :isSplitThree="true" orgDesc="Distribution Channels" orgName="distributionChannel" :list="overview.channels" />
			<DashboardItemLoading v-if="isLoading" :isSplitThree="true" />
			<DashboardItem v-else :isSplitThree="true" orgDesc="Divisions" orgName="division" :list="overview.divs" />
		</div>

		<DashboardItemLoading v-if="isLoading" />
		<DashboardItem v-else orgDesc="Sales Areas" orgName="salesArea" :list="overview.areas" />

		<div class="div div--dashboard-box">
			<DashboardItemLoading v-if="isLoading" :isSplitTwo="true" />
			<DashboardItem v-else :isSplitTwo="true" orgDesc="Sales Offices" orgName="salesOffice" :list="overview.offices" />
			<DashboardItemLoading v-if="isLoading" :isSplitTwo="true" />
			<DashboardItem v-else :isSplitTwo="true" orgDesc="Sales Groups" orgName="salesGroup" :list="overview.groups" />
		</div>
	</main>
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Corporation from "@/Corporation.vue";
	import DashboardItemLoading from "@/organizations/DashboardItemLoading.vue";
	import DashboardItem from "@/organizations/DashboardItem.vue";
	import Footer from "@/Footer.vue";
	import { isUuid } from "@/common.js"
	import { OrganizationDataHandler } from "@/organizations/OrganizationDataHandler.js";

	export default {
		data() {
			return {
				isLoading: true,
				corpId: String,
				overview: null,
			}
		},
		components: {
			Header,
			Corporation,
			DashboardItemLoading,
			DashboardItem,
			Footer,
		},
		created() {
			this.corpId = sessionStorage.getItem("corpId");
			if(undefined === this.corpId || !isUuid(this.corpId)) {
				this.$router.push({name: "Index"});
			}

			document.title = "Organization Manager - OMS";
		},
		async mounted() {
			this.overview = await OrganizationDataHandler.getOverview(this.corp);
			if(null === this.overview) {
				popToast("WARNING", "Organization data not found.", this.$store);
			}
			this.isLoading = false;
		},
	};
</script>
