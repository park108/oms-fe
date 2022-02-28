<template>
    <div>
        <h1>Sales Offices</h1>
        <hr />
        <div v-for="office in offices" :key="office.id">
            <span>{{ office.salesOffice }}</span>
            <span> : </span>
            <span>{{ office.salesOfficeDesc }}</span>
        </div>
    </div>
</template>

<script src="./SalesOffice.js"></script>
