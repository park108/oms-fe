<template>
	<header>
		<h1>
			Order Management System Console
		</h1>
	</header>
	<main>
		<section class="section--full">
			<Corporation @setCorpId="setCorpId" />
		</section>

		<div class="section--box">
			<section class="section--third">
				<SalesOrg :corpId="corpId" />
			</section>
			<section class="section--third">
				<DistributionChannel :corpId="corpId" />
			</section>
			<section class="section--third">
				<Division :corpId="corpId" />
			</section>
		</div>

		<section class="section--full">
			<SalesArea :corpId="corpId" />
		</section>

		<div class="section--box">
			<section class="section--second">
				<SalesOffice :corpId="corpId" />
			</section>
			<section class="section--second">
				<SalesGroup :corpId="corpId" />
			</section>
		</div>
	</main>
	<footer>
		© 2022 Jongkil Park.
	</footer>
</template>

<script src="./App.js"></script>

<style>
	@import url(./App.css);
</style>
