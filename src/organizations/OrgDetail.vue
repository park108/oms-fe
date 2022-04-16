<template>
	<header class="header">
		<h1 class="h1">
			{{ orgDesc }} > {{ orgCode }}
		</h1>
	</header>
	<Navigation :enableDelete="!isCreate" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<DetailAttribute :name="orgName" :attribute-name="orgDesc" :value="orgData[orgName]" :editable="isCreate&&!isPending" />
			<DetailAttribute :name="orgName + 'Desc'" attribute-name="Description" :value="orgData[orgName + 'Desc']" :editable="!isPending" />
			<DetailAttribute name="id" attribute-name="id" :value="orgData.id" :hidden="isCreate" />
		</div>
	</main>
	<Toaster />
	<EventButtons :enableSave="true" :saveEventFunc="saveItem" :saveButtonText="isCreate ? 'Create ' + orgDesc : 'Update ' + orgDesc" />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import DetailAttribute from "./DetailAttribute.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import Toaster from "@/Toaster.vue";
	import { OrganizationDataHandler } from './OrganizationDataHandler';
	import { confirmUpdateItem, confirmDeleteItem, confirmCreateItem } from "@/common.js";

	export default {
		data() {
			return {
				isLoading: true,
				isPending: false,
				isCreate: false,
				orgData: null,
			}
		},
		props: {
			orgCode: String,
			orgDesc: String,
			orgName: String,
			orgUri: String,
			orgParamName: String,
		},
		components: {
			Navigation,
			DetailAttribute,
			Footer,
			EventButtons,
			Toaster,
		},
		created() {
			if("NEW" === this.orgCode) {
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
				this.orgData = await OrganizationDataHandler.getOrg(this.$store.state.corp.id, this.orgUri, this.orgName, this.orgCode);
				if(null !== this.orgData) {
					this.isLoading = false;	
				}
				else {
					this.$store.state.toast = {
						type: "WARNING",
						message: this.orgDesc + " not found",
					};
				}
			}
		},
		methods: {
			saveItem: async function() {

				const code = document.getElementById(this.orgName);
				const desc = document.getElementById(this.orgName + "Desc");
				const id = document.getElementById("id").value;

				if("" === code.value) {
					this.$store.state.toast = {
						type: "WARNING",
						message: "Please input " + this.orgDesc,
					};
					code.focus();
					return;
				}
				if("" === desc.value) {
					this.$store.state.toast = {
						type: "WARNING",
						message: "Please input " +  this.orgDesc + " Description",
					};
					desc.focus();
					return;
				}

				if(this.isCreate) {
					if(!confirmCreateItem()) return;
					const res = await OrganizationDataHandler.postOrg(this.$store.state.corp.id, this.orgUri, {
						[this.orgName]: code.value,
						[this.orgName + "Desc"]: desc.value,
					});
					if(true === res.isSuccess) {
						this.$store.state.toast = {
							type: "SUCCESS",
							message: this.orgDesc + " " + orgCode.value + " is created.",
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
					const res = await OrganizationDataHandler.putOrg(this.$store.state.corp.id, this.orgUri, code.value, {
						[this.orgName]: code.value,
						[this.orgName + "Desc"]: desc.value,
						id: id,
					});
					if(true === res.isSuccess) {
						this.$store.state.toast = {
							type: "SUCCESS",
							message: this.orgDesc + " " + code.value + " is updated.",
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

				const code = document.getElementById(this.orgName);

				if("" === code.value) {
					this.$store.state.toast = {
						type: "ERROR",
						message: this.orgDesc + " is empty. Please contact administrator.",
					};
					return;
				}

				const res = await OrganizationDataHandler.deleteOrg(this.$store.state.corp.id, this.orgUri, code.value, {
					[this.orgName]: code.value,
				});

				if(true === res.isSuccess) {
					this.$store.state.toast = {
						type: "SUCCESS",
						message: this.orgDesc + " " + code.value + " is deleted.",
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