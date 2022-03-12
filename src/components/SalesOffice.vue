<template>
	<div class="div div--dashboard-item">
        <h1 class="h1">Sales Offices</h1>
        <hr class="hr" />
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
        <div class="div div--org-listitem" v-else v-for="office in list" :key="office.id">
            <span class="span span--button-detail" @click="moveDetail" :value="office.salesOffice">{{ office.salesOffice }}</span>
            <span> : </span>
            <span>{{ office.salesOfficeDesc }}</span>
        </div>
    </div>
</template>

<script src="./SalesOffice.js"></script>
