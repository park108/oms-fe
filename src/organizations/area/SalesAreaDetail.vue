<template>
	<header class="header">
		<h1 class="h1">
			Sales Area > {{ org }}/{{ channel }}/{{ div }}
		</h1>
	</header>
	<Navigation :enableDelete="!isCreate" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<DetailAttribute name="salesOrg" attribute-name="Sales Organization" :value="this.area.salesOrg.salesOrg + ', ' + this.area.salesOrg.salesOrgDesc" :editable="isCreate&&!isPending" />
			<DetailAttribute name="distributionChannel" attribute-name="Distiribution Channel" :value="this.area.distributionChannel.distributionChannel + ', ' + this.area.distributionChannel.distributionChannelDesc" :editable="isCreate&&!isPending" />
			<DetailAttribute name="division" attribute-name="Division" :value="this.area.division.division + ', ' + this.area.division.divisionDesc" :editable="isCreate&&!isPending" />
			<DetailAttribute name="id" attribute-name="id" :value="this.area.id" :hidden="isCreate" />
		</div>
	</main>
	<Toaster />
	<EventButtons :enableSave="isCreate" :saveEventFunc="saveItem" :saveButtonText="isCreate ? 'Create Org.' : 'Update Org.'" />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import DetailAttribute from "../DetailAttribute.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import Toaster from "@/Toaster.vue";
	import { OrganizationDataHandler } from '../OrganizationDataHandler';
	import { log, confirmCreateItem, confirmUpdateItem, confirmDeleteItem } from "@/common.js";

	export default {
		data() {
			return {
				isLoading: true,
				isPending: false,
				isCreate: false,
				area: null,
				org: '',
				channel: '',
				div: '',
			}
		},
		components: {
			Navigation,
			DetailAttribute,
			Footer,
			EventButtons,
			Toaster,
		},
		created() {
			this.org = this.$route.params.org;
			this.channel = this.$route.params.channel;
			this.div = this.$route.params.div;
			if("NEW" === this.org && "NEW" === this.channel && "NEW" === this.div) {
				this.isCreate = true;
				this.isLoading = false;
				this.area = {
					salesOrg: {
						salesOrg: "",
					},
					distributionChannel: {
						distributionChannel: "",
					},
					division: {
						division: "",
					},
					id: "",
				}
			}
		},
		async mounted() {
			this.area = await OrganizationDataHandler.getSalesArea(this.$store.state.corp.id, this.org, this.channel, this.div);
			this.isLoading = false;
			if(null !== this.org) {
				this.isLoading = false;	
			}
			else {
				this.$store.state.toast = {
					type: "WARNING",
					message: "Sales Area not found",
				};
			}
		},
		methods: {
			saveItem: async function() {

				const salesOrg = document.getElementById("salesOrg").value;
				const distributionChannel = document.getElementById("distributionChannel").value;
				const division = document.getElementById("division").value;
				const id = document.getElementById("id").value;

				if("" === salesOrg) {
					this.$store.state.toast = {
						type: "ERROR",
						message: "Please input Sales Org",
					};
					return;
				}
				if("" === distributionChannel) {
					this.$store.state.toast = {
						type: "ERROR",
						message: "Please input Distribution Channel",
					};
					return;
				}
				if("" === division) {
					this.$store.state.toast = {
						type: "ERROR",
						message: "Please input Division",
					};
					return;
				}

				if(this.isCreate) {
					if(!confirmCreateItem("Sales Area")) return;
					const res = await OrganizationDataHandler.postOrg(this.$store.state.corp.id, "areas", {
						salesOrg: salesOrg,
						distributionChannel: distributionChannel,
						division: division,
					});
					if(true === res.isSuccess) {
						this.$store.state.toast = {
							type: "SUCCESS",
							message: "Sales Area " + salesOrg + "/" + distributionChannel + "/" + division + " is created.",
						};
						this.isPending = true;
						setTimeout(() => this.$router.go(-1), 2000);
					}
					else {
						this.$store.state.toast = {
							type: "ERROR",
							message: "Server Error. Please contact administrator.",
						};
					}
				}
			},
			deleteItem: function() {
				if(!confirmDeleteItem("Sales Area")) return;

				log("Yes delete it!");

				// TODO: make item delete logic

				this.$router.go(-1);
			},
		}
	}
</script>