<template>
    <div>
        <h1>Sales Offices</h1>
        <hr />
		<div v-if="isLoading">
			Loading ...
		</div>
        <div v-else v-for="office in list" :key="office.id">
            <span>{{ office.salesOffice }}</span>
            <span> : </span>
            <span>{{ office.salesOfficeDesc }}</span>
        </div>
    </div>
</template>

<script src="./SalesOffice.js"></script>
