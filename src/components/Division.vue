<template>
    <div>
        <h1>Divisions</h1>
        <hr />
        <div v-for="div in divs" :key="div.division">
            <span>{{ div.division }}</span>
            <span> : </span>
            <span>{{ div.divisionDesc }}</span>
        </div>
    </div>
</template>

<script src="./Division.js"></script>
