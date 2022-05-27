<template>
	<Header title="User Profile" routeName="profile" />
	<Navigation
		prevName="Previous"
	/>
	<main class="main">
		<div class="div div--main-title">
			{{ userInfo.name.default }}
		</div>
		<div class="div div--detail-list" role="list">
			<AttInput name="company" attribute-name="Company" :value="corpInfo.companyName" />
			<AttInput name="id" attribute-name="ID" :value="userInfo.id" />
			<div class="div div--detail-listitem">
				<label for="language" class="label label--detail-attributename">Language</label>
				<CodeSelector name="language" apiUri="languages" :corpId="corpInfo.id" :selectedValue="userInfo.language" :disabled="false"/>
			</div>
			<AttInput name="name" attribute-name="Name" :value="userInfo.name[userInfo.language]" :editable="true" />
			<AttInput name="initial" attribute-name="Initial" :value="userInfo.initial" :editable="true" />
			<AttInput name="sessionId" attribute-name="Session ID" :value="userInfo.sessionId" />
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
	import Header from "@/common/Header.vue";
	import Navigation from "@/common/Navigation.vue";
	import AttInput from "@/common/DetailAttributeInput.vue";
	import CodeSelector from "@/common/CodeSelector.vue";
	import EventButtons from "@/common/EventButtons.vue";
	import Footer from "@/common/Footer.vue";
	import Toaster from "@/common/Toaster.vue";
	import { popToast } from "@/common/Toaster.vue";
	import { confirmUpdateItem } from "@/common/common.js";
	import { UserDataHandler } from "@/users/UserDataHandler.js";
	import { CommonCodes } from "@/common/CommonCodes.js";

	export default {
		data() {
			return {
				userInfo: null,
				corpInfo: null,
			}
		},
		components: {
			Header,
			Navigation,
			AttInput,
			CodeSelector,
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

			const corp = sessionStorage.getItem("corp");
			if(undefined === corp || null === corp) {
				this.$router.push({name: "Index"});
			}
			this.corpInfo = JSON.parse(corp);

			document.title = "User Profile - OMS";

			const languages = CommonCodes.getCodeList(this.corpInfo.id, "languages");
		},
		methods: {
			saveItem: async function() {
				const id = document.getElementById("id").value;
				const name = document.getElementById("name");
				const language = document.getElementById("language");
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
				if("" === language.value) {
					popToast("WARNING", "Language is empty", this.$store);
					language.focus();
					return;
				}
				if("" === initial.value) {
					popToast("WARNING", "Initial is empty", this.$store);
					initial.focus();
					return;
				}

				if(!confirmUpdateItem("Profile")) return;

				// TODO: Make user profile data handler and link that
				let body = this.userInfo;
				body.name[language.value] = name.value;
				body.language = language.value;
				body.initial =  initial.value;
				sessionStorage.setItem("user", JSON.stringify(body)); // TODO: Delete after make backend
				const res = await UserDataHandler.putUser(this.corpId, this.id, body);
				if(true === res.isSuccess) {
					popToast("SUCCESS", this.orgDesc + " " + code.value + " is updated.", this.$store);
					this.isPending = true;
					setTimeout(() => this.$router.go(-1), 2000);
				}
				else {
					popToast("ERROR", "Server Error. Please contact administrator.", this.$store);
				}
			},
		}
	}
</script>