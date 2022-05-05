<template>
	<header class="header header--top-bar">
		<h1 class="h1 h1--main-title">
			<span @click="moveHome">OMS</span>
			<span>&nbsp;</span>
			<span @click="moveMain">{{ title }}</span>
		</h1>
		<HeaderUserIcon />
	</header>
</template>
<script>
	import HeaderUserIcon from "./HeaderUserIcon.vue";
	export default {
		props: {
			title: String,
			routeName: String,
		},
		components: {
			HeaderUserIcon,
		},
		methods: {
			moveHome: function() {
				this.$router.push({name: "Index"});
			},
			moveMain: function() {
				this.$router.push({name: this.routeName});
			}
		}
	}
</script>