<template>
	<Header title="User Profile" routeName="profile" />
	<Navigation
		prevName="Previous"
	/>
	<main class="main">
		<div class="div div--main-title">
			{{ userInfo.name }}
		</div>
		<div class="div div--detail-list" role="list">
			<AttInput name="id" attribute-name="ID" :value="userInfo.id" />
			<AttInput name="name" attribute-name="Name" :value="userInfo.name" :editable="true" />
			<AttInput name="initial" attribute-name="Initial" :value="userInfo.initial" :editable="true" />
			<AttInput name="userToken" attribute-name="Temporary Token" :value="userInfo.userToken" />
		</div>
		<Toaster />
	</main>
	<EventButtons
		:enableSave="true"
		:saveEventFunc="saveItem"
		saveButtonText="Update Profile"
	/>
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Navigation from "@/Navigation.vue";
	import AttInput from "@/DetailAttributeInput.vue";
	import EventButtons from "@/EventButtons.vue";
	import Footer from "@/Footer.vue";
	import Toaster from "@/Toaster.vue";
	import { popToast } from "@/Toaster.vue";
	import { confirmUpdateItem } from "@/common.js";

	export default {
		data() {
			return {
				userInfo: null,
			}
		},
		components: {
			Header,
			Navigation,
			AttInput,
			EventButtons,
			Footer,
			Toaster,
		},
		created() {
			const user = sessionStorage.getItem("user");
			if(undefined === user || null === user) {
				this.$router.push({name: "Index"});
			}
			this.userInfo = JSON.parse(user);
			document.title = "User Profile - OMS";
		},
		methods: {
			saveItem: async function() {
				const id = document.getElementById("id").value;
				const name = document.getElementById("name");
				const initial = document.getElementById("initial");

				if("" === id) {
					popToast("ERROR", "id is empty. Please contact administrator.", this.$store);
					return;
				}
				if("" === name.value) {
					popToast("WARNING", "Name is empty", this.$store);
					name.focus();
					return;
				}
				if("" === initial.value) {
					popToast("WARNING", "Initial is empty", this.$store);
					initial.focus();
					return;
				}

				if(!confirmUpdateItem("Profile")) return;

				// TODO: Make user profile data handler and link that
				// const res = await OrganizationDataHandler.putOrg(this.corpId, this.orgUri, code.value, {
				// 	[this.orgName]: code.value,
				// 	[this.orgName + "Desc"]: desc.value,
				// 	id: id,
				// });
				// if(true === res.isSuccess) {
				// 	popToast("SUCCESS", this.orgDesc + " " + code.value + " is updated.", this.$store);
				// 	this.isPending = true;
				// 	setTimeout(() => this.$router.go(-1), 2000);
				// }
				// else {
				// 	popToast("ERROR", "Server Error. Please contact administrator.", this.$store);
				// }
			},
		}
	}
</script>