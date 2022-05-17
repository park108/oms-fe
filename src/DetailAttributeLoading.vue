<template>
	<div class="div div--detail-listitem" role="listitem">
		<label class="label label--detail-attributename">{{ attributeName }}</label>
		<span class="span span--detail-skeleton">&nbsp;</span>
	</div>
</template>
<script>
	export default {
		props: {
			attributeName: '',
		}
	}
</script>