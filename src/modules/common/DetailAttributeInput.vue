<template>
	<div class="div div--detail-listitem" role="listitem" v-show="!this.hidden">
		<label :for="this.name" class="label label--detail-attributename">{{ this.attributeName }}</label>
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
			editable: false,
			hidden: false,
		}
	}
</script>