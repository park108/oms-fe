<template>
	<Header title="Orgnanization Manager" routeName="orgDashboard" />
	<Navigation
		:prevName="orgDesc + ' List'"
		:enableDelete="!isCreate"
		:deleteEventFunc="deleteItem"
	/>
	<main class="main">
		<div class="div div--main-title">
			{{orgDesc}}: {{selectedOrgCode}}
		</div>
		<OrgLoading v-if="isLoading" :rows="3" />
		<div class="div div--detail-list" role="list" v-else>
			<AttInput :name="orgName" :attribute-name="orgDesc" :value="orgData[orgName]" :editable="isCreate&&!isPending" />
			<AttInput :name="orgName + 'Desc'" attribute-name="Description" :value="orgData[orgName + 'Desc']" :editable="!isPending" />
			<AttInput name="id" attribute-name="id" :value="orgData.id" :hidden="isCreate" />
		</div>
		<Toaster />
	</main>
	<EventButtons
		:enableSave="true"
		:saveEventFunc="saveItem"
		:saveButtonText="isCreate ? 'Create ' + orgDesc : 'Update ' + orgDesc"
	/>
	<Footer />
</template>
<script>
	import Header from "@/common/Header.vue";
	import Navigation from "@/common/Navigation.vue";
	import OrgLoading from "@/organizations/OrgLoading.vue";
	import AttInput from "@/common/DetailAttributeInput.vue";
	import Footer from "@/common/Footer.vue";
	import EventButtons from "@/common/EventButtons.vue";
	import Toaster from "@/common/Toaster.vue";
	import { popToast } from "@/common/Toaster.vue";
	import { OrganizationDataHandler } from './OrganizationDataHandler';
	import { isUuid, confirmUpdateItem, confirmDeleteItem, confirmCreateItem } from "@/common/common.js";

	export default {
		data() {
			return {
				isLoading: true,
				isPending: false,
				isCreate: false,
				corpId: String,
				selectedOrgCode: '',
				orgData: null,
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
			AttInput,
			Footer,
			EventButtons,
			Toaster,
		},
		created() {
			this.corpId = sessionStorage.getItem("corpId");
			if(undefined === this.corpId || !isUuid(this.corpId)) {
				this.$router.push({name: "Index"});
			}

			this.selectedOrgCode = this.$route.params.orgCode;
			if("NEW" === this.selectedOrgCode) {
				this.isCreate = true;
				this.isLoading = false;
				this.orgData = {
					[this.orgName]: "",
					[this.orgName + "Desc"]: "",
					id: "",
				}
			}
		},
		async mounted() {
			if(!this.isCreate) {
				this.orgData = await OrganizationDataHandler.getOrg(this.corpId, this.orgUri, this.orgName, this.selectedOrgCode);
				if(null === this.orgData) {
					popToast("WARNING", this.orgDesc + " not found.", this.$store);
				}
				this.isLoading = false;	
			}
		},
		methods: {
			saveItem: async function() {
				const code = document.getElementById(this.orgName);
				const desc = document.getElementById(this.orgName + "Desc");
				const id = document.getElementById("id").value;

				if("" === code.value) {
					popToast("WARNING", "Please input " + this.orgDesc + ".", this.$store);
					code.focus();
					return;
				}
				if(code.value.indexOf(' ') > -1) {
					popToast("WARNING", "Please remove space in the " + this.orgDesc + " code.", this.$store);
					code.focus();
					return;
				}
				if("" === desc.value) {
					popToast("WARNING", "Please input " +  this.orgDesc + " Description.", this.$store);
					desc.focus();
					return;
				}

				if(this.isCreate) {
					if(!confirmCreateItem(this.orgDesc)) return;
					const res = await OrganizationDataHandler.postOrg(this.corpId, this.orgUri, {
						[this.orgName]: code.value,
						[this.orgName + "Desc"]: desc.value,
					});
					if(true === res.isSuccess) {
						popToast("SUCCESS", this.orgDesc + " " + code.value + " is created.", this.$store);
						this.isPending = true;
						setTimeout(() => this.$router.go(-1), 2000);
					}
					else {
						popToast("ERROR", "Server Error. Please contact administrator.", this.$store);
					}
				}
				else {
					if("" === id) {
						popToast("ERROR", "id is empty. Please contact administrator.", this.$store);
						return;
					}

					if(!confirmUpdateItem(this.orgDesc)) return;
					const res = await OrganizationDataHandler.putOrg(this.corpId, this.orgUri, code.value, {
						[this.orgName]: code.value,
						[this.orgName + "Desc"]: desc.value,
						id: id,
					});
					if(true === res.isSuccess) {
						popToast("SUCCESS", this.orgDesc + " " + code.value + " is updated.", this.$store);
						this.isPending = true;
						setTimeout(() => this.$router.go(-1), 2000);
					}
					else {
						popToast("ERROR", "Server Error. Please contact administrator.", this.$store);
					}
				}
			},
			deleteItem: async function() {
				const code = document.getElementById(this.orgName);

				if("" === code.value) {
					popToast("ERROR", this.orgDesc + " is empty. Please contact administrator.", this.$store);
					return;
				}

				if(!confirmDeleteItem(this.orgDesc)) return;

				const res = await OrganizationDataHandler.deleteOrg(this.corpId, this.orgUri, code.value, {
					[this.orgName]: code.value,
				});

				if(true === res.isSuccess) {
					popToast("SUCCESS", this.orgDesc + " " + code.value + " is deleted.", this.$store);
					this.isPending = true;
					setTimeout(() => this.$router.go(-1), 2000);
				}
				else {
					popToast("ERROR", "Server Error. Please contact administrator.", this.$store);
				}
			},
		}
	}
</script>