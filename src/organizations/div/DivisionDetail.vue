<template>
	<header class="header">
		<h1 class="h1">
			{{ ORG_DESC }} > {{ orgCode }}
		</h1>
	</header>
	<Navigation :enableDelete="!isCreate" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<DetailAttribute :name="ORG_NAME" :attribute-name="ORG_DESC" :value="org[ORG_NAME]" :editable="isCreate&&!isPending" />
			<DetailAttribute :name="ORG_NAME + 'Desc'" attribute-name="Description" :value="org[ORG_NAME + 'Desc']" :editable="!isPending" />
			<DetailAttribute name="id" attribute-name="id" :value="org.id" :hidden="isCreate" />
		</div>
	</main>
	<Toaster />
	<EventButtons :enableSave="true" :saveEventFunc="saveItem" :saveButtonText="isCreate ? 'Create ' + ORG_DESC : 'Update ' + ORG_DESC" />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import DetailAttribute from "../DetailAttribute.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import Toaster from "@/Toaster.vue";
	import { OrganizationDataHandler } from '../OrganizationDataHandler';
	import { confirmUpdateItem, confirmDeleteItem, confirmCreateItem } from "@/common.js";

	export const ORG_DESC = "Division";
	export const ORG_NAME = "division";
	export const ORG_URI = "divs";

	export default {
		data() {
			return {
				ORG_DESC: ORG_DESC,
				ORG_NAME: ORG_NAME,
				ORG_URI: ORG_URI,

				isLoading: true,
				isPending: false,
				isCreate: false,
				org: null,
				orgCode: '',
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
			this.orgCode = this.$route.params.div;
			if("NEW" === this.orgCode) {
				this.isCreate = true;
				this.isLoading = false;
				this.org = {
					salesOrg: "",
					salesOrgDesc: "",
					id: "",
				}
			}
		},
		async mounted() {
			if(!this.isCreate) {
				this.org = await OrganizationDataHandler.getOrg(this.$store.state.corp.id, ORG_URI, ORG_NAME, this.orgCode);
				if(null !== this.org) {
					this.isLoading = false;	
				}
				else {
					this.$store.state.toast = {
						type: "WARNING",
						message: ORG_DESC + " not found",
					};
				}
			}
		},
		methods: {
			saveItem: async function() {

				const orgCode = document.getElementById(ORG_NAME).value;
				const orgDesc = document.getElementById(ORG_NAME + "Desc").value;
				const id = document.getElementById("id").value;

				if("" === orgCode) {
					this.$store.state.toast = {
						type: "ERROR",
						message: "Please input " + ORG_DESC,
					};
					return;
				}
				if("" === orgDesc) {
					this.$store.state.toast = {
						type: "ERROR",
						message: "Please input " +  ORG_DESC + " Description",
					};
					return;
				}

				if(this.isCreate) {
					if(!confirmCreateItem()) return;
					const res = await OrganizationDataHandler.postOrg(this.$store.state.corp.id, ORG_URI, {
						division: orgCode,
						divisionDesc: orgDesc,
					});
					if(true === res.isSuccess) {
						this.$store.state.toast = {
							type: "SUCCESS",
							message: ORG_DESC + " " + orgCode + " is created.",
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
				else {
					if("" === id) {
						this.$store.state.toast = {
							type: "ERROR",
							message: "id is empty. Please contact administrator.",
						};
						return;
					}

					if(!confirmUpdateItem()) return;
					const res = await OrganizationDataHandler.putOrg(this.$store.state.corp.id, ORG_URI, orgCode, {
						division: orgCode,
						divisionDesc: orgDesc,
						id: id,
					});
					if(true === res.isSuccess) {
						this.$store.state.toast = {
							type: "SUCCESS",
							message: ORG_DESC + " " + orgCode + " is updated.",
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
			deleteItem: async function() {
				if(!confirmDeleteItem()) return;

				const orgCode = document.getElementById(ORG_NAME).value;

				if("" === orgCode) {
					this.$store.state.toast = {
						type: "ERROR",
						message: ORG_DESC + " is empty. Please contact administrator.",
					};
					return;
				}

				const res = await OrganizationDataHandler.deleteOrg(this.$store.state.corp.id, ORG_URI, orgCode, {
					division: orgCode
				});

				if(true === res.isSuccess) {
					this.$store.state.toast = {
						type: "SUCCESS",
						message: ORG_DESC + " " + orgCode + " is deleted.",
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
			},
		}
	}
</script>