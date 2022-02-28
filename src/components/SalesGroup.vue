<template>
    <div>
        <h1>Sales Groups</h1>
        <hr />
        <div v-for="group in groups" :key="group.id">
            <span>{{ group.salesGroup }}</span>
            <span> : </span>
            <span>{{ group.salesGroupDesc }}</span>
        </div>
    </div>
</template>

<script src="./SalesGroup.js"></script>
