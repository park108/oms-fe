<template>
	<Header title="User Settings" routeName="settings" />
	<Navigation
		prevName="Previous"
	/>
	<main class="main">
		<div class="div div--main-title">
			Sample Page
		</div>
		<div class="div div--detail-list" role="list">
			<AttInput name="input" attribute-name="Input" value="" :editable="true" />
			<AttSelect name="select" attribute-name="Select" :optionList="dummyList" :editable="true" />
		</div>
		<Toaster />
	</main>
	<EventButtons
		:enableSave="true"
		:saveEventFunc="saveItem"
		saveButtonText="Update Sample"
	/>
	<Footer />
</template>
<script>
	import Header from "@/common/Header.vue";
	import Navigation from "@/common/Navigation.vue";
	import AttInput from "@/common/DetailAttributeInput.vue";
	import AttSelect from "@/common/DetailAttributeSelect.vue";
	import EventButtons from "@/common/EventButtons.vue";
	import Footer from "@/common/Footer.vue";
	import Toaster from "@/common/Toaster.vue";
	import { popToast } from "@/common/Toaster.vue";
	import { UserDataHandler } from "@/users/UserDataHandler.js";
	import { log, confirmUpdateItem } from "@/common/common.js";

	export default {
		data() {
			return {
				dummyList: [
					{ selectDesc: "", select: "" },
					{ selectDesc: "Item 1", select: 1 },
					{ selectDesc: "Item 2", select: 2 },
					{ selectDesc: "Item 3", select: 3 },
					{ selectDesc: "Item 4", select: 4 },
					{ selectDesc: "Item 5", select: 5 },
				]
			}
		},
		components: {
			Header,
			Navigation,
			AttInput,
			AttSelect,
			EventButtons,
			Footer,
			Toaster,
		},
		created() {
			this.userInfo = UserDataHandler.getUserInfo();
			if(null === this.userInfo) {
				this.$router.push({name: "login"});
				return;
			}
			// TODO: Make actions when this component created
		},
		mounted() {
			// TODO: Make actions when this component mounted
		},
		methods: {
			// TODO: Define functions for this component
			saveItem: function() {
				log("Click Update Sample Button");

				const input = document.getElementById("input");
				const select = document.getElementById("select");

				if("" === input.value) {
					popToast("WARNING", "Input is empty", this.$store);
					input.focus();
					return;
				}
				if("" === select.value) {
					popToast("WARNING", "Select is empty", this.$store);
					select.focus();
					return;
				}

				if(!confirmUpdateItem("Sample")) return;

				log("Update Sample after confirm");
				//TODO: Make update logic
			}
		}
	}
</script>