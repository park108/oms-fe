<template>
	<header class="header">
		<h1 class="h1">
			Sales Groups of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<Navigation />
	<main class="main">
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-listitem" v-else v-for="(group, index) in list" :key="group.salesGroup">
			<span class="span span--detail-attributename span--button-detail" @click="moveDetail" :index="index">{{ group.salesGroup }}</span>
			<span class="span">{{ group.salesGroupDesc }}</span>
		</div>
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="createItem" saveButtonText="Create New Group" />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import { OrganizationDataHandler } from "../OrganizationDataHandler.js";
	import { log } from "@/common.js";
	
	export default {
		data() {
			return {
				isLoading: true,
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
		async mounted() {
			this.orgUri = this.$store.state.orgUri;
			this.list = await OrganizationDataHandler.getList(this.$store.state.corp.id, this.orgUri);
			this.isLoading = false;
		},
		methods: {
			moveDetail: function(e) {
				const index = e.target.getAttribute("index") * 1;
				const org = this.list[index];
				const routeTo = "/" + this.orgUri + "/" + org.id;
				this.$store.state.org = org;
				this.$router.push(routeTo);
			},
			createItem: function() {
				log("CREATE ITEM!!");
			},
		}
	}
</script>