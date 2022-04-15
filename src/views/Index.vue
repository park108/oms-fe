<template>
	<header class="header">
		<h1 class="h1">
			Order Management System Console
		</h1>
	</header>
	<main class="main">
		<section class="section section--split-one">
			<Corporation @setCorpId="setCorpId" />
		</section>

		<div class="div div--dashboard-box">
			<DashboardItem :corpId="corpId" :isSplitThree="true" orgDesc="Sales Orgs" orgName="salesOrg" orgUri="orgs" />
			<DashboardItem :corpId="corpId" :isSplitThree="true" orgDesc="Distribution Channels" orgName="distributionChannel" orgUri="channels" />
			<DashboardItem :corpId="corpId" :isSplitThree="true" orgDesc="Divisions" orgName="division" orgUri="divs" />
		</div>

		<SalesArea :corpId="corpId" orgUri="areas" />

		<div class="div div--dashboard-box">
			<DashboardItem :corpId="corpId" :isSplitTwo="true" orgDesc="Sales Offices" orgName="salesOffice" orgUri="offices" />
			<DashboardItem :corpId="corpId" :isSplitTwo="true" orgDesc="Sales Groups" orgName="salesGroup" orgUri="groups" />
		</div>
	</main>
	<Footer />
</template>
<script>
	import Corporation from "../organizations/corp/Corporation.vue";
	import DashboardItem from "@/organizations/DashboardItem.vue";
	import SalesArea from "../organizations/area/SalesAreaDashboardItem.vue";
	import Footer from "@/Footer.vue";

	export default {
		data() {
			return {
				corpId: String
			}
		},
		components: {
			Corporation,
			DashboardItem,
			SalesArea,
			Footer,
		},
		methods: {
			setCorpId(value) {
				this.corpId = value;
			}
		},
	};
</script>
