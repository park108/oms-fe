<template>
	<header class="header header--top-bar">
		<h1 class="h1 h1--main-title">
			{{ title }}
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
	}
}
</script>