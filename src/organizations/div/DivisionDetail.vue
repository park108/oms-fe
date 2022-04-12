<template>
	<header class="header">
		<h1 class="h1">
			Division > {{ orgCode }}
		</h1>
	</header>
	<Navigation :enableDelete="!isCreate" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<DetailAttribute name="division" attribute-name="Division" :value="org.division" :editable="isCreate&&!isPending" />
			<DetailAttribute name="divisionDesc" attribute-name="Description" :value="org.divisionDesc" :editable="!isPending" />
			<DetailAttribute name="id" attribute-name="id" :value="org.id" :hidden="isCreate" />
		</div>
	</main>
	<Toaster />
	<EventButtons :enableSave="true" :saveEventFunc="saveItem" :saveButtonText="isCreate ? 'Create Division' : 'Update Division'" />
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
				this.org = await OrganizationDataHandler.getOrg(this.$store.state.corp.id, "divs", "division", this.orgCode);
				if(null !== this.org) {
					this.isLoading = false;	
				}
				else {
					this.$store.state.toast = {
						type: "WARNING",
						message: "Division not found",
					};
				}
			}
		},
		methods: {
			saveItem: async function() {

				const division = document.getElementById("division").value;
				const divisionDesc = document.getElementById("divisionDesc").value;
				const id = document.getElementById("id").value;

				if("" === division) {
					this.$store.state.toast = {
						type: "ERROR",
						message: "Please input Division",
					};
					return;
				}
				if("" === divisionDesc) {
					this.$store.state.toast = {
						type: "ERROR",
						message: "Please input Division Description",
					};
					return;
				}

				if(this.isCreate) {
					if(!confirmCreateItem()) return;
					const res = await OrganizationDataHandler.postOrg(this.$store.state.corp.id, "divs", {
						division: division,
						divisionDesc: divisionDesc,
					});
					if(true === res.isSuccess) {
						this.$store.state.toast = {
							type: "SUCCESS",
							message: "Division " + division + " is created.",
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
					const res = await OrganizationDataHandler.putOrg(this.$store.state.corp.id, "divs", division, {
						division: division,
						divisionDesc: divisionDesc,
						id: id,
					});
					if(true === res.isSuccess) {
						this.$store.state.toast = {
							type: "SUCCESS",
							message: "Division " + division + " is updated.",
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

				const division = document.getElementById("division").value;

				if("" === division) {
					this.$store.state.toast = {
						type: "ERROR",
						message: "Sales Org. is empty. Please contact administrator.",
					};
					return;
				}

				const res = await OrganizationDataHandler.deleteOrg(this.$store.state.corp.id, "divs", division, {
					division: division
				});

				if(true === res.isSuccess) {
					this.$store.state.toast = {
						type: "SUCCESS",
						message: "Division " + division + " is deleted.",
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