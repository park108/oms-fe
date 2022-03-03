<template>
    <div>
        <h1>Sales Orgs</h1>
        <hr />
		<div v-if="isLoading">
			Loading ...
		</div>
        <div v-else v-for="org in list" :key="org.salesOrg">
            <span>{{ org.salesOrg }}</span>
            <span> : </span>
            <span>{{ org.salesOrgDesc }}</span>
        </div>
    </div>
</template>

<script src="./SalesOrg.js"></script>
