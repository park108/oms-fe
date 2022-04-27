<template>
	<Header />
	<Navigation
		prevName="Sales Area List"
		:enableDelete="!isCreate"
		:deleteEventFunc="deleteItem"
	/>
	<main class="main">
		<div class="div div--org-title">
			Sales Area: {{org}}/{{channel}}/{{div}}
		</div>
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
	<EventButtons
		:enableSave="isCreate"
		:saveEventFunc="saveItem"
		:saveButtonText="isCreate ? 'Create Org.' : 'Update Org.'"
	/>
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Navigation from "@/Navigation.vue";
	import DetailAttribute from "../DetailAttribute.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import Toaster from "@/Toaster.vue";
	import { popToast } from "@/Toaster.vue";
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
			Header,
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
				popToast("WARNING", "Sales Area not found.", this.$store);
			}
		},
		methods: {
			saveItem: async function() {

				const salesOrg = document.getElementById("salesOrg");
				const distributionChannel = document.getElementById("distributionChannel");
				const division = document.getElementById("division");

				if("" === salesOrg.value) {
					popToast("WARNING", "Please input Sales Org.", this.$store);
					salesOrg.focus();
					return;
				}
				if("" === distributionChannel.value) {
					popToast("WARNING", "Please input Distribution Channel.", this.$store);
					distributionChannel.focus();
					return;
				}
				if("" === division.value) {
					popToast("WARNING", "Please input Division.", this.$store);
					division.focus();
					return;
				}

				if(this.isCreate) {
					if(!confirmCreateItem("Sales Area")) return;
					const res = await OrganizationDataHandler.postOrg(this.$store.state.corp.id, "areas", {
						salesOrg: salesOrg.value,
						distributionChannel: distributionChannel.value,
						division: division.value,
					});
					if(true === res.isSuccess) {
						popToast("SUCCESS", "Sales Area " + salesOrg.value + "/" + distributionChannel.value + "/" + division.value + " is created.", this.$store);
						this.isPending = true;
						setTimeout(() => this.$router.go(-1), 2000);
					}
					else {
						popToast("ERROR", "Server Error. Please contact administrator.", this.$store);
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