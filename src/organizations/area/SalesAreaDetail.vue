<template>
	<Header title="Orgnanization Manager" routeName="orgDashboard" />
	<Navigation
		prevName="Sales Area List"
		:enableDelete="!isCreate"
		:deleteEventFunc="deleteItem"
	/>
	<main class="main">
		<div class="div div--org-title" v-if="!isCreate">
			Sales Area: {{org}}/{{channel}}/{{div}}
		</div>
		<div class="div div--org-title" v-else>
			Sales Area: NEW
		</div>
		<OrgLoading v-if="isLoading" />
		<div class="div div--org-list" role="list" v-else>
			<AttSelect name="salesOrg" attribute-name="Sales Organization" :option-list="this.orgList" :editable="isCreate&&!isPending" :selectedValue="this.area.salesOrg.salesOrg" />
			<AttSelect name="distributionChannel" attribute-name="Distiribution Channel" :option-list="this.channelList" :editable="isCreate&&!isPending" :selectedValue="this.area.distributionChannel.distributionChannel" />
			<AttSelect name="division" attribute-name="Division" :option-list="this.divList" :editable="isCreate&&!isPending" :selectedValue="this.area.division.division" />
			<AttInput name="id" attribute-name="id" :value="this.area.id" :hidden="isCreate" />
		</div>
		<Toaster />
	</main>
	<EventButtons
		:enableSave="isCreate"
		:saveEventFunc="saveItem"
		:saveButtonText="isCreate ? 'Create Sales Area' : 'Update Sales Area'"
	/>
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Navigation from "@/Navigation.vue";
	import OrgLoading from "@/organizations/OrgLoading.vue";
	import AttInput from "../DetailAttributeInput.vue";
	import AttSelect from "../DetailAttributeSelect.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import Toaster from "@/Toaster.vue";
	import { popToast } from "@/Toaster.vue";
	import { OrganizationDataHandler } from '../OrganizationDataHandler';
	import { isUuid, confirmCreateItem, confirmDeleteItem } from "@/common.js";

	export default {
		data() {
			return {
				isLoading: true,
				isPending: false,
				isCreate: false,
				corpId: String,
				area: null,
				org: '',
				channel: '',
				div: '',
				orgList: [],
				channelList: [],
				divList: [],
			}
		},
		components: {
			Header,
			Navigation,
			OrgLoading,
			AttInput,
			AttSelect,
			Footer,
			EventButtons,
			Toaster,
		},
		created() {
			this.corpId = sessionStorage.getItem("corpId");
			if(undefined === this.corpId || !isUuid(this.corpId)) {
				this.$router.push({name: "Index"});
			}

			this.org = this.$route.params.org;
			this.channel = this.$route.params.channel;
			this.div = this.$route.params.div;
			if("NEW" === this.org && "NEW" === this.channel && "NEW" === this.div) {
				this.isCreate = true;
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
			this.orgList = await OrganizationDataHandler.getList(this.corpId, "orgs");
			if(null === this.orgList) {
				popToast("WARNING", "Sales Org. not found.", this.$store);
			}

			this.channelList = await OrganizationDataHandler.getList(this.corpId, "channels");
			if(null === this.channelList) {
				popToast("WARNING", "Channel not found.", this.$store);
			}

			this.divList = await OrganizationDataHandler.getList(this.corpId, "divs");
			if(null === this.divList) {
				popToast("WARNING", "Division not found.", this.$store);
			}

			if(!this.isCreate) {
				this.area = await OrganizationDataHandler.getSalesArea(this.corpId, this.org, this.channel, this.div);
				if(null === this.area) {
					popToast("WARNING", "Sales Area not found.", this.$store);
				}
			}

			this.isLoading = false;
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
					const res = await OrganizationDataHandler.postOrg(this.corpId, "areas", {
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