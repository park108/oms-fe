<template>
	<header class="header">
		<h1 class="h1">
			Division > {{ orgCode }}
		</h1>
	</header>
	<Navigation :enableDelete="true" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<DetailAttribute name="division" attribute-name="Division" :value="org.division"/>
			<DetailAttribute name="divisionDesc" attribute-name="Description" :value="org.divisionDesc" :editable="true" />
			<DetailAttribute name="id" attribute-name="id" :value="org.id"/>
		</div>
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="saveItem" saveButtonText="Update Division" />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import DetailAttribute from "../DetailAttribute.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import { OrganizationDataHandler } from '../OrganizationDataHandler';
	import { log, confirmUpdateItem, confirmDeleteItem } from "@/common.js";

	export default {
		data() {
			return {
				isLoading: true,
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
		async mounted() {
			const corpId = this.$store.state.corp.id;
			const orgId = this.$route.params.div;
			this.org = await OrganizationDataHandler.getOrg(corpId, "divs", "division", orgId);
			this.orgCode = this.org.division;
			this.isLoading = false;
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