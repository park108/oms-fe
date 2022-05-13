<template>
	<div class="div div--org-listitem" v-for="index in rows" :key="index">
		<span class="span span--detail-skeleton">&nbsp;</span>
	</div>
</template>
<script>
	export default {
		props: {
			rows: {
				type: Number,
				default: 2,
			},
		},
	};
</script>