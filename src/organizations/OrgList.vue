<template>
	<Header />
	<Navigation />
	<main class="main">
		<div class="div div--org-title">
			{{orgDesc}} List
		</div>
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<div class="div div--org-listitem div--org-button" role="listitem" v-for="(orgItem, index) in list" @click="moveDetail" :index="index" :key="orgItem.id">
				<span class="span span--detail-attributename">{{ orgItem[orgName] }}</span>
				<span class="span">{{ orgItem[orgName + 'Desc'] }}</span>
			</div>
		</div>
		<Toaster />
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="createItem" :saveButtonText="'Create New ' + orgDesc" />
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Navigation from "@/Navigation.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import Toaster from "@/Toaster.vue";
	import { OrganizationDataHandler } from "./OrganizationDataHandler.js";
	
	export default {
		data() {
			return {
				isLoading: true,
				corp: null,
				companyName: '',
				orgUri: '',
				list: [],
			}
		},
		props: {
			orgDesc: String,
			orgName: String,
		},
		components: {
			Header,
			Navigation,
			Footer,
			EventButtons,
			OrganizationDataHandler,
			Toaster,
		},
		created() {
			this.orgUri = this.$route.path.substr(1, this.$route.path.indexOf("/", 1) - 1);
			this.corp = this.$store.state.corp;
			this.companyName = this.corp.companyName;
		},
		async mounted() {
			this.list = await OrganizationDataHandler.getList(this.corp.id, this.orgUri);
			if(null === this.list) {
				popToast("WARNING", this.orgDesc + " not found", this.$store);
			}
			this.isLoading = false;
		},
		methods: {
			moveDetail: function(e) {
				const index = e.target.getAttribute("index") * 1;
				const org = this.list[index];
				this.$router.push({
					name: this.orgName + "Detail",
					params: {
						orgCode: org[this.orgName],
					}
				});
			},
			createItem: function() {
				this.$router.push({
					name: this.orgName + "Detail",
					params: {
						orgCode: "NEW",
					}
				});
			}
		}
	}
</script>