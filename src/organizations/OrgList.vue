<template>
	<Header title="Orgnanization Manager" routeName="orgDashboard" />
	<Navigation prevName="Home" />
	<main class="main">
		<div class="div div--main-title">
			{{orgDesc}} List
		</div>
		<OrgLoading v-if="isLoading" />
		<div class="div div--detail-list" role="list" v-else>
			<div class="div div--detail-listitem div--org-button" role="listitem" v-for="(orgItem, index) in list" @click="moveDetail" :index="index" :key="orgItem.id">
				<span class="span span--detail-attributename" :index="index">{{ orgItem[orgName] }}</span>
				<span class="span" :index="index">{{ orgItem[orgName + 'Desc'] }}</span>
			</div>
		</div>
		<Toaster />
	</main>
	<EventButtons
		:enableSave="true"
		:saveEventFunc="createItem"
		:saveButtonText="'Create New ' + orgDesc"
	/>
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Navigation from "@/Navigation.vue";
	import OrgLoading from "@/organizations/OrgLoading.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import Toaster from "@/Toaster.vue";
	import { popToast } from "@/Toaster.vue";
	import { isUuid } from "@/common.js"
	import { OrganizationDataHandler } from "./OrganizationDataHandler.js";
	
	export default {
		data() {
			return {
				isLoading: true,
				corpId: String,
				companyName: '',
				list: [],
			}
		},
		props: {
			orgUri: String,
			orgDesc: String,
			orgName: String,
		},
		components: {
			Header,
			Navigation,
			OrgLoading,
			Footer,
			EventButtons,
			OrganizationDataHandler,
			Toaster,
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
				popToast("WARNING", this.orgDesc + " not found.", this.$store);
			}
			this.isLoading = false;
		},
		methods: {
			moveDetail: function(e) {
				const index = e.target.getAttribute("index") * 1;
				const org = this.list[index];
				this.$router.push({
					name: this.orgName + "Detail",
					params: {
						orgCode: org[this.orgName],
					}
				});
			},
			createItem: function() {
				this.$router.push({
					name: this.orgName + "Detail",
					params: {
						orgCode: "NEW",
					}
				});
			}
		}
	}
</script>