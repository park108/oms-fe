<template>
	<Header title="Orgnanization Manager" routeName="orgDashboard" />
	<Navigation prevName="Home" />
	<main class="main">
		<div class="div div--main-title">
			Sales Area List
		</div>
		<OrgLoading v-if="isLoading" />
		<div class="div div--detail-list" role="list" v-else>
			<div class="div div--detail-listitem div--org-button" v-for="(area, index) in this.list" @click="moveDetail" :index="index" :key="area.id">
				<span class="span span--detail-attributename" :index="index">
					{{ area.salesOrg.salesOrg }}/{{ area.distributionChannel.distributionChannel }}/{{ area.division.division }}
				</span>
				<span class="span" :index="index">{{ area.salesOrg.salesOrgDesc }}, {{ area.distributionChannel.distributionChannelDesc }}, {{ area.division.divisionDesc }} </span>
			</div>
		</div>
	</main>
	<EventButtons
		:enableSave="true"
		:saveEventFunc="createItem"
		saveButtonText="Create New Sales Area"
	/>
	<Footer />
</template>
<script>
	import Header from "@/common/Header.vue";
	import Navigation from "@/common/Navigation.vue";
	import OrgLoading from "@/organizations/OrgLoading.vue";
	import Footer from "@/common/Footer.vue";
	import EventButtons from "@/common/EventButtons.vue";
	import { isUuid } from "@/common/common.js"
	import { OrganizationDataHandler } from "../OrganizationDataHandler.js";
	
	export default {
		data() {
			return {
				isLoading: true,
				corp: null,
				companyName: '',
				list: []
			}
		},
		props: {
			orgUri: String,
		},
		components: {
			Header,
			Navigation,
			OrgLoading,
			Footer,
			EventButtons,
			OrganizationDataHandler,
		},
		created() {
			this.corpId = sessionStorage.getItem("corpId");
			if(undefined === this.corpId || !isUuid(this.corpId)) {
				this.$router.push({name: "Index"});
			}
		},
		async mounted() {
			this.list = await OrganizationDataHandler.getList(this.corpId, this.orgUri);
			if(null === this.list) {
				popToast("WARNING", "Sales Area not found.", this.$store);
			}
			this.isLoading = false;
		},
		methods: {
			moveDetail: function(e) {
				const index = e.target.getAttribute("index") * 1;
				const org = this.list[index];
				const routeTo = "/orgs/areas/"
					+ org.salesOrg.salesOrg + "/"
					+ org.distributionChannel.distributionChannel + "/"
					+ org.division.division + "/"
				this.$router.push(routeTo);
			},
			createItem: function() {
				const routeTo = "/org/" + this.orgUri + "/NEW/NEW/NEW/";
				this.$router.push(routeTo);
			},
		}
	}
</script>