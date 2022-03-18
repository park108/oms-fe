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
			<section class="section section--split-three">
				<SalesOrg :corpId="corpId" />
			</section>
			<section class="section section--split-three">
				<DistributionChannel :corpId="corpId" />
			</section>
			<section class="section section--split-three">
				<Division :corpId="corpId" />
			</section>
		</div>

		<section class="section section--split-one">
			<SalesArea :corpId="corpId" />
		</section>

		<div class="div div--dashboard-box">
			<section class="section section--split-two">
				<SalesOffice :corpId="corpId" />
			</section>
			<section class="section section--split-two">
				<SalesGroup :corpId="corpId" />
			</section>
		</div>
	</main>
	<footer class="footer">
		© 2022 Jongkil Park.
	</footer>
</template>

<script src="./Index.js"></script>
