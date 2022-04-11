<template>
	<header class="header">
		<h1 class="h1">
			Sales Organization > {{ orgCode }}
		</h1>
	</header>
	<Navigation :enableDelete="!isCreate" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<DetailAttribute name="salesOrg" attribute-name="Sales Org" :value="org.salesOrg" :editable="isCreate" />
			<DetailAttribute name="salesOrgDesc" attribute-name="Description" :value="org.salesOrgDesc" :editable="true" />
			<DetailAttribute name="id" attribute-name="id" :value="org.id" :hidden="isCreate" />
		</div>
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="saveItem" :saveButtonText="isCreate ? 'Create Org.' : 'Update Org.'" />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import DetailAttribute from "../DetailAttribute.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import { OrganizationDataHandler } from '../OrganizationDataHandler';
	import { log, confirmUpdateItem, confirmDeleteItem, confirmCreateItem } from "@/common.js";

	export default {
		data() {
			return {
				isLoading: true,
				isCreate: false,
				org: null,
				orgCode: '',
			}
		},
		components: {
			Navigation,
			DetailAttribute,
			Footer,
			EventButtons
		},
		created() {
			this.orgCode = this.$route.params.org;
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
				this.org = await OrganizationDataHandler.getOrg(this.$store.state.corp.id, "orgs", "salesOrg", this.orgCode);
				if(null !== this.org) {
					this.isLoading = false;
				}
				else {

					// TODO: Make error logic
					
				}
			}
		},
		methods: {
			saveItem: async function() {

				const salesOrg = document.getElementById("salesOrg").value;
				const salesOrgDesc = document.getElementById("salesOrgDesc").value;
				const id = document.getElementById("id").value;

				if("" === salesOrg) {

					// TODO: Make error toast

					log("Please input Sales Org");
					return;
				}

				if("" === salesOrgDesc) {

					// TODO: Make error toast

					log("Please input Sales Org Description");
					return;
				}

				if(this.isCreate) {
					if(!confirmCreateItem()) return;
					const res = await OrganizationDataHandler.postOrg(this.$store.state.corp.id, "orgs", {
						salesOrg: salesOrg,
						salesOrgDesc: salesOrgDesc,
					});
					if(res.isSuccess === true) {
						this.$router.go(-1);
					}
					else {
						// TODO: Make error toast
					}
				}
				else {
					if("" === id) {

						// TODO: Make error toast

						console.error("Error! id is empty!");
						return;
					}

					if(!confirmUpdateItem()) return;
					const res = await OrganizationDataHandler.putOrg(this.$store.state.corp.id, "orgs", salesOrg, {
						salesOrg: salesOrg,
						salesOrgDesc: salesOrgDesc,
						id: id,
					});
					if(res.isSuccess === true) {
						this.$router.go(-1);
					}
					else {
						// TODO: Make error toast
					}
				}
			},
			deleteItem: async function() {
				if(!confirmDeleteItem()) return;

				const salesOrg = document.getElementById("salesOrg").value;

				if("" === salesOrg) {

					// TODO: Make error toast

					console.error("Error! Sales Org. is empty!");
					return;
				}

				const res = await OrganizationDataHandler.deleteOrg(this.$store.state.corp.id, "orgs", salesOrg, {
					salesOrg: salesOrg
				});

				// TODO: Make result toast

				if(res.isSuccess === true) {
					this.$router.go(-1);
				}
				else {
					// TODO: Make error toast
				}
			},
		}
	}
</script>