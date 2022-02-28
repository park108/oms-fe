<template>
    <div>
        <h1>Sales Orgs</h1>
        <hr />
        <div v-for="org in orgs" :key="org.salesOrg">
            <span>{{ org.salesOrg }}</span>
            <span> : </span>
            <span>{{ org.salesOrgDesc }}</span>
        </div>
    </div>
</template>

<script src="./SalesOrg.js"></script>
