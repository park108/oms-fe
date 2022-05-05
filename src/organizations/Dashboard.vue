<template>
	<Header title="Orgnanization Manager" routeName="orgDashboard" />
	<main class="main">
		<section class="section section--split-one">
			<Corporation @setCorpId="setCorpId" />
		</section>

		<div class="div div--dashboard-box">
			<DashboardItemLoading v-if="isLoading" :isSplitThree="true" />
			<DashboardItem v-else :isSplitThree="true" orgDesc="Sales Orgs" orgName="salesOrg" :list="overview.orgs" />
			<DashboardItemLoading v-if="isLoading" :isSplitThree="true" />
			<DashboardItem v-else :isSplitThree="true" orgDesc="Distribution Channels" orgName="salesOrg" :list="overview.channels" />
			<DashboardItemLoading v-if="isLoading" :isSplitThree="true" />
			<DashboardItem v-else :isSplitThree="true" orgDesc="Divisions" orgName="division" :list="overview.divs" />
		</div>

		<DashboardItemLoading v-if="isLoading" />
		<DashboardItem v-else orgDesc="Sales Areas" orgName="salesArea" :list="overview.areas" />

		<div class="div div--dashboard-box">
			<DashboardItemLoading v-if="isLoading" :isSplitTwo="true" />
			<DashboardItem v-else :isSplitTwo="true" orgDesc="Sales Offices" orgName="salesOffice" :list="overview.offices" />
			<DashboardItemLoading v-if="isLoading" :isSplitTwo="true" />
			<DashboardItem v-else :isSplitTwo="true" orgDesc="Distribution Channels" orgName="salesOrg" :list="overview.groups" />
		</div>
	</main>
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Corporation from "@/organizations/Corporation.vue";
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
		watch: {
			corpId: async function () {
				if(isUuid(this.corpId)) {
					this.overview = await OrganizationDataHandler.getOverview(this.corp);
					if(null === this.overview) {
						popToast("WARNING", "Organization data not found.", this.$store);
					}
					this.isLoading = false;
				}
			},
		},
		methods: {
			setCorpId(value) {
				this.corpId = value;
			}
		},
	};
</script>
