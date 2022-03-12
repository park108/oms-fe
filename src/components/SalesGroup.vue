<template>
	<div class="div div--dashboard-item">
        <h1 class="h1">Sales Groups</h1>
        <hr class="hr" />
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
        <div class="div div--org-listitem" v-else v-for="group in list" :key="group.id">
            <span class="span span--button-detail" @click="moveDetail" :value="group.salesGroup">{{ group.salesGroup }}</span>
            <span> : </span>
            <span>{{ group.salesGroupDesc }}</span>
        </div>
    </div>
</template>

<script src="./SalesGroup.js"></script>
