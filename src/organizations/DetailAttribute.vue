<template>
	<div class="div div--org-listitem">
		<span class="span span--detail-attributename">{{ this.attributeName }}</span>
		<input class="input input--detail-attribute"
			:id="this.name"
			:value="this.value"
			:disabled="!this.editable"
		/>
	</div>
</template>
<script>
	export default {
		props: {
			name: '',
			value: '',
			attributeName: '',
			editable: false
		}
	}
</script>