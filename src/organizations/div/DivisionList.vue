<template>
	<header class="header">
		<h1 class="h1">
			Divisions of {{ companyName }}
		</h1>
	</header>
	<Navigation />
	<main class="main">
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-list" role="list" v-else>
			<div class="div div--org-listitem" v-for="(div, index) in list" :key="div.division">
				<span class="span span--detail-attributename span--button-detail" @click="moveDetail" :index="index">{{ div.division }}</span>
				<span class="span">{{ div.divisionDesc }}</span>
			</div>
		</div>
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="createItem" saveButtonText="Create New Division" />
	<Footer />
</template>
<script>
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
			this.isLoading = false;
		},
		methods: {
			moveDetail: function(e) {
				const index = e.target.getAttribute("index") * 1;
				const org = this.list[index];
				// const routeTo = "/" + this.orgUri + "/" + org.division;
				// this.$router.push(routeTo);
				this.$router.push({
					name: "DivisionDetail",
					params: {
						orgCode: org.division,
						orgDesc: "Division",
						orgName: "division",
						orgUri: "divs",
					}
				});
			},
			createItem: function() {
				// const routeTo = "/" + this.orgUri + "/NEW/";
				// this.$router.push(routeTo);
				this.$router.push({
					name: "DivisionDetail",
					params: {
						orgCode: "NEW",
						orgDesc: "Division",
						orgName: "division",
						orgUri: "divs",
					}
				});
			},
		}
	}
</script>