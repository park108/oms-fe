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
			<section class="section section--split-three">
				<SalesOrg :corpId="corpId" />
			</section>
			<section class="section section--split-three">
				<DistributionChannel :corpId="corpId" />
			</section>
			<section class="section section--split-three">
				<Division :corpId="corpId" />
			</section>
		</div>

		<section class="section section--split-one">
			<SalesArea :corpId="corpId" />
		</section>

		<div class="div div--dashboard-box">
			<section class="section section--split-two">
				<SalesOffice :corpId="corpId" />
			</section>
			<section class="section section--split-two">
				<SalesGroup :corpId="corpId" />
			</section>
		</div>
	</main>
	<footer class="footer">
		© 2022 Jongkil Park.
	</footer>
</template>

<script>
import Corporation from "../components/Corporation.vue";
import SalesOrg from "../components/SalesOrg.vue";
import DistributionChannel from "../components/DistributionChannel.vue";
import Division from "../components/Division.vue";
import SalesArea from "../components/SalesArea.vue";
import SalesOffice from "../components/SalesOffice.vue";
import SalesGroup from "../components/SalesGroup.vue";

export default {
	data() {
		return {
			corpId: String
		}
	},
	components: {
		Corporation,
		SalesOrg,
		DistributionChannel,
		Division,
		SalesArea,
		SalesOffice,
		SalesGroup,
	},
	methods: {
		setCorpId(value) {
			this.corpId = value;
		}
	},
};
</script>
