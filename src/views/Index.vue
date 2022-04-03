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
			<SalesOrg :corpId="corpId" orgUri="orgs" />
			<DistributionChannel :corpId="corpId" orgUri="channels" />
			<Division :corpId="corpId" orgUri="divs" />
		</div>

		<SalesArea :corpId="corpId" orgUri="areas" />

		<div class="div div--dashboard-box">
			<SalesOffice :corpId="corpId" orgUri="offices" />
			<SalesGroup :corpId="corpId" orgUri="groups" />
		</div>
	</main>
	<Footer />
</template>

<script src="./Index.js"></script>
