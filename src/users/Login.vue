<template>
	<Header title="Management Console" routeName="login" />
	<section class="section section--login-box">
		<div class="div div--login-input">
			<label for="user-id" class="label label--login-attributename">ID</label>
			<input class="input input--login-attribute" id="user-id" v-model="userId" type="input" />
		</div>
		<div class="div div--login-input">
			<label for="password" class="label label--login-attributename">Password</label>
			<input class="input input--login-attribute" id="password" v-model="password" type="password" />
		</div>
		<div class="div div--login-input">
			<button class="button button--login-submit" @click="login">Login</button>
		</div>
	</section>
	<Toaster />
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Footer from "@/Footer.vue";
	import Toaster from "@/Toaster.vue";
	import { popToast } from "@/Toaster.vue";

	export default {
		data() {
			return {
				userId: "",
				password: "",
			}
		},
		components: {
			Header,
			Footer,
			Toaster,
		},
		created() {
			document.title = "Login - OMS";			
		},
		methods: {
			login() {
				const id = document.getElementById("user-id");
				const password = document.getElementById("password");
				if("" === id.value) {
					popToast("WARNING", "ID is empty.", this.$store);
					id.focus();
					return;
				}
				if("" === password.value) {
					popToast("WARNING", "Password is empty.", this.$store);
					password.focus();
					return;
				}
				//TODO: Make login logic
				const userInfo = {
					id: this.userId,
					name: "Jongkil Park",
					initial: "JP",
					userToken: "0dd158e8-d909-11ec-9d64-0242ac120002"
				}
				sessionStorage.setItem("user", JSON.stringify(userInfo));
				this.$router.push({name: "Index"});
			}
		}
	}
</script>