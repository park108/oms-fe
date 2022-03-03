<template>
	<main>
		<section class="section__full">
			<Corporation @setCorpId="setCorpId" />
		</section>

		<div class="section__box">
			<section class="section__third">
				<SalesOrg :corpId="corpId" />
			</section>
			<section class="section__third">
				<DistributionChannel :corpId="corpId" />
			</section>
			<section class="section__third">
				<Division :corpId="corpId" />
			</section>
		</div>

		<section class="section__full">
			<SalesArea :corpId="corpId" />
		</section>

		<div class="section__box">
			<section class="section__second">
				<SalesOffice :corpId="corpId" />
			</section>
			<section class="section__second">
				<SalesGroup :corpId="corpId" />
			</section>
		</div>
	</main>
</template>

<script src="./App.js"></script>

<style>
	@import url(./App.css);
</style>
