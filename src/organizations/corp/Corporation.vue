<template>
    <div class="div div--dashboard-item">
        <h1 class="h1">Your Corporation</h1>
        <hr class="hr" />
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-listitem" v-else>
			<span class="span span--org-listitem">{{ corp.companyName }}</span>
			<span class="span span--org-listitem">, {{ corp.countryCode }}</span>
			<span class="span span--org-listitem">, {{ corp.vatNumber }}</span>
		</div>
    </div>
</template>

<script src="./Corporation.js"></script>
