<template>
	<div v-if="isLoading" class="div div--detail-listitem">
		<label class="label label--detail-attributename">{{ attributeName }}</label>
		<span class="span span--input-skeleton">&nbsp;</span>
	</div>
	<div v-else class="div div--detail-listitem">
		<label :for="this.name" class="label label--detail-attributename">{{ attributeName }}</label>
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
			isLoading: {
				type: Boolean,
				default: false,
			},
			name: String,
			value: String,
			attributeName: String,
			editable: false,
			hidden: false,
		},
	}
</script>