<template>
	<header class="header">
		<h1 class="h1">
			Sales Groups of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<Navigation />
	<main class="main">
		<div class="div div--org-listitem" v-for="(group, index) in this.$store.state.list" :key="group.salesGroup">
			<span class="span span--detail-attributename span--button-detail" @click="moveDetail" :index="index">{{ group.salesGroup }}</span>
			<span class="span">{{ group.salesGroupDesc }}</span>
		</div>
	</main>
	<EventButtons :enableSave="true" :saveEventFunc="saveItem" saveButtonText="Create New Group" />
	<Footer />
</template>
<script>
	import Navigation from "@/Navigation.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	
	export default {
		data() {
			return {
			}
		},
		components: {
			Navigation,
			Footer,
			EventButtons,
		},
		created() {
		},
		mounted() {
		},
		methods: {
			moveDetail: function(e) {
				const index = e.target.getAttribute("index") * 1;
				const group = this.$store.state.list[index];
				const routeTo = "/groups/" + group.salesGroup;
				this.$store.state.org = group;
				this.$router.push(routeTo);
			}
		}
	}
</script>