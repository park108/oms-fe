<template>
	<div class="div div--dashboard-item">
        <h1 class="h1">Sales Areas</h1>
        <hr class="hr" />
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
        <div class="div div--org-listitem" v-else v-for="area in list" :key="area.id">
            <span class="span span--button-detail" @click="moveDetail" :value="area.salesOrg.salesOrg+'|'+area.distributionChannel.distributionChannel+'|'+area.division.division">
				{{ area.salesOrg.salesOrg }}/{{ area.distributionChannel.distributionChannel }}/{{ area.division.division }}
			</span>
            <span class="span"> : </span>
            <span class="span">{{ area.salesOrg.salesOrgDesc }}, </span>
            <span
                >{{ area.distributionChannel.distributionChannelDesc }},
            </span>
            <span class="span">{{ area.division.divisionDesc }} </span>
        </div>
    </div>
</template>

<script src="./SalesArea.js"></script>
