<template>
	<header class="header header--top-bar">
		<h1 class="h1 h1--main-title">
			<span class="span span--titlebutton-index" @click="moveIndex">OMS</span>
			<span>&nbsp;</span>
			<span class="span span--titlebutton-main" @click="moveMain">{{ title }}</span>
		</h1>
		<HeaderUserIcon />
	</header>
</template>
<script>
	import HeaderUserIcon from "@/HeaderUserIcon.vue";
	import { log } from "@/common.js"

	export default {
		props: {
			title: String,
			routeName: String,
		},
		components: {
			HeaderUserIcon,
		},
		methods: {
			moveIndex: function() {
				this.$router.push({name: "Index"});
			},
			moveMain: function() {
				this.$router.push({name: this.routeName});
			}
		}
	}
</script>