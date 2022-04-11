<template>
	<header class="header">
		<h1 class="h1">
			Sales Office > {{ orgCode }}
		</h1>
	</header>
	<Navigation :enableDelete="!isCreate" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<DetailAttribute name="salesOffice" attribute-name="Sales Office" :value="org.salesOffice" :editable="isCreate&&!isPending" />
			<DetailAttribute name="salesOfficeDesc" attribute-name="Description" :value="org.salesOfficeDesc" :editable="!isPending" />
			<DetailAttribute name="id" attribute-name="id" :value="org.id" :hidden="isCreate" />
		</div>
	</main>
	<Toaster />
	<EventButtons :enableSave="true" :saveEventFunc="saveItem" :saveButtonText="isCreate ? 'Create Office' : 'Update Office'" />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import DetailAttribute from "../DetailAttribute.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import Toaster from "@/Toaster.vue";
	import { OrganizationDataHandler } from '../OrganizationDataHandler';
	import { log, confirmUpdateItem, confirmDeleteItem } from "@/common.js";

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
			this.orgCode = this.$route.params.office;
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
				this.org = await OrganizationDataHandler.getOrg(this.$store.state.corp.id, "offices", "salesOffice", this.orgCode);
				if(null !== this.org) {
					this.isLoading = false;	
				}
				else {
					this.$store.state.toast = {
						type: "WARNING",
						message: "Sales Office not found",
					};
				}
			}
		},
		methods: {
			saveItem: function() {
				if(!confirmUpdateItem()) return;

				log("Yes update it!");

				// TODO: make item delete logic

				this.$router.go(-1);
			},
			deleteItem: function() {
				if(!confirmDeleteItem()) return;

				log("Yes delete it!");

				// TODO: make item delete logic

				this.$router.go(-1);
			},
		}
	}
</script>