<template>
	<Header />
	<Navigation prevName="Home" />
	<main class="main">
		<div class="div div--org-title">
			Sales Area List
		</div>
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<div class="div div--org-listitem div--org-button" v-for="(area, index) in this.list" @click="moveDetail" :index="index" :key="area.id">
				<span class="span span--detail-attributename">
					{{ area.salesOrg.salesOrg }}/{{ area.distributionChannel.distributionChannel }}/{{ area.division.division }}
				</span>
				<span class="span">{{ area.salesOrg.salesOrgDesc }}, {{ area.distributionChannel.distributionChannelDesc }}, {{ area.division.divisionDesc }} </span>
			</div>
		</div>
	</main>
	<EventButtons
		:enableSave="true"
		:saveEventFunc="createItem"
		saveButtonText="Create New Area"
	/>
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Navigation from "@/Navigation.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import { OrganizationDataHandler } from "../OrganizationDataHandler.js";
	
	export default {
		data() {
			return {
				isLoading: true,
				corp: null,
				companyName: '',
				orgUri: '',
				list: []
			}
		},
		components: {
			Header,
			Navigation,
			Footer,
			EventButtons,
			OrganizationDataHandler,
		},
		created() {
			this.corp = this.$store.state.corp;
			this.companyName = this.corp.companyName;
			this.orgUri = this.$route.path.replaceAll("/", "");
		},
		async mounted() {
			this.list = await OrganizationDataHandler.getList(this.corp.id, this.orgUri);
			if(null === this.list) {
				popToast("WARNING", "Sales Area not found.", this.$store);
			}
			this.isLoading = false;
		},
		methods: {
			moveDetail: function(e) {
				const index = e.target.getAttribute("index") * 1;
				const org = this.list[index];
				const routeTo = "/areas/"
					+ org.salesOrg.salesOrg + "/"
					+ org.distributionChannel.distributionChannel + "/"
					+ org.division.division + "/"
				this.$router.push(routeTo);
			},
			createItem: function() {
				const routeTo = "/" + this.orgUri + "/NEW/NEW/NEW/";
				this.$router.push(routeTo);
			},
		}
	}
</script>