<template>
    <div>
        <h1>Sales Areas</h1>
        <hr />
		<div v-if="isLoading">
			Loading ...
		</div>
        <div class="div--org-listitem" v-else v-for="area in list" :key="area.id">
            <span>{{ area.salesOrg.salesOrg }}</span>
            <span>/</span>
            <span>{{ area.distributionChannel.distributionChannel }}</span>
            <span>/</span>
            <span>{{ area.division.division }}</span>
            <span> : </span>
            <span>{{ area.salesOrg.salesOrgDesc }}, </span>
            <span
                >{{ area.distributionChannel.distributionChannelDesc }},
            </span>
            <span>{{ area.division.divisionDesc }} </span>
        </div>
    </div>
</template>

<script src="./SalesArea.js"></script>
