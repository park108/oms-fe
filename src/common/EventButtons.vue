<template>
	<section class="section section--event-buttons">
		<button v-if="enableSave" class="button button--data-save" @click="saveEventFunc">{{saveButtonText}}</button>
	</section>
</template>
<script>
	export default {
		props: {
			enableSave: false,
			saveEventFunc: null,
			saveButtonText: '',
		},
	}
</script>