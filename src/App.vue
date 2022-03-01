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
				<DistributionChannel />
			</section>
			<section class="section__third">
				<Division />
			</section>
		</div>

		<section class="section__full">
			<SalesArea />
		</section>

		<div class="section__box">
			<section class="section__second">
				<SalesOffice />
			</section>
			<section class="section__second">
				<SalesGroup />
			</section>
		</div>
	</main>
</template>

<script src="./App.js"></script>

<style>
	@import url(./App.css);
</style>
