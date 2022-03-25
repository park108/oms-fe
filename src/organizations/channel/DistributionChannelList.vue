<template>
	<header class="header">
		<h1 class="h1">
			Distribution Channels of {{this.$store.state.corp.companyName}}
		</h1>
	</header>
	<Navigation />
	<div class="div div--org-listitem" v-for="(channel, index) in this.$store.state.list" :key="channel.distributionChannel">
		<span class="span span--button-detail" @click="moveDetail" :index="index">{{ channel.distributionChannel }}</span>
		<span class="span"> : </span>
		<span class="span">{{ channel.distributionChannelDesc }}</span>
	</div>
	<Footer />
</template>
<script>
	import Navigation from "../../Navigation.vue";
	import Footer from "../../Footer.vue";
	
	export default {
		data() {
			return {
			}
		},
		components: {
			Navigation,
			Footer,
		},
		created() {
		},
		mounted() {
		},
		methods: {
			moveDetail: function(e) {
				const index = e.target.getAttribute("index") * 1;
				const channel = this.$store.state.list[index];
				const routeTo = "/channels/" + channel.distributionChannel;
				this.$store.state.org = channel;
				this.$router.push(routeTo);
			}
		}
	}
</script>