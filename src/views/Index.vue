<template>
	<header class="header">
		<h1 class="h1">
			Order Management System Console
		</h1>
	</header>
	<main class="main">
		<section class="section section--split-one">
			<Corporation @setCorpId="setCorpId" />
		</section>

		<div class="div div--dashboard-box">
			<SalesOrg :corpId="corpId" />
			<DistributionChannel :corpId="corpId" />
			<Division :corpId="corpId" />
		</div>

		<SalesArea :corpId="corpId" />

		<div class="div div--dashboard-box">
			<SalesOffice :corpId="corpId" />
			<SalesGroup :corpId="corpId" />
		</div>
	</main>
	<Footer />
</template>

<script src="./Index.js"></script>
