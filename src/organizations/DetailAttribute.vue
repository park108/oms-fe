<template>
	<div class="div div--org-listitem">
		<span class="span">{{ this.name }}</span>
		<span class="span"> : </span>
		<span class="span">{{ this.value }}</span>
	</div>
</template>
<script>
	export default {
		props: {
			name: '',
			value: '',
		}
	}
</script>