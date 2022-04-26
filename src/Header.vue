<template>
	<header class="header header--top-bar">
		<h1 class="h1 h1--main-title" @click="moveHome">
			OMS Organization Manager
		</h1>
		<HeaderUserIcon />
	</header>
</template>
<script>
	import HeaderUserIcon from "./HeaderUserIcon.vue";
	export default {
    props: {
        title: String,
    },
    components: {
		HeaderUserIcon,
	},
	methods: {
		moveHome: function() {
			this.$router.push({name: "Index"});
		},
	}
}
</script>