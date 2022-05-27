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
	import Header from "@/modules/common/Header.vue";
	import Corporation from "@/modules/organizations/Corporation.vue";
	import DashboardItemLoading from "@/modules/organizations/DashboardItemLoading.vue";
	import DashboardItem from "@/modules/organizations/DashboardItem.vue";
	import Footer from "@/modules/common/Footer.vue";
	import { isUuid } from "@/modules/common/common.js"
	import { OrganizationDataHandler } from "@/modules/organizations/OrganizationDataHandler.js";

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
