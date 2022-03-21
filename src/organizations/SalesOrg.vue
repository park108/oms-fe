<template>
	<div class="div div--dashboard-item">
        <h1 class="h1">Sales Orgs</h1>
        <hr class="hr" />
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
        <div class="div div--org-listitem" v-else v-for="org in list" :key="org.salesOrg">
            <span class="span span--button-detail" @click="moveDetail" :value="org.salesOrg">{{ org.salesOrg }}</span>
            <span class="span"> : </span>
            <span class="span">{{ org.salesOrgDesc }}</span>
        </div>
    </div>
</template>

<script src="./SalesOrg.js"></script>
