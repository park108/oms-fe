<template>
	<Header title="Orgnanization Manager" routeName="orgDashboard" />
	<Navigation
		prevName="Sales Area List"
		:enableDelete="!isCreate"
		:deleteEventFunc="deleteItem"
	/>
	<main class="main">
		<div class="div div--main-title" v-if="!isCreate">
			Sales Area: {{org}}/{{channel}}/{{div}}
		</div>
		<div class="div div--main-title" v-else>
			Sales Area: NEW
		</div>
		<OrgLoading v-if="isLoading" />
		<div class="div div--detail-list" role="list" v-else>
			<div class="div div--detail-listitem">
				<span class="span span--detail-attributename">Sales Org.</span>
				<OrgSelector name="salesOrg" apiUri="orgs" :corpId="this.corpId" :selectedValue="area.salesOrg.salesOrg" :disabled="!isCreate&&!isPending" />
			</div>
			<div class="div div--detail-listitem">
				<span class="span span--detail-attributename">Distribution Channel</span>
				<OrgSelector name="distributionChannel" apiUri="channels" :corpId="this.corpId" :selectedValue="area.distributionChannel.distributionChannel" :disabled="!isCreate&&!isPending" />
			</div>
			<div class="div div--detail-listitem">
				<span class="span span--detail-attributename">Division</span>
				<OrgSelector name="division" apiUri="divs" :corpId="this.corpId" :selectedValue="area.division.division" :disabled="!isCreate&&!isPending" />
			</div>
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
	import Header from "@/common/Header.vue";
	import Navigation from "@/common/Navigation.vue";
	import OrgLoading from "@/organizations/OrgLoading.vue";
	import AttInput from "@/common/DetailAttributeInput.vue";
	import OrgSelector from "@/organizations/OrgSelector.vue";
	import Footer from "@/common/Footer.vue";
	import EventButtons from "@/common/EventButtons.vue";
	import Toaster from "@/common/Toaster.vue";
	import { popToast } from "@/common/Toaster.vue";
	import { OrganizationDataHandler } from '../OrganizationDataHandler';
	import { isUuid, confirmCreateItem, confirmDeleteItem } from "@/common/common.js";

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
			}
		},
		components: {
			Header,
			Navigation,
			OrgLoading,
			AttInput,
			OrgSelector,
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