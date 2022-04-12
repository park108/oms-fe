<template>
	<header class="header">
		<h1 class="h1">
			Sales Group > {{ orgCode }}
		</h1>
	</header>
	<Navigation :enableDelete="!isCreate" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<DetailAttribute name="salesGroup" attribute-name="Sales Group" :value="org.salesGroup" :editable="isCreate&&!isPending" />
			<DetailAttribute name="salesGroupDesc" attribute-name="Description" :value="org.salesGroupDesc" :editable="!isPending" />
			<DetailAttribute name="id" attribute-name="id" :value="org.id" :hidden="isCreate" />
		</div>
	</main>
	<Toaster />
	<EventButtons :enableSave="true" :saveEventFunc="saveItem" :saveButtonText="isCreate ? 'Create Group' : 'Update Group'" />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import DetailAttribute from "../DetailAttribute.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import Toaster from "@/Toaster.vue";
	import { OrganizationDataHandler } from '../OrganizationDataHandler';
	import { confirmCreateItem, confirmUpdateItem, confirmDeleteItem } from "@/common.js";

	export default {
		data() {
			return {
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
			this.orgCode = this.$route.params.group;
			if("NEW" === this.orgCode) {
				this.isCreate = true;
				this.isLoading = false;
				this.org = {
					salesGroup: "",
					salesGroupDesc: "",
					id: "",
				}
			}
		},
		async mounted() {
			if(!this.isCreate) {
				this.org = await OrganizationDataHandler.getOrg(this.$store.state.corp.id, "groups", "salesGroup", this.orgCode);
				if(null !== this.org) {
					this.isLoading = false;	
				}
				else {
					this.$store.state.toast = {
						type: "WARNING",
						message: "Sales Group not found",
					};
				}
			}
		},
		methods: {
			saveItem: async function() {

				const salesGroup = document.getElementById("salesGroup").value;
				const salesGroupDesc = document.getElementById("salesGroupDesc").value;
				const id = document.getElementById("id").value;

				if("" === salesGroup) {
					this.$store.state.toast = {
						type: "ERROR",
						message: "Please input Sales Org",
					};
					return;
				}
				if("" === salesGroupDesc) {
					this.$store.state.toast = {
						type: "ERROR",
						message: "Please input Sales Org Description",
					};
					return;
				}

				if(this.isCreate) {
					if(!confirmCreateItem()) return;
					const res = await OrganizationDataHandler.postOrg(this.$store.state.corp.id, "groups", {
						salesGroup: salesGroup,
						salesGroupDesc: salesGroupDesc,
					});
					if(true === res.isSuccess) {
						this.$store.state.toast = {
							type: "SUCCESS",
							message: "Sales Group " + salesGroup + " is created.",
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
					const res = await OrganizationDataHandler.putOrg(this.$store.state.corp.id, "groups", salesGroup, {
						salesGroup: salesGroup,
						salesGroupDesc: salesGroupDesc,
						id: id,
					});
					if(true === res.isSuccess) {
						this.$store.state.toast = {
							type: "SUCCESS",
							message: "Sales Group " + salesGroup + " is updated.",
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

				const salesGroup = document.getElementById("salesGroup").value;

				if("" === salesGroup) {
					this.$store.state.toast = {
						type: "ERROR",
						message: "Sales Group is empty. Please contact administrator.",
					};
					return;
				}

				const res = await OrganizationDataHandler.deleteOrg(this.$store.state.corp.id, "orgs", salesGroup, {
					salesGroup: salesGroup
				});

				if(true === res.isSuccess) {
					this.$store.state.toast = {
						type: "SUCCESS",
						message: "Sales Group " + salesGroup + " is deleted.",
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