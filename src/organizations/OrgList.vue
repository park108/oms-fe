<template>
	<header class="header">
		<h1 class="h1">
			{{ listTitle }} of {{ companyName }}
		</h1>
	</header>
	<Navigation />
	<main class="main">
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<div class="div div--org-listitem" role="listitem" v-for="(orgItem, index) in list" :key="orgItem.id">
				<span class="span span--detail-attributename span--button-detail" @click="moveDetail" :index="index">{{ orgItem[orgName] }}</span>
				<span class="span">{{ orgItem[orgName + 'Desc'] }}</span>
			</div>
		</div>
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="createItem" :saveButtonText="'Create New ' + orgDesc" />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import { OrganizationDataHandler } from "./OrganizationDataHandler.js";
	
	export default {
		data() {
			return {
				isLoading: true,
				corp: null,
				companyName: '',
				list: []
			}
		},
		props: {
			listTitle: String,
			orgDesc: String,
			orgName: String,
			orgUri: String,
		},
		components: {
			Navigation,
			Footer,
			EventButtons,
			OrganizationDataHandler,
		},
		created() {
			this.corp = this.$store.state.corp;
			this.companyName = this.corp.companyName;
		},
		async mounted() {
			this.list = await OrganizationDataHandler.getList(this.corp.id, this.orgUri);
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
						orgDesc: this.orgDesc,
						orgName: this.orgName,
						orgUri: this.orgUri,
					}
				});
			},
			createItem: function() {
				this.$router.push({
					name: this.orgName + "Detail",
					params: {
						orgCode: "NEW",
						orgDesc: this.orgDesc,
						orgName: this.orgName,
						orgUri: this.orgUri,
					}
				});
			}
		}
	}
</script>