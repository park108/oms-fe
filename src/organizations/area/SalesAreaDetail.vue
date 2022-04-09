<template>
	<header class="header">
		<h1 class="h1">
			Sales Area > {{ org }}/{{ channel }}/{{ div }}
		</h1>
	</header>
	<Navigation :enableDelete="true" :deleteEventFunc="deleteItem"/>
	<main class="main">
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<DetailAttribute name="salesOrg" attribute-name="Sales Organization" :value="this.area.salesOrg.salesOrg + ', ' + this.area.salesOrg.salesOrgDesc" />
			<DetailAttribute name="distributionChannel" attribute-name="Distiribution Channel" :value="this.area.distributionChannel.distributionChannel + ', ' + this.area.distributionChannel.distributionChannelDesc" />
			<DetailAttribute name="division" attribute-name="Division" :value="this.area.division.division + ', ' + this.area.division.divisionDesc" />
			<DetailAttribute name="id" attribute-name="id" :value="this.area.id"/>
		</div>
	</main>
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
				area: null,
				org: '',
				channel: '',
				div: '',
			}
		},
		components: {
			Navigation,
			DetailAttribute,
			Footer,
			EventButtons
		},
		created() {
			this.org = this.$route.params.org;
			this.channel = this.$route.params.channel;
			this.div = this.$route.params.div;
		},
		async mounted() {
			this.area = await OrganizationDataHandler.getSalesArea(this.$store.state.corp.id, this.org, this.channel, this.div);
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