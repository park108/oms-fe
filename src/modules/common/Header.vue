<template>
	<header class="header header--top-bar">
		<h1 v-if="'login' === routeName" class="h1 h1--main-title">
			<span class="span">OMS Management Console</span>
		</h1>
		<h1 v-else class="h1 h1--main-title">
			<span class="span span--titlebutton-index" @click="moveIndex">OMS</span>
			<span>&nbsp;</span>
			<span class="span span--titlebutton-main" @click="moveMain">{{ title }}</span>
		</h1>
		<HeaderUserIcon />
	</header>
</template>
<script>
	import HeaderUserIcon from "@/modules/common/HeaderUserIcon.vue";
	import { log } from "@/modules/common/common.js"

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