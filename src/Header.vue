<template>
	<header class="header header--top-bar">
		<h1 class="h1 h1--main-title">
			{{ title }}
		</h1>
		<div class="div div--user-status">
			<div class="div div--user-icon">
				^^
			</div>
		</div>
	</header>
</template>
<script>
	export default {
		props: {
			title: String,
		},
	}
</script>